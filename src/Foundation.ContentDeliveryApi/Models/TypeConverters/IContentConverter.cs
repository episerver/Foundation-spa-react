
using EPiServer.ContentApi.Core.Serialization;
using EPiServer.Core;
using Newtonsoft.Json;

namespace Foundation.ContentDeliveryApi.Models.TypeConverters
{
    public class IContentConverter : ContentApiTypeConverter<IContent>
    {
        protected IContentModelMapper ContentModelMapper { get; }

        public IContentConverter(
            IContentModelMapper contentModelMapper
        )
        {
            ContentModelMapper = contentModelMapper;
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            var transformedContent = ContentModelMapper.TransformContent((IContent)value, ExcludePersonalizedContent, Expand);
            serializer.Serialize(writer, transformedContent);
        }
    }
}
