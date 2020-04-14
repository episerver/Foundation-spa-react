using EPiServer.Core;
using EPiServer.ContentApi.Core.Serialization;
using EPiServer.ServiceLocation;
using Newtonsoft.Json;

namespace Foundation.ContentDeliveryApi.Models.TypeConverters
{
    [ServiceConfiguration(typeof(ContentReferenceConverter), Lifecycle = ServiceInstanceScope.Singleton)]
    public class ContentReferenceConverter : ContentApiTypeConverter<ContentReference>
    {
        protected IContentModelReferenceConverter ContentModelReferenceConverter { get; }

        public ContentReferenceConverter(
            IContentModelReferenceConverter contentModelReferenceConverter
        )
        {
            ContentModelReferenceConverter = contentModelReferenceConverter;
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            var contentReference = value as ContentReference;
            var model = ContentModelReferenceConverter.GetContentModelReference(contentReference);
            serializer.Serialize(writer, model);
        }
    }
}
