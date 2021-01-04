using EPiServer;
using EPiServer.Editor;
using EPiServer.Framework.Modules;
using EPiServer.ServiceLocation;
using EPiServer.Web;
using EPiServer.Web.Internal;
using System;
using System.Text.RegularExpressions;
using System.Web;

namespace Foundation.ContentDelivery.Models
{
    [ServiceConfiguration]
    [ServiceConfiguration(typeof(EPiServer.ContentApi.Core.IContextModeResolver))]
    [ServiceConfiguration(typeof(IContextModeResolver))]
    [ServiceConfiguration(typeof(ContextModeResolver))] // Well, ehm, this one is registered explicitly in the container, so replacing it as well
    class ContentApiContextModeResolver : ContextModeResolver, EPiServer.ContentApi.Core.IContextModeResolver, IContextModeResolver
    {
        protected readonly ServiceAccessor<HttpContextBase> _httpContextAccessor;
        protected readonly ServiceAccessor<IModuleResourceResolver> _moduleResourceResolverAccessor;
        protected readonly Regex _editRouteRegex = new Regex(",{2}\\d+");

        public ContextMode DefaultContextMode { get; set; } = ContextMode.Default;

        public ContentApiContextModeResolver(
            ServiceAccessor<HttpContextBase> httpContextAccessor,
            ServiceAccessor<IModuleResourceResolver> moduleResourceResolverAccessor
        ) {
            _httpContextAccessor = httpContextAccessor;
            _moduleResourceResolverAccessor = moduleResourceResolverAccessor;
        }

        ContextMode IContextModeResolver.CurrentMode => CurrentMode();

        public override ContextMode CurrentMode()
        {
            // Use HTTP Context
            var httpContext = _httpContextAccessor();

            // Check if we have an HTTP Context with Request and an already resolved ContextMode
            if (httpContext == null || httpContext.Request == null)
                return DefaultContextMode;
            if (httpContext.Request.RequestContext != null && httpContext.Request.RequestContext.HasApiContextMode())
                return httpContext.Request.RequestContext.GetApiContextMode(DefaultContextMode);

            // Perform actual context mode resolution
            var contextMode = Resolve(httpContext.Request.RawUrl, DefaultContextMode);

            // Store current request context mode and return
            if (httpContext.Request.RequestContext != null)
                httpContext.Request.RequestContext.SetApiContextMode(contextMode);
            return contextMode;
        }

        public ContextMode Resolve(string contentUrl, ContextMode defaultContextMode)
        {
            var urlBuilder = new UrlBuilder(contentUrl);
            if (IsCmsUrl(urlBuilder) || IsApiUrl(urlBuilder)) {
                if (IsEditingActive(urlBuilder))
                    return ContextMode.Edit;
                if (IsPreviewingActive(urlBuilder))
                    return ContextMode.Preview;
            }
            return defaultContextMode;
        }

        protected virtual bool IsCmsUrl(UrlBuilder contentUrl)
        {
            var moduleResourceResolver = _moduleResourceResolverAccessor();
            return moduleResourceResolver == null || contentUrl.Path.StartsWith(moduleResourceResolver.ResolvePath("CMS", (string)null), StringComparison.OrdinalIgnoreCase);
        }

        protected virtual bool IsApiUrl(UrlBuilder contentUrl)
        {
            return contentUrl.Path.StartsWith("/api/episerver/", StringComparison.OrdinalIgnoreCase);
        }

        protected virtual bool IsEditingActive(UrlBuilder urlBuilder)
        {
            if (urlBuilder.QueryCollection[PageEditing.EpiEditMode] != null)
            {
                return urlBuilder.QueryCollection[PageEditing.EpiEditMode].Equals("true", StringComparison.OrdinalIgnoreCase);
            }
            return false;
        }

        protected virtual bool IsPreviewingActive(UrlBuilder urlBuilder)
        {
            return !string.IsNullOrEmpty(urlBuilder.Path) && _editRouteRegex.IsMatch(urlBuilder.Path);
        }
    }
}
