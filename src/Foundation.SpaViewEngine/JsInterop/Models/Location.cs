using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Web;

namespace Foundation.SpaViewEngine.JsInterop.Models
{
    /// <summary>
    /// Simple wrapper class to create a JavaScript Location object from a 
    /// .Net System.Uri;
    /// </summary>
    public class Location : JavaScriptObject
    {
        protected readonly Uri CurrentUri;

        public Location() : this(HttpContext.Current.Request.Url) { }

        public Location(Uri uri)
        {
            CurrentUri = uri;
        }

        [JsonProperty(PropertyName = "href")]
        public string Href => CurrentUri.AbsoluteUri;

        [JsonProperty(PropertyName = "hostname")]
        public string Hostname => CurrentUri.Host;

        [JsonProperty(PropertyName = "host")]
        public string Host => CurrentUri.Authority;

        [JsonProperty(PropertyName = "origin")]
        public string Origin => CurrentUri.Scheme + "//" + CurrentUri.Authority;

        [JsonProperty(PropertyName = "pathname")]
        public string Pathname => CurrentUri.AbsolutePath;

        [JsonProperty(PropertyName = "protocol")]
        public string Protocol => CurrentUri.Scheme;

        [JsonProperty(PropertyName = "search")]
        public string Search => CurrentUri.Query;

        public override string ToString() => Href;

#pragma warning disable IDE1006 // Naming conventions between JavaScript and .Net are different
        public virtual void replace()
        {
            throw new NotImplementedException();
        }
        public virtual void reload()
        {
            throw new NotImplementedException();
        }

#pragma warning restore IDE1006 // Naming conventions between JavaScript and .Net are different
    }
}
