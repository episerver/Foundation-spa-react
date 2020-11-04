using System.Collections.Generic;
using System.Web.Routing;
using System.Web.Http;
using EPiServer.ContentApi.Core.Security.Internal;
using System;
using EPiServer.Web;
using EPiServer.Web.Routing;
using EPiServer;
using System.Web.Http.ValueProviders;
using EPiServer.ContentApi.Core.Internal;
using System.Linq;
using System.Globalization;
using Foundation.Cms.Extensions;
using Foundation.ContentDelivery.Models;

namespace Foundation.ContentDelivery.Controller
{
    class RouteResponse
    {
        public virtual string SiteName { get; set; }

        public virtual Guid SiteId { get; set; }

        public virtual Uri SiteUrl { get; set; }

        public virtual RouteContentLink ContentLink { get; set; }
    }

    class RouteContentLink
    {
        public virtual int Id { get; set; }

        public virtual int? WorkId { get; set; } = null;

        public virtual Guid GuidValue { get; set; }

        public virtual string ProviderName { get; set; } = null;

        public virtual Uri Url { get; set; }

    }

    /// <summary>
    /// Model controller allowing access to the IContent types stored within the Episerver instance.
    /// </summary>
    [RoutePrefix("api/episerver/v3/route")]
    [ContentApiAuthorization]
    [ContentApiCors]
    [CorsOptionsActionFilter]
    public class ContentRouteApiController : ApiController
    {
        private readonly ISiteDefinitionResolver _siteDefinitionResolver;
        private readonly IUrlResolver _urlResolver;
        private readonly ISiteDefinitionRepository _siteDefinitionRepository;
        private readonly IViewModelSerializer _viewModelSerializer;

        public ContentRouteApiController(
            ISiteDefinitionResolver siteDefinitionResolver, 
            IUrlResolver urlResolver, 
            ISiteDefinitionRepository siteDefinitionRepository,
            IViewModelSerializer viewModelSerializer
        ) {
            _siteDefinitionResolver = siteDefinitionResolver;
            _urlResolver = urlResolver;
            _siteDefinitionRepository = siteDefinitionRepository;
            _viewModelSerializer = viewModelSerializer;
        }

        [HttpGet]
        [Route("")]
        public IHttpActionResult ResolveRoute(string route, [ValueProvider(typeof(AcceptLanguageHeaderValueProviderFactory))] List<string> languages)
        {
            var hostname = Request.RequestUri.Host;
            if (!Request.RequestUri.IsDefaultPort)
            {
                hostname = hostname + ":" + Request.RequestUri.Port.ToString();
            }
            var site = _siteDefinitionResolver.GetByHostname(hostname, true, out var hostDefinition);
            var language = ResolveLanguage(languages, hostDefinition.Language);
            return ResolveRoute(route ?? "", site, language);
        }

        [HttpGet]
        [Route("")]
        public IHttpActionResult ResolveRoute(string route, Guid siteId, [ValueProvider(typeof(AcceptLanguageHeaderValueProviderFactory))] List<string> languages)
        {
            var site = _siteDefinitionRepository.Get(siteId);
            var language = ResolveLanguage(languages);
            return ResolveRoute(route ?? "", site, language);
        }

        protected IHttpActionResult ResolveRoute(string route, SiteDefinition site, CultureInfo cultureInfo)
        {
            var language = cultureInfo.TwoLetterISOLanguageName;
            var homeUrl = _urlResolver.GetUrl(site.StartPage, language);
            var host = site.GetHosts(cultureInfo, true).FirstOrDefault();

            var builder = new UrlBuilder(homeUrl)
            {
                Scheme = host.UseSecureConnection == null ? Request.RequestUri.Scheme : (host.UseSecureConnection == true ? "https" : "http"),               
                Host = host.Authority.Hostname == "*" ? Request.RequestUri.Host : host.Authority.Hostname,
                Port = host.Authority.Port
            };
            if (route.StartsWith("/") || !builder.Path.Contains("/"))
            {
                builder.Path = route;
            } else if (builder.Path.EndsWith("/"))
            {
                builder.Path += route;
            } else
            {
                var p = builder.Path;
                p = p.Substring(0, p.LastIndexOf('/'));
                builder.Path = p + route;
            }

            var content = _urlResolver.Route(builder, ContextMode.Default);
            if (content == null)
            {
                return NotFound();
            }

            var response = new RouteResponse()
            {
                SiteName = site.Name,
                SiteUrl = site.SiteUrl,
                SiteId = site.Id,
                ContentLink = new RouteContentLink()
                {
                    Id = content.ContentLink.ID,
                    WorkId = content.ContentLink.WorkID,
                    GuidValue = content.ContentGuid,
                    ProviderName = content.ContentLink.ProviderName,
                    Url = content.ContentLink.GetUri(language, false)
                }
            };

            var httpResponse = new ControllerActionApiResult<RouteResponse>(response){ Request = Request };
            return httpResponse;
        }

        protected virtual CultureInfo ResolveLanguage(List<string> languages, CultureInfo defaultCulture)
        {
            var cultures = languages == null ? new CultureInfo[0] : CultureInfo.GetCultures(CultureTypes.AllCultures).Where(info => languages.Contains(info.Name));
            return cultures.Count() > 0 ? cultures.First() : defaultCulture;
        }

        protected virtual CultureInfo ResolveLanguage(List<string> languages)
        {
            return ResolveLanguage(languages, CultureInfo.CurrentCulture);
        }

        
    }
}
