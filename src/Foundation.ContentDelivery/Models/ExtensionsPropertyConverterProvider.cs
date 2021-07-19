using EPiServer.ContentApi.Core.Serialization;
using EPiServer.Core;
using EPiServer.ServiceLocation;
using EPiServer.SpecializedProperties;
using Foundation.ContentDelivery.Models.Api;
using System;
using System.Collections.Generic;

namespace Foundation.ContentDelivery.Models
{

    [ServiceConfiguration(typeof(IPropertyConverterProvider), Lifecycle = ServiceInstanceScope.Singleton)]
    public class ExtensionsPropertyConverterProvider : IPropertyConverterProvider, IPropertyConverter
    {
        protected readonly IDictionary<Type, Type> _mappings = new Dictionary<Type, Type>();

        public IDictionary<Type, Type> PropertyModelMappings => _mappings;

        public int SortOrder => 10;

        protected virtual bool CanConvert(PropertyData propertyData) => _mappings.ContainsKey(propertyData.GetType());

        public ExtensionsPropertyConverterProvider()
        {
            _mappings.Add(typeof(PropertyContentArea), typeof(DraftViewModeContentAreaPropertyModel));
            _mappings.Add(typeof(PropertyContentReference), typeof(TypedContentReferencePropertyModel));
            _mappings.Add(typeof(PropertyContentReferenceList), typeof(TypedContentReferenceListPropertyModel));
        }

        public IPropertyConverter Resolve(PropertyData propertyData)
        {
            if (!CanConvert(propertyData))
                return null;
            return this;
        }

        public IPropertyModel Convert(PropertyData propertyData, ConverterContext contentMappingContext)
        {
            if (!_mappings.ContainsKey(propertyData.GetType()))
                throw new NotSupportedException(string.Format("Property of type {0} cannot be converted by {1}", propertyData.GetType().Name, GetType().Name));

            var targetType = _mappings[propertyData.GetType()];
            if (!typeof(IPropertyModel).IsAssignableFrom(targetType))
                throw new NotSupportedException(string.Format("The conversion target of type {0} does not implement IPropertyModel", propertyData.GetType().Name));

            IPropertyModel propertyModel = (IPropertyModel)ServiceLocator.Current.CreateInstance(targetType, new object[] { propertyData, contentMappingContext });
            if (contentMappingContext.ShouldExpand(propertyData.Name) && propertyModel is IExpandableProperty expandableProperty)
                expandableProperty.Expand(contentMappingContext.Language);

            return propertyModel;
        }
    }
}
