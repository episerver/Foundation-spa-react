using EPiServer.Cms.Shell;
using EPiServer.ContentApi.Core.Configuration;
using EPiServer.ContentApi.Core;
using EPiServer.ContentApi.Core.Serialization;
using EPiServer.ContentApi.Core.Serialization.Models;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.ServiceLocation;
using EPiServer.Web;
using EPiServer.Web.Routing;
using IContextModeResolver = EPiServer.Web.IContextModeResolver;

namespace Foundation.ContentDelivery.Models
{
    //[ServiceConfiguration(typeof(IContentModelMapper))]
    public class PageDataContentModelMapper : ContentModelMapperBase
    {
        protected readonly IUrlResolver _coreUrlResolver;
        protected readonly IContextModeResolver _contextModeResolver;

        public PageDataContentModelMapper(
            IContentTypeRepository contentTypeRepository,
            ReflectionService reflectionService,
            IContentModelReferenceConverter contentModelService,
            IContentVersionRepository contentVersionRepository,
            ContentLoaderService contentLoaderService,
            UrlResolverService urlResolverService,
            ContentApiConfiguration apiConfig,
            IPropertyConverterResolver propertyConverterResolver,
            IUrlResolver urlResolver,
            IContextModeResolver contextModeResolver
        ) : base(
            contentTypeRepository,
            reflectionService,
            contentModelService,
            contentVersionRepository,
            contentLoaderService,
            urlResolverService,
            apiConfig,
            propertyConverterResolver
        )
        {
            _coreUrlResolver = urlResolver;
            _contextModeResolver = contextModeResolver;
        }

        public override int Order { get { return 110; } }

        /// <summary>
        /// Maps an instance of IContent to ContentApiModel and additionally add info about existing languages
        /// </summary>
        public override ContentApiModel TransformContent(IContent content, bool excludePersonalizedContent = false, string expand = "")
        {
            var contentModel = base.TransformContent(content, excludePersonalizedContent, expand);
            if (contentModel == null) return null;
            contentModel.Url = ResolveUrl(content.ContentLink, content.LanguageBranch());
            if (contentModel.ParentLink != null)
            {
                contentModel.ParentLink.Url = ResolveUrl(content.ParentLink, content.LanguageBranch());
            }

            return contentModel;
        }

        protected override string ResolveUrl(ContentReference contentLink, string language)
        {
            if (_contextModeResolver.CurrentMode.EditOrPreview())
                return _urlResolver.GetUrl(contentLink, language, new UrlResolverArguments { ContextMode = _contextModeResolver.CurrentMode });
            else
                return base.ResolveUrl(contentLink, language);
        }

        public override bool CanHandle<T>(T content)
        {
            return content is PageData;
        }
    }
}
