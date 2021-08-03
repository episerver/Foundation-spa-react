using EPiServer;
using EPiServer.ContentApi.Core;
using EPiServer.ContentApi.Core.Configuration;
using EPiServer.Core;
using EPiServer.Web.Routing;
using IContextModeResolver = EPiServer.Web.IContextModeResolver;

namespace Foundation.ContentDelivery.Models
{
    public class CurrentContextUrlResolverService : UrlResolverService
    {
        private readonly ContentApiConfiguration _contentApiConfiguration;
        protected readonly IContextModeResolver _contextModeResolver;

        public CurrentContextUrlResolverService(
            UrlResolver urlResolver,
            ContentApiConfiguration contentApiConfiguration,
            IContextModeResolver contextModeResolver
        ) : base(urlResolver, contentApiConfiguration)
        {
            _contentApiConfiguration = contentApiConfiguration;
            _contextModeResolver = contextModeResolver;
        }

        /// <summary>
        /// Make sure that we transform the internal URLs to context aware internal URLs
        /// </summary>
        /// <param name="internalLink">The internal link</param>
        /// <returns>The Context aware internal link</returns>
        public override string ResolveUrl(string internalLink)
        {
            return _urlResolver.GetUrl(new UrlBuilder(internalLink), VirtualPathArguments);
        }

        /// <summary>
        /// Make sure that we generate context aware links to content items.
        /// </summary>
        /// <param name="contentLink">The content to generate the link for</param>
        /// <param name="language">The current language</param>
        /// <returns>The context aware URL</returns>
        public override string ResolveUrl(ContentReference contentLink, string language)
        {
            return _urlResolver.GetUrl(contentLink, language, VirtualPathArguments);
        }

        private VirtualPathArguments _arguments = null;

        protected virtual VirtualPathArguments VirtualPathArguments
        {
            get
            {
                if (_arguments == null)
                {
                    var contentApiOptions = _contentApiConfiguration.GetOptions();
                    _arguments = new VirtualPathArguments
                    {
                        ContextMode = _contextModeResolver.CurrentMode,
                        ForceCanonical = true,
                        ForceAbsolute = contentApiOptions.ForceAbsolute,
                        ValidateTemplate = contentApiOptions.ValidateTemplateForContentUrl,
                    };
                }
                return _arguments;
            }
        }
    }
}