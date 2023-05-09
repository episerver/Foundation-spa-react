using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using EPiServer.ContentApi.Core.Serialization.Models;
using EPiServer.Core;
using EPiServer.Find.Helpers;
using HtmlAgilityPack;

namespace Foundation.ContentApi.Extensions.Conversion.StructuredHtml
{
    internal class HTMLElement {
        public string ComponentType { get; }
        public IEnumerable<HTMLElement>? Children { get; }
        public Dictionary<string, object> Attributes { get; } = new Dictionary<string, object>();
        public string? Text { get; }
        public string? ContentId { get; }
        public Guid? Content { get; }
        public IEnumerable<string>? ContentType { get; }

        public bool ShouldSerializeChildren() => Children is not null && Children.Any();
        public bool ShouldSerializeAttributes() => Attributes.Any();

        public ContentModelReference? GetAsContentReference(StructuredHtmlContext context) {
            ContentModelReference? cmr = default;

            // If we have a content identifier use that to create the ContentModelReference
            if (ContentReference.TryParse(ContentId, out var cRef))
            {
                cmr = context.ContentModelReferenceConverter.GetContentModelReference(cRef);
                if (string.IsNullOrWhiteSpace(cmr.Url))
                    cmr.Url = context.UrlResolverService.ResolveUrl(cRef, context.LanguageName, context.IsManagementRequest);
            }

            // If we have just a GUID, fall back to using that to create the ContentModelReference
            else if (Content is not null && Content != Guid.Empty)
            {
                cmr = new ContentModelReference() { GuidValue = Content };
            }
            return cmr;
        }

        public IEnumerable<ContentModelReference> CollectReferences(StructuredHtmlContext context)
        {
            var references = (Children ?? Array.Empty<HTMLElement>()).Select(x => x.GetAsContentReference(context));
            return references.Append(GetAsContentReference(context)).WhereNotNull();
        }

        public HTMLElement(HtmlNode node)
        {
            // Process childeren
            if (node.ChildNodes.Any())
                Children = node.ChildNodes.Where(x => !(x.IsOfType("#text") && string.IsNullOrWhiteSpace(x.GetDirectInnerText()))).Select(x => new HTMLElement(x));

            // Handle injected blocks
            if (node.IsOfType("section") && node.HasAttributeWithValue("data-type", "opti-content"))
            {
                ComponentType = "OptimizelyContent";
                ContentId = node.GetAttributeValue<string?>("data-id", null);
                var contentGuid = node.GetAttributeValue<string?>("data-guid", null);
                if (Guid.TryParse(contentGuid, out Guid cg))
                    Content = cg;
                ContentType = node.GetAttributeValue<string>("data-type", string.Empty).Split("/");
            }

            // Handle regular HTML elements
            else
            {
                Attributes.AddRange(node.Attributes.ToDictionary(x => NormalizeAttributeName(x.Name), y => (object)y.DeEntitizeValue));

                if (Attributes.ContainsKey("style") && Attributes["style"] is string styleData)
                    Attributes["style"] = ParseStyles(styleData);

                ComponentType = node.Name;
            }

            // Insert text
            if (node.IsOfType("#text"))
            {
                Text = node.GetDirectInnerText();
            }
        }

        protected virtual string NormalizeAttributeName(string attributeName)
        {
            var toProcess = attributeName.Trim();
            switch (toProcess.ToLowerInvariant())
            {
                case "class":
                    return "className";
            }

            var parts = toProcess.Split('-');
            var output = new List<string>(parts.Take(1));
            output.AddRange(parts.Skip(1).Select(Thread.CurrentThread.CurrentCulture.TextInfo.ToTitleCase));
            return string.Concat(output);
        }

        protected virtual Dictionary<string, string> ParseStyles(string stylesString)
        {
            var data = new Dictionary<string, string>();

            foreach (var instruction in stylesString.Split(";").Select(x => x.Trim().Split(":", 2).Select(y => y.Trim()).ToArray()))
            {
                if (instruction.Length != 2)
                    continue;

                var prop = string.Join("", instruction[0].Split("-").Select(x => x[0].ToString().ToUpperInvariant() + x[1..]));
                prop = prop[0].ToString().ToLowerInvariant() + prop[1..];
                var value = instruction[1];
                data.Add(prop, value);
            }

            return data;
        }
    }

    public static class HtmlNodeExtensions
    {
        public static IEnumerable<T> WhereNotNull<T>(this IEnumerable<T?> collection)
        {
            return (IEnumerable<T>)collection.Where(x => x is not null);
        }

        public static bool IsOfType(this HtmlNode node, string tag)
        {
            return node.Name.Equals(tag, StringComparison.OrdinalIgnoreCase);
        }

        public static bool HasAttributeWithValue(this HtmlNode node, string attribute, string? value = null)
        {
            return node.Attributes.Any((x) =>
            {
                if (x.Name.Equals(attribute, StringComparison.OrdinalIgnoreCase))
                {
                    if (value is null) return true;
                    return x.Value.Equals(value, StringComparison.OrdinalIgnoreCase);
                }
                return false;
            });
        }
    }
}
