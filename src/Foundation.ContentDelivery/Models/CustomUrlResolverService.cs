using EPiServer.ContentApi.Core;
using EPiServer.ContentApi.Core.Configuration;
using EPiServer.Core;
using EPiServer.Editor;
using EPiServer.ServiceLocation;
using EPiServer.Web;
using EPiServer.Web.Routing;
using System.Web;

namespace Foundation.ContentDelivery.Models
{
    public class CustomUrlResolverService : UrlResolverService
    {
        private readonly ServiceAccessor<HttpContextBase> _httpContextAccessor;

        public CustomUrlResolverService(UrlResolver urlResolver,
            ContentApiConfiguration contentApiConfiguration,
            ServiceAccessor<HttpContextBase> httpContextAccessor) : base(urlResolver, contentApiConfiguration)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        /// <summary>
        /// Make sure that we transform the internal URLs to context aware internal URLs
        /// </summary>
        /// <param name="internalLink">The internal link</param>
        /// <returns>The Context aware internal link</returns>
        public override string ResolveUrl(string internalLink)
        {
            var resolver = new EPiServer.UrlBuilder(internalLink);
            return _urlResolver.GetUrl(resolver, GetContextMode());
        }

        /// <summary>
        /// Make sure that we generate context aware links to content items.
        /// </summary>
        /// <param name="contentLink">The content to generate the link for</param>
        /// <param name="language">The current language</param>
        /// <returns>The context aware URL</returns>
        public override string ResolveUrl(ContentReference contentLink, string language)
        {
            return _urlResolver.GetUrl(contentLink, language, new VirtualPathArguments
            {
                ContextMode = GetContextMode()
            });
        }

        private ContextMode GetContextMode()
        {
            var httpCtx = _httpContextAccessor();
            if (httpCtx == null || httpCtx.Request == null || httpCtx.Request.QueryString[PageEditing.EpiEditMode] == null)
            {
                return ContextMode.Default;
            }
            if (bool.TryParse(httpCtx.Request.QueryString[PageEditing.EpiEditMode], out bool editMode))
            {
                return editMode ? ContextMode.Edit : ContextMode.Preview;
            }
            return ContextMode.Undefined;
        }
    }
}