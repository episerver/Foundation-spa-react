using EPiServer;
using EPiServer.ContentApi.Core;
using EPiServer.ContentApi.Core.Security;
using EPiServer.ContentApi.Core.Serialization;
using EPiServer.ContentApi.Core.Serialization.Models;
using EPiServer.Core;
using EPiServer.Security;
using EPiServer.ServiceLocation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Foundation.ContentDelivery.Models.Api
{
    public class TypedContentReferencePropertyModel : ContentReferencePropertyModelBase<ContentModelReference, PropertyContentReference>
    {
        private IContentModelReferenceConverter _contentModelReferenceConverter;

        protected IContentModelReferenceConverter ReferenceConverter
        {
            get
            {
                if (_contentModelReferenceConverter == null)
                    _contentModelReferenceConverter = ServiceLocator.Current.GetInstance<IContentModelReferenceConverter>();
                return _contentModelReferenceConverter;
            }
        }

        #region Constructors
        public TypedContentReferencePropertyModel(PropertyContentReference propertyContentReference, bool excludePersonalizedContent) : base(propertyContentReference, excludePersonalizedContent)
        {
            _contentModelReferenceConverter = ServiceLocator.Current.GetInstance<IContentModelReferenceConverter>();
        }

        public TypedContentReferencePropertyModel(PropertyContentReference propertyContentReference, ConverterContext converterContext) : base(propertyContentReference, converterContext)
        {
            _contentModelReferenceConverter = ServiceLocator.Current.GetInstance<IContentModelReferenceConverter>();
        }

        [Obsolete]
        public TypedContentReferencePropertyModel(PropertyContentReference propertyContentReference, bool excludePersonalizedContent, IContentLoader contentLoader, IContentModelMapper contentModelMapper, IContentAccessEvaluator accessEvaluator, ISecurityPrincipal principalAccessor) : base(propertyContentReference, excludePersonalizedContent, contentLoader, contentModelMapper, accessEvaluator, principalAccessor)
        {
            _contentModelReferenceConverter = ServiceLocator.Current.GetInstance<IContentModelReferenceConverter>();
        }

        public TypedContentReferencePropertyModel(PropertyContentReference propertyContentReference, bool excludePersonalizedContent, IContentLoader contentLoader, IContentModelMapper contentModelMapper, IContentAccessEvaluator accessEvaluator, ISecurityPrincipal principalAccessor, UrlResolverService urlResolverService) : base(propertyContentReference, excludePersonalizedContent, contentLoader, contentModelMapper, accessEvaluator, principalAccessor, urlResolverService)
        {
            _contentModelReferenceConverter = ServiceLocator.Current.GetInstance<IContentModelReferenceConverter>();
        }

        public TypedContentReferencePropertyModel(PropertyContentReference propertyContentReference, ConverterContext converterContext, IContentLoader contentLoader, ContentConvertingService contentConvertingService, IContentAccessEvaluator accessEvaluator, ISecurityPrincipal principalAccessor, UrlResolverService urlResolverService) : base(propertyContentReference, converterContext, contentLoader, contentConvertingService, accessEvaluator, principalAccessor, urlResolverService)
        {
            _contentModelReferenceConverter = ServiceLocator.Current.GetInstance<IContentModelReferenceConverter>();
        }

        public TypedContentReferencePropertyModel(PropertyContentReference propertyContentReference, ConverterContext converterContext, ContentLoaderService contentLoaderService, ContentConvertingService contentConvertingService, IContentAccessEvaluator accessEvaluator, ISecurityPrincipal principalAccessor, UrlResolverService urlResolverService) : base(propertyContentReference, converterContext, contentLoaderService, contentConvertingService, accessEvaluator, principalAccessor, urlResolverService)
        {
            _contentModelReferenceConverter = ServiceLocator.Current.GetInstance<IContentModelReferenceConverter>();
        }

        public TypedContentReferencePropertyModel(
            PropertyContentReference propertyContentReference, 
            ConverterContext converterContext, 
            ContentLoaderService contentLoaderService, 
            ContentConvertingService contentConvertingService, 
            IContentAccessEvaluator accessEvaluator, 
            ISecurityPrincipal principalAccessor, 
            UrlResolverService urlResolverService,
            IContentModelReferenceConverter contentModelReferenceConverter
        ) : base(propertyContentReference, converterContext, contentLoaderService, contentConvertingService, accessEvaluator, principalAccessor, urlResolverService)
        {
            _contentModelReferenceConverter = contentModelReferenceConverter;
        }
        #endregion

        protected override ContentModelReference GetValue()
        {
            if (ContentReference.IsNullOrEmpty(_propertyContentReference.ContentLink))
                return null;

            return ReferenceConverter.GetContentModelReference(_propertyContentReference.ContentLink);
        }
    }
}
