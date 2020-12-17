using EPiServer.ContentApi.Core;
using EPiServer.ContentApi.Core.Configuration;
using EPiServer.ContentApi.Core.Serialization;
using EPiServer.ContentApi.Core.Serialization.Models;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.Editor;
using EPiServer.Security;
using EPiServer.ServiceLocation;
using EPiServer.Web;
using System.Web;

namespace Foundation.ContentDelivery.Models
{
    [ServiceConfiguration(typeof(IContentModelMapper))]
    class CustomContentModelMapper : ContentModelMapperBase
    {
        private readonly ServiceAccessor<HttpContextBase> _httpContextAccessor;
        public CustomContentModelMapper(IContentTypeRepository contentTypeRepository, 
                                        ReflectionService reflectionService, 
                                        IContentModelReferenceConverter contentModelService, 
                                        IContentVersionRepository contentVersionRepository, 
                                        ContentLoaderService contentLoaderService, 
                                        UrlResolverService urlResolverService, 
                                        ContentApiConfiguration apiConfig, 
                                        IPropertyConverterResolver propertyConverterResolver,
                                        ServiceAccessor<HttpContextBase> httpContextAccessor)
                                        : base(contentTypeRepository, 
                                               reflectionService, 
                                               contentModelService, 
                                               contentVersionRepository, 
                                               contentLoaderService, 
                                               urlResolverService, 
                                               apiConfig, 
                                               propertyConverterResolver)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public override int Order
        {
            get
            {
                return 200;
            }
        }
        /// <summary>
        /// Maps an instance of IContent to ContentApiModel and additionally add info about existing languages
        /// </summary>
        public override ContentApiModel TransformContent(IContent content, bool excludePersonalizedContent, string expand)
        {
            var httpContext = _httpContextAccessor();
            var visitorGroupId = httpContext?.Request.QueryString[VisitorGroupHelpers.VisitorGroupKeyByID];
            if (!string.IsNullOrEmpty(visitorGroupId))
            {
                httpContext.SetupVisitorGroupImpersonation(content, AccessLevel.Read);
            }
            var contentModel = base.TransformContent(content, excludePersonalizedContent, expand);
            return contentModel;
        }
        public override bool CanHandle<T>(T content)
        {
            // NOTE: you can uncomment the below code to make this custom mapper only active when in Edit Mode
            var contextMode = GetContextMode();
            return (contextMode == ContextMode.Edit || contextMode == ContextMode.Preview) && content is IContent;
            // return content is IContent;
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
