using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EPiServer.Core;
using HtmlAgilityPack;
using Newtonsoft.Json;

namespace Foundation.ContentApi.Extensions.Conversion.StructuredHtml
{
    internal class HTMLRoot
    {
        
        public IEnumerable<HTMLElement> Components { get; }
        public IEnumerable<string> Errors { get; }

        public HTMLRoot(XhtmlString xHtmlString)
        {
            var htmlString = RenderXhtmlString(xHtmlString);
            var doc = new HtmlDocument();
            doc.LoadHtml(htmlString);

            Errors = doc.ParseErrors.Select(e => e.Reason);
            Components = doc.DocumentNode.ChildNodes.Where(x => !x.Name.Equals("#text")).Select(x => new HTMLElement(x));
        }

        public HTMLRoot(string htmlString) {
            var doc = new HtmlDocument();
            doc.LoadHtml(htmlString);

            Errors = doc.ParseErrors.Select(e => e.Reason);
            Components = doc.DocumentNode.ChildNodes.Where(x => !x.Name.Equals("#text")).Select(x => new HTMLElement(x));
        }

        protected virtual string RenderXhtmlString(XhtmlString xHtmlString)
        {
            return xHtmlString.ToString();
        }
    }
}
