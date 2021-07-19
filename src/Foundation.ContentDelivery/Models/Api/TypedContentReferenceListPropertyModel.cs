
using EPiServer.ContentApi.Core;
using EPiServer.ContentApi.Core.Security;
using EPiServer.ContentApi.Core.Serialization;
using EPiServer.ContentApi.Core.Serialization.Models;
using EPiServer.Security;
using EPiServer.ServiceLocation;
using EPiServer.SpecializedProperties;
using EPiServer.Web;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Foundation.ContentDelivery.Models.Api
{
    public class TypedContentReferenceListPropertyModel : ContentReferenceListPropertyModelBase<List<ContentModelReference>, PropertyContentReferenceList>
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
        public TypedContentReferenceListPropertyModel(PropertyContentReferenceList propertyContentReferenceList, bool excludePersonalizedContent)
            : base(propertyContentReferenceList, excludePersonalizedContent)
        {
            _contentModelReferenceConverter = ServiceLocator.Current.GetInstance<IContentModelReferenceConverter>();
        }

        public TypedContentReferenceListPropertyModel(PropertyContentReferenceList propertyContentReferenceList, ConverterContext converterContext)
            : base(propertyContentReferenceList, converterContext)
        {
            _contentModelReferenceConverter = ServiceLocator.Current.GetInstance<IContentModelReferenceConverter>();
        }

        [Obsolete("Use alternative constructor")]
        public TypedContentReferenceListPropertyModel(PropertyContentReferenceList propertyContentReferenceList, bool excludePersonalizedContent, IPermanentLinkMapper linkMapper, ContentLoaderService contentLoaderService, IContentModelMapper contentModelMapper, IContentAccessEvaluator accessEvaluator, ISecurityPrincipal principalAccessor)
            : base(propertyContentReferenceList, excludePersonalizedContent, linkMapper, contentLoaderService, contentModelMapper, accessEvaluator, principalAccessor)
        {
            _contentModelReferenceConverter = ServiceLocator.Current.GetInstance<IContentModelReferenceConverter>();
        }
        public TypedContentReferenceListPropertyModel(PropertyContentReferenceList propertyContentReferenceList, ConverterContext converterContext, IPermanentLinkMapper linkMapper, ContentLoaderService contentLoaderService, ContentConvertingService contentConvertingService, IContentAccessEvaluator accessEvaluator, ISecurityPrincipal principalAccessor, UrlResolverService urlResolverService)
            : base(propertyContentReferenceList, converterContext, linkMapper, contentLoaderService, contentConvertingService, accessEvaluator, principalAccessor, urlResolverService)
        {
            _contentModelReferenceConverter = ServiceLocator.Current.GetInstance<IContentModelReferenceConverter>();
        }
        public TypedContentReferenceListPropertyModel(PropertyContentReferenceList propertyContentReferenceList, bool excludePersonalizedContent, IPermanentLinkMapper linkMapper, ContentLoaderService contentLoaderService, IContentModelMapper contentModelMapper, IContentAccessEvaluator accessEvaluator, ISecurityPrincipal principalAccessor, UrlResolverService urlResolverService)
            : base(propertyContentReferenceList, excludePersonalizedContent, linkMapper, contentLoaderService, contentModelMapper, accessEvaluator, principalAccessor, urlResolverService)
        {
            _contentModelReferenceConverter = ServiceLocator.Current.GetInstance<IContentModelReferenceConverter>();
        }
        public TypedContentReferenceListPropertyModel(PropertyContentReferenceList propertyContentReferenceList, ConverterContext converterContext, IPermanentLinkMapper linkMapper, ContentLoaderService contentLoaderService, ContentConvertingService contentConvertingService, IContentAccessEvaluator accessEvaluator, ISecurityPrincipal principalAccessor, UrlResolverService urlResolverService, IContentModelReferenceConverter contentModelReferenceConverter)
            : base(propertyContentReferenceList, converterContext, linkMapper, contentLoaderService, contentConvertingService, accessEvaluator, principalAccessor, urlResolverService)
        {
            _contentModelReferenceConverter = contentModelReferenceConverter;
        }
        public TypedContentReferenceListPropertyModel(PropertyContentReferenceList propertyContentReferenceList, bool excludePersonalizedContent, IPermanentLinkMapper linkMapper, ContentLoaderService contentLoaderService, IContentModelMapper contentModelMapper, IContentAccessEvaluator accessEvaluator, ISecurityPrincipal principalAccessor, UrlResolverService urlResolverService, IContentModelReferenceConverter contentModelReferenceConverter)
            : base(propertyContentReferenceList, excludePersonalizedContent, linkMapper, contentLoaderService, contentModelMapper, accessEvaluator, principalAccessor, urlResolverService)
        {
            _contentModelReferenceConverter = contentModelReferenceConverter;
        }

        #endregion

        protected override List<ContentModelReference> GetValue()
        {
            if (_propertyContentReferenceList.IsNull || _propertyContentReferenceList.List == null || _propertyContentReferenceList.List.Count == 0)
                return default;

            return _propertyContentReferenceList.List.Select(x => ReferenceConverter.GetContentModelReference(x)).ToList();
        }
    }
}
