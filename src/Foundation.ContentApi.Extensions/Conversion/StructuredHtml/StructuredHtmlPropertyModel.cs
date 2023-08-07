using EPiServer.ContentApi.Core.Serialization;
using EPiServer.ContentApi.Core.Serialization.Internal;
using EPiServer.ContentApi.Core.Serialization.Models;
using EPiServer.ContentApi.Core.Serialization.Models.Internal;
using EPiServer.SpecializedProperties;
using System.Globalization;

namespace Foundation.ContentApi.Extensions.Conversion.StructuredHtml
{
    internal class StructuredHtmlPropertyModel : PersonalizablePropertyModel<string, PropertyXhtmlString>
    {
        private readonly Injected<IXhtmlStringPropertyRenderer> _xhtmlStringPropertyRenderer;

        public StructuredHtmlPropertyModel(
          PropertyXhtmlString propertyXhtmlString,
          ConverterContext converterContext,
          StructuredHtmlContext structuredHtmlContext)
          : base(propertyXhtmlString, converterContext)
        {
            if (converterContext.IsContentManagementRequest)
            {
                Value = propertyXhtmlString.XhtmlString?.ToEditString() ?? string.Empty;
            }
            else
            {
                var htmlString = _xhtmlStringPropertyRenderer.Service.Render(propertyXhtmlString, converterContext.ExcludePersonalizedContent);
                Value = new HTMLRoot(htmlString, structuredHtmlContext).Data;
            }
        }

    }

    internal class StructuredHtmlPropertyModelOld : 
        PersonalizablePropertyModel<HTMLRoot, PropertyXhtmlString>, 
        IFlattenableProperty,
        IExpandableProperty, 
        IExpandableProperty<IEnumerable<ContentApiModel>>,
        IPropertyModel
    {
        private readonly Injected<IXhtmlStringPropertyRenderer> _xhtmlStringPropertyRenderer;
        private readonly Injected<IContentExpander> _contentExpander;

        public StructuredHtmlPropertyModelOld(PropertyXhtmlString data, ConverterContext context, StructuredHtmlContext structuredHtmlContext) : base(data, context)
        {
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

        protected virtual ContentApiModel ExtractExpandedValue(ContentModelReference reference, CultureInfo language) => _contentExpander.Service.Expand(reference, GetConverterContextForLanguage(language));

        protected virtual ConverterContext GetConverterContextForLanguage(CultureInfo language)
        {
            // If we have no language, get the default
            language ??= CultureInfo.InvariantCulture;

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
