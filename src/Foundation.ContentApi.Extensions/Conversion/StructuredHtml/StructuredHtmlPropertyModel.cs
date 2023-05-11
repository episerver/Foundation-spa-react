using EPiServer.ContentApi.Core.Serialization;
using EPiServer.ContentApi.Core.Serialization.Internal;
using EPiServer.ContentApi.Core.Serialization.Models;
using EPiServer.ContentApi.Core.Serialization.Models.Internal;
using EPiServer.ServiceLocation;
using EPiServer.SpecializedProperties;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace Foundation.ContentApi.Extensions.Conversion.StructuredHtml
{
    internal class StructuredHtmlPropertyModel : 
        PersonalizablePropertyModel<HTMLRoot, PropertyXhtmlString>, 
        IFlattenableProperty,
        IExpandableProperty, 
        IExpandableProperty<IEnumerable<ContentApiModel>>,
        IPropertyModel
    {
        private readonly Injected<IXhtmlStringPropertyRenderer> _xhtmlStringPropertyRenderer;
        private readonly IContentExpander _contentExpander;

        public StructuredHtmlPropertyModel(PropertyXhtmlString data, ConverterContext context, StructuredHtmlContext structuredHtmlContext) : base(data, context)
        {
            // Set class fields
            _contentExpander = ServiceLocator.Current.GetInstance<IContentExpander>();

            // Generate model data
            var htmlString = _xhtmlStringPropertyRenderer.Service.Render(data, context.ExcludePersonalizedContent);
            Value = new HTMLRoot(htmlString, structuredHtmlContext);
        }

        public IEnumerable<ContentApiModel> ExpandedValue { get; set; } = Array.Empty<ContentApiModel>();

        public void Expand(CultureInfo language)
        {
            if (!Value.Contents.Any() || ConverterContext.IsContentManagementRequest)
                return;
            ExpandedValue = Value.Contents.Select(cmr => ExtractExpandedValue(cmr, language)); 
        }

        public override object Flatten()
        {
            if (!Value.Contents.Any())
                return base.Flatten();

            Value.Contents = Value.Contents.Select(cRef =>
            {
                var expValue = ExpandedValue.Where(x => cRef.GuidValue == x.ContentLink.GuidValue).FirstOrDefault();
                cRef.Expanded = expValue;
                return cRef;
            });

            return Value;
        }

        protected virtual ContentApiModel ExtractExpandedValue(ContentModelReference reference, CultureInfo language) => _contentExpander.Expand(reference, GetConverterContextForLanguage(language));

        protected virtual ConverterContext GetConverterContextForLanguage(CultureInfo language)
        {
            // If we have no language, get the default
            if (language is null)
                language = CultureInfo.InvariantCulture;

            // If the current context is in the right language, return it
            if (ConverterContext.Language.Equals(language))
                return ConverterContext;

            // Otherwise generate a new context
            return new(
                ConverterContext.ContentReference,
                language,
                ConverterContext.Options,
                ConverterContext.ContextMode,
                string.Join(",", ConverterContext.SelectedProperties),
                string.Join(",", ConverterContext.ExpandedProperties),
                ConverterContext.ExcludePersonalizedContent)
            { 
                IsContentManagementRequest = ConverterContext.IsContentManagementRequest,
            };
        }
    }
}
