using System.Collections.Generic;
using System.Linq;
using EPiServer.ContentApi.Core.Serialization.Models;
using HtmlAgilityPack;
using Microsoft.AspNetCore.Mvc.NewtonsoftJson;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using NewtonsoftJsonIgnoreAttribute = Newtonsoft.Json.JsonIgnoreAttribute;
using SystemTextJsonIgnoreAttribute = System.Text.Json.Serialization.JsonIgnoreAttribute;


namespace Foundation.ContentApi.Extensions.Conversion.StructuredHtml
{
    internal class HTMLRoot
    {
        [NewtonsoftJsonIgnore]
        [SystemTextJsonIgnore]
        protected IEnumerable<HTMLElement> Components { get; set; }
        public IEnumerable<ContentModelReference> Contents { get; set; }
        public string Data
        {
            get
            {
                var camelCase = new CamelCaseNamingStrategy()
                {
                    ProcessDictionaryKeys = true,
                    ProcessExtensionDataNames = true,
                    OverrideSpecifiedNames = true
                };
                var settings = new JsonSerializerSettings()
                {
                    MaxDepth = 32,
                    MissingMemberHandling = MissingMemberHandling.Ignore,
                    TypeNameHandling = TypeNameHandling.None,
                    DateTimeZoneHandling = DateTimeZoneHandling.Utc,
                    NullValueHandling = NullValueHandling.Ignore,
                    ContractResolver = new DefaultContractResolver()
                    {
                        NamingStrategy = camelCase
                    },
                    Converters = new List<JsonConverter>()
                    {
                        new StringEnumConverter(camelCase),
                        new ProblemDetailsConverter(),
                        new ValidationProblemDetailsConverter()
                    }
                };
                return JsonConvert.SerializeObject(Components, settings);
            }
        }

        
        public IEnumerable<string> Errors { get; }

        public HTMLRoot(string htmlString, StructuredHtmlContext context) {
            var doc = new HtmlDocument();
            doc.LoadHtml(htmlString);

            Errors = doc.ParseErrors.Select(e => e.Reason);
            Components = doc.DocumentNode.ChildNodes.Where(x => !x.Name.Equals("#text")).Select(x => new HTMLElement(x));
            Contents = Components.SelectMany(x => x.CollectReferences(context));
        }

        public bool ShouldSerializeComponents() => false;
        public bool ShouldSerializeContents() => Contents.Any();
        public bool ShouldSerializeErrors() => Errors.Any();
    }
}
