using EPiServer.ContentApi.Core.Serialization;
using EPiServer.ContentApi.Core.Serialization.Models;
using EPiServer.Core;
using EPiServer.SpecializedProperties;
using Foundation.ContentApi.Extensions.Conversion.StructuredHtml;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
                // When we're running without HttpContext always return the raw XHtml data
                if (_httpContextAccessor.HttpContext is null)
                    return true;

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
                if (OutputRawHtml || contentMappingContext.IsContentManagementRequest)
                    return new XhtmlPropertyModel(propertyXhtmlString, contentMappingContext);

                return new StructuredHtmlPropertyModel(propertyXhtmlString, contentMappingContext);
            }

            throw new ApplicationException("The provided propertyData is of the incorrect type");
        }
    }
}
