using System;
using Newtonsoft.Json;

namespace Foundation.ContentDelivery.Models.TypeConverters
{
    public abstract class ContentApiTypeConverter<T> : JsonConverter
    {
        public override bool CanRead { get { return false; } }

        public override bool CanWrite { get { return true; } }

        public bool ExcludePersonalizedContent { get; set; } = false;

        public string Expand { get; set; } = "*";

        public override bool CanConvert(Type objectType)
        {
            return typeof(T).IsAssignableFrom(objectType);
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            throw new NotSupportedException();
        }
    }
}
