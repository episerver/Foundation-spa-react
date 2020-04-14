using EPiServer.Cms.Shell;
using EPiServer.ContentApi.Core.Configuration;
using EPiServer.ContentApi.Core;
using EPiServer.ContentApi.Core.Serialization;
using EPiServer.ContentApi.Core.Serialization.Models;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.Editor;
using EPiServer.ServiceLocation;
using EPiServer.Web;
using EPiServer.Web.Routing;
using System.Web;

namespace Foundation.ContentDeliveryApi.Models
{
    [ServiceConfiguration(typeof(IContentModelMapper))]
    public class ExtendedContentModelMapper : ContentModelMapperBase
    {
        private readonly ServiceAccessor<HttpContextBase> _httpContextAccessor;
        protected new readonly IUrlResolver _urlResolver;

        public ExtendedContentModelMapper(
            IContentTypeRepository contentTypeRepository,
            ReflectionService reflectionService,
            IContentModelReferenceConverter contentModelService,
            IContentVersionRepository contentVersionRepository,
            ContentLoaderService contentLoaderService,
            UrlResolverService urlResolverService,
            ContentApiConfiguration apiConfig,
            IPropertyConverterResolver propertyConverterResolver,
            ServiceAccessor<HttpContextBase> httpContextAccessor,
            IUrlResolver urlResolver
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
            _httpContextAccessor = httpContextAccessor;
            _urlResolver = urlResolver;
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
            return _urlResolver.GetUrl(contentLink, language, new UrlResolverArguments
            {
                ContextMode = GetContextMode()
            });
        }

        /// <summary>
        /// The "epieditmode" querystring parameter is added to URLs by Episerver as a way to keep track of what context is currently active.
        /// If there is no "epieditmode" parameter we're in regular view mode.
        /// If the "epieditmode" parameter has value "True" we're in edit mode.
        /// If the "epieditmode" parameter has value "False" we're in preview mode.
        /// All of these different modes will resolve to different URLs for the same content.
        /// </summary>
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

        public override bool CanHandle<T>(T content)
        {
            return content is PageData;
        }
    }
}
