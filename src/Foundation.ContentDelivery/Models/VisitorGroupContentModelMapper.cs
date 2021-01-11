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
    class VisitorGroupContentModelMapper : ContentModelMapperBase
    {
        private readonly ServiceAccessor<HttpContextBase> _httpContextAccessor;
        private readonly ServiceAccessor<EPiServer.Web.IContextModeResolver> _contextModeAccessor;
        public VisitorGroupContentModelMapper(IContentTypeRepository contentTypeRepository, 
                                        ReflectionService reflectionService, 
                                        IContentModelReferenceConverter contentModelService, 
                                        IContentVersionRepository contentVersionRepository, 
                                        ContentLoaderService contentLoaderService, 
                                        UrlResolverService urlResolverService, 
                                        ContentApiConfiguration apiConfig, 
                                        IPropertyConverterResolver propertyConverterResolver,
                                        ServiceAccessor<HttpContextBase> httpContextAccessor,
                                        ServiceAccessor<EPiServer.Web.IContextModeResolver> contextModeAccessor)
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
            _contextModeAccessor = contextModeAccessor;
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
            return _contextModeAccessor().CurrentMode.EditOrPreview() && content is IContent;
        }
    }
}
