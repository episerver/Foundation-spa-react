using EPiServer.ContentApi.Core.Serialization;
using EPiServer.ContentApi.Core.Serialization.Models;
using EPiServer.Core;
using EPiServer.SpecializedProperties;
using Foundation.ContentApi.Extensions.Conversion.StructuredHtml;
using Microsoft.AspNetCore.Http;
using System;

namespace Foundation.ContentApi.Extensions.Conversion
{
    public class StructuredHtmlPropertyConverter : IPropertyConverter
    {
        private readonly StructuredHtmlPropertyOptions _options;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public StructuredHtmlPropertyConverter(
            StructuredHtmlPropertyOptions options,
            IHttpContextAccessor httpContextAccessor
        ) {
            _options = options;
            _httpContextAccessor = httpContextAccessor;
        }

        public virtual bool OutputRawHtml
        {
            get
            {
                if (_options.StructureByDefault && string.Equals("true", _httpContextAccessor.HttpContext?.Request?.Query["rawHtml"], StringComparison.OrdinalIgnoreCase))
                    return true;

                if (!_options.StructureByDefault && !string.Equals("false", _httpContextAccessor.HttpContext?.Request?.Query["rawHtml"], StringComparison.OrdinalIgnoreCase))
                    return true;

                return false;
            }
        }

        public IPropertyModel Convert(PropertyData propertyData, ConverterContext contentMappingContext)
        {
            if (propertyData is PropertyXhtmlString propertyXhtmlString)
            {
                // Convert to property model
                IPropertyModel? propertyModel;
                if (OutputRawHtml || contentMappingContext.IsContentManagementRequest)
                    propertyModel = new XhtmlPropertyModel(propertyXhtmlString, contentMappingContext);
                else
                    propertyModel = new StructuredHtmlPropertyModel(propertyXhtmlString, contentMappingContext, StructuredHtmlContext.FromConverterContext(contentMappingContext));

                // Add support for expansion
                if (contentMappingContext.ShouldExpand(propertyData.Name) && propertyModel is IExpandableProperty expandableProperty)
                    expandableProperty.Expand(contentMappingContext.Language);

                // Return the result
                return propertyModel;
            }
            throw new ApplicationException("The provided propertyData is of the incorrect type");
        }
    }
}
