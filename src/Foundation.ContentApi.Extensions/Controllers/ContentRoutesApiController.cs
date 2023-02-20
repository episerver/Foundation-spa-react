using EPiServer;
using EPiServer.ContentApi.Core.Internal;
using EPiServer.Core;
using EPiServer.Find.Helpers;
using EPiServer.Globalization;
using EPiServer.Shell;
using EPiServer.Web;
using EPiServer.Web.Routing;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Foundation.ContentApi.Extensions.Controllers
{
    [ApiController]
    [Route("api/foundation/v1.0/routes")]
    [ContentLanguageFilter]
    public class ContentRoutesApiController : Controller
    {
        protected readonly IContentLoader ContentLoader;
        protected readonly ISiteDefinitionRepository SiteDefinitionRepository;
        protected readonly IUrlResolver UrlResolver;

        public ContentRoutesApiController(
            IContentLoader contentLoader, 
            ISiteDefinitionRepository siteDefinitionRepository,
            IUrlResolver urlResolver
        )
        {
            ContentLoader = contentLoader;
            SiteDefinitionRepository = siteDefinitionRepository;
            UrlResolver = urlResolver;
        }

        [HttpGet]
        [Route("{siteId}")]
        public ActionResult<IEnumerable<string>> GetRoutes(
            Guid siteId,
            [FromHeader(Name = "Accept-Language")] List<string> languages
        )
        {
            var language = GetLanguage(languages);
            var website = SiteDefinitionRepository.Get(siteId);
            if (website is null)
                return NotFound();
            var allPages = ContentLoader.GetDescendents(website.StartPage);
            return Ok(allPages.Select(cref => GetUrl(cref, language.Name)).Where(url => url is not null));
        }

        /// <summary>
        /// Get the Absolute URL to the content
        /// </summary>
        /// <param name="contentLink"></param>
        /// <param name="language"></param>
        /// <returns></returns>
        [NonAction]
        protected string GetUrl(ContentReference contentLink, string language) => UrlResolver.GetUrl(
            contentLink, 
            language, 
            new UrlResolverArguments() {
                ForceAbsolute = true,
                ContextMode = ContextMode.Default
            }
        );

        /// <summary>
        /// 
        /// </summary>
        /// <param name="languages"></param>
        /// <returns></returns>
        [NonAction]
        protected virtual CultureInfo GetLanguage(List<string> languages)
        {
            var language = languages is null || !languages.Any() ? null : languages.Where(x => x != "*").FirstOrDefault();
            var culture = language is not null ? CultureInfo.GetCultureInfo(language) : ContentLanguage.PreferredCulture;
            return culture;
        }
    }
}
