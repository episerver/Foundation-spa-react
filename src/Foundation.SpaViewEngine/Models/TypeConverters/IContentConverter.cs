
using EPiServer.ContentApi.Core.Serialization;
using EPiServer.Core;
using EPiServer.ServiceLocation;
using Newtonsoft.Json;

namespace Foundation.SpaViewEngine.Models.TypeConverters
{
    [ServiceConfiguration(typeof(IContentConverter), Lifecycle = ServiceInstanceScope.Singleton)]
    [ServiceConfiguration(typeof(SpaViewJsonConverter), Lifecycle = ServiceInstanceScope.Singleton)]
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
