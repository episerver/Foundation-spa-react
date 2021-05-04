using EPiServer.ContentApi.Core.Configuration;
using EPiServer.ContentApi.Core.ContentResult;
using EPiServer.ContentApi.Core.Serialization;
using EPiServer.ContentApi.Core.Serialization.Models;
using EPiServer.ServiceLocation;
using EPiServer.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Globalization;

namespace Foundation.SpaViewEngine.JsInterop.Models
{
    [ServiceConfiguration(typeof(ServerSideRenderingContext), Lifecycle = ServiceInstanceScope.Transient)]
    [JsonObject(MemberSerialization.OptIn)]
    public class ServerSideRenderingContext : JavaScriptObject
    {
        private ISiteDefinitionConverter SiteDefinitionConverter { get; }

        private ContentApiOptions ContentApiOptions { get; }

        private ContentApiSerializerResolver ContentApiSerializerResolver { get; }

        [JsonProperty]
        [JsonExtensionData]
        public override Dictionary<string, object> CustomProperties { get; set; } = new Dictionary<string, object>();

        /// <summary>
        /// Reference to the JavaScript compatible location object, which 
        /// holds the location information for the current request.
        /// </summary>
        [JsonProperty]
        public virtual Location Location { get; } = new Location();

        /// <summary>
        /// The current path of this request
        /// </summary>
        [JsonProperty]
        public virtual string Path => Location.Pathname;

        /// <summary>
        /// The JSON Serialized representation of the current IContent being
        /// rendered.
        /// </summary>
        [JsonProperty]
        public virtual ContentApiModel IContent { get; set; }

        /// <summary>
        /// The JSON Serialized ContentLink for the current content
        /// </summary>
        [JsonProperty]
        public virtual ContentModelReference ContentLink { get; set; }

        /// <summary>
        /// The JSON Serialized Website definition of the current website
        /// </summary>
        [JsonProperty]
        public virtual SiteDefinitionModel Website => SiteDefinitionConverter.Convert(SiteDefinition.Current, CreateContext(ContentApiOptions));

        [JsonProperty]
        public virtual IList<ContentApiModel> Contents { get; } = new List<ContentApiModel>();

        [JsonProperty]
        public virtual string ContextInfo { get; set; } = "";

        [JsonProperty]
        public virtual string Action { get; set; } = "";

        public virtual object ActionResponse { get; set; } = null;

        [JsonConverter(typeof(StringEnumConverter))]
        public virtual ContextStatus Status { get; set; } = ContextStatus.Available;
        
        public ServerSideRenderingContext(
            ContentApiOptions contentApiOptions,
            ContentApiSerializerResolver contentSerializerResolver,
            ISiteDefinitionConverter siteDefinitionConverter
        ) {
            ContentApiOptions = contentApiOptions;
            ContentApiSerializerResolver = contentSerializerResolver;
            SiteDefinitionConverter = siteDefinitionConverter;
        }

        private ConverterContext CreateContext(ContentApiOptions contentApiOptions) => new ConverterContext(contentApiOptions, null, null, true, CultureInfo.InvariantCulture, ContextMode.Default);

        /// <summary>
        /// Create JSON representation of this object
        /// </summary>
        /// <returns>The JSON Serialized representation of this object</returns>
        [Obsolete("ToJson is deprecated, please use AsJson instead.")]
        public virtual string ToJson() => AsJson();

        /// <summary>
        /// Create JSON representation of this object
        /// </summary>
        /// <returns>The JSON Serialized representation of this object</returns>
        public virtual string AsJson()
        {
            var json = ContentApiSerialize(this);
            return json;
        }

        private string ContentApiSerialize (object value) 
        {
            var contentApiSerializer = ContentApiSerializerResolver.Resolve(ContentApiOptions);
            return contentApiSerializer.Serialize(value);
        }
    }

    public enum ContextStatus
    {
        Loading,
        Available
    }
}
