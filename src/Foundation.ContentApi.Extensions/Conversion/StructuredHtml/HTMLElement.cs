using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HtmlAgilityPack;

namespace Foundation.ContentApi.Extensions.Conversion.StructuredHtml
{
    internal class HTMLElement {
        public string ComponentType { get; }
        public IEnumerable<HTMLElement>? Children { get; }
        public Dictionary<string, object>? Attributes { get; }
        public string? Text { get; }
        public string? ContentId { get; }
        public Guid? Content { get; }
        public IEnumerable<string>? ContentType { get; }

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
                if (node.Attributes.Any()) Attributes = node.Attributes.ToDictionary(x => x.Name.ToLowerInvariant(), x => (object)x.Value);
                if (Attributes is not null && Attributes.ContainsKey("style"))
                {
                    var stylesText = Attributes["style"].ToString();
                    Attributes["style"] = stylesText is null ? "" : ParseStyles(stylesText);
                }
                if (Attributes is not null && Attributes.ContainsKey("class"))
                {
                    Attributes.Add("className", Attributes["class"]);
                    Attributes.Remove("class");
                }

                ComponentType = node.Name;
            }

            // Insert text
            if (node.IsOfType("#text"))
            {
                Text = node.GetDirectInnerText();
            }
        }

        protected virtual Dictionary<string, string> ParseStyles(string stylesString)
        {
            var data = new Dictionary<string, string>();

            foreach (var instruction in stylesString.Split(";").Select(x => x.Trim().Split(":", 2).Select(y => y.Trim()).ToArray()))
            {
                if (instruction.Length != 2)
                    continue;

                var prop = String.Join("", instruction[0].Split("-").Select(x => x[0].ToString().ToUpperInvariant() + x[1..]));
                prop = prop[0].ToString().ToLowerInvariant() + prop[1..];
                var value = instruction[1];
                data.Add(prop, value);
            }

            return data;
        }
    }

    public static class HtmlNodeExtensions
    {
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
