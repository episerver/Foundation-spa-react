using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json.Converters;
using Microsoft.AspNetCore.Mvc.NewtonsoftJson;

namespace Foundation.Settings.Models
{
    public class SettingsApiResult<T> : ActionResult
    {
        public IDictionary<string, string> Headers { get; }
        public int? StatusCode { get; }
        public T Value { get; }

        public SettingsApiResult(T value, int? statusCode, IDictionary<string, string> headers) : base()
        {
            Headers = headers;
            StatusCode = statusCode;
            Value = value;
        }

        public virtual JsonSerializerSettings SerializerSettings {
            get {
                var namingStrategy = new CamelCaseNamingStrategy {
                    ProcessDictionaryKeys = true,
                    ProcessExtensionDataNames = true,
                    OverrideSpecifiedNames = true
                };
                return new JsonSerializerSettings() {
                    NullValueHandling = NullValueHandling.Ignore,
                    Formatting = Formatting.Indented,
                    MissingMemberHandling = MissingMemberHandling.Ignore,
                    TypeNameHandling = TypeNameHandling.None,
                    DateTimeZoneHandling = DateTimeZoneHandling.Utc,
                    ContractResolver = new DefaultContractResolver
                    {
                        NamingStrategy = namingStrategy
                    },
                    Converters = (IList<JsonConverter>) new List<JsonConverter>()
                    {
                        new StringEnumConverter(namingStrategy),
                        new ProblemDetailsConverter(),
                        new ValidationProblemDetailsConverter()
                    }
                    
                };
            }
        }

        public override async Task ExecuteResultAsync(ActionContext context)
        {
            this.SetHeaders(context.HttpContext.Response);
            context.HttpContext.Response.StatusCode = this.StatusCode ?? 200;
            context.HttpContext.Response.ContentType = "application/json";

            await using (var writer = new StreamWriter(context.HttpContext.Response.Body)) {
                var json = JsonConvert.SerializeObject(Value, SerializerSettings);
                await writer.WriteAsync(json);
                await writer.FlushAsync();
            }
        }

        public override void ExecuteResult(ActionContext context)
        {
            this.SetHeaders(context.HttpContext.Response);
            context.HttpContext.Response.StatusCode = this.StatusCode ?? 200;
            context.HttpContext.Response.ContentType = "application/json";
            using (var writer = new StreamWriter(context.HttpContext.Response.Body)) {
                writer.Write(JsonConvert.SerializeObject(Value, SerializerSettings));
            }
        }

        protected virtual void SetHeaders(HttpResponse response)
        {
            if (this.Headers == null)
            return;
            foreach ((string key, string str) in (IEnumerable<KeyValuePair<string, string>>) this.Headers)
            response.Headers.Add(key, (StringValues) str);
        }
    }
}