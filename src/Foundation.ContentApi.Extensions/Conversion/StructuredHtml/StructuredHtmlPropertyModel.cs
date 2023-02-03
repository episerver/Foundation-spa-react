using EPiServer.ContentApi.Core.Serialization;
using EPiServer.ContentApi.Core.Serialization.Internal;
using EPiServer.ContentApi.Core.Serialization.Models;
using EPiServer.Core;
using EPiServer.ServiceLocation;
using EPiServer.SpecializedProperties;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Foundation.ContentApi.Extensions.Conversion.StructuredHtml
{
    internal class StructuredHtmlPropertyModel : PersonalizablePropertyModel<HTMLRoot, PropertyXhtmlString>
    {
        private readonly Injected<IXhtmlStringPropertyRenderer> _xhtmlStringPropertyRenderer;

        public StructuredHtmlPropertyModel(PropertyXhtmlString data, ConverterContext context) : base(data, context)
        {
            var htmlString = _xhtmlStringPropertyRenderer.Service.Render(data, context.ExcludePersonalizedContent);
            Value = new HTMLRoot(htmlString);
        }


    }
}
