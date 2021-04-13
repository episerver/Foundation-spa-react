using EPiServer.ContentApi.Core.Configuration;
using EPiServer.ContentApi.Core.ContentResult;
using EPiServer.ContentApi.Core.Serialization;
using EPiServer.ContentApi.Core.Serialization.Models;
using EPiServer.ServiceLocation;
using EPiServer.Web;
using System;
using System.Collections.Generic;
using System.Globalization;

namespace Foundation.SpaViewEngine.JsInterop.Models
{
    [ServiceConfiguration(typeof(ServerSideRenderingContext), Lifecycle = ServiceInstanceScope.Transient)]
    public class ServerSideRenderingContext : JavaScriptObject
    {
        private ISiteDefinitionConverter SiteDefinitionConverter { get; }

        private ContentApiOptions ContentApiOptions { get; }

        private ContentApiSerializerResolver ContentApiSerializerResolver { get; }

        /// <summary>
        /// Reference to the JavaScript compatible location object, which 
        /// holds the location information for the current request.
        /// </summary>
        public virtual Location Location { get; } = new Location();

        /// <summary>
        /// The current path of this request
        /// </summary>
        public virtual string Path => Location.Pathname;

        /// <summary>
        /// The JSON Serialized representation of the current IContent being
        /// rendered.
        /// </summary>
        public virtual ContentApiModel IContent { get; set; }

        /// <summary>
        /// The JSON Serialized ContentLink for the current content
        /// </summary>
        public virtual ContentModelReference ContentLink { get; set; }

        /// <summary>
        /// The JSON Serialized Website definition of the current website
        /// </summary>
        public virtual SiteDefinitionModel Website => SiteDefinitionConverter.Convert(SiteDefinition.Current, CreateContext(ContentApiOptions));

        public virtual IList<ContentApiModel> Contents { get; } = new List<ContentApiModel>();

        public virtual string ContextInfo { get; set; } = "";

        public virtual string Action { get; set; } = "";

        public virtual object ActionResponse { get; set; } = null;

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
            var data = new
            {
                Location,
                Path,
                IContent,
                ContentLink,
                Website,
                ContextInfo,
                CustomProperties,
                Contents,
                Action,
                ActionResponse
            };

            var json = ContentApiSerialize(data);
            return json;
        }

        private string ContentApiSerialize (object value) 
        {
            var contentApiSerializer = ContentApiSerializerResolver.Resolve(ContentApiOptions);
            return contentApiSerializer.Serialize(value);
        }
    }
}
