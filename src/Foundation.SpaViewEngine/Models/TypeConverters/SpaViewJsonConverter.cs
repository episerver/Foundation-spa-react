using Newtonsoft.Json;
using System;

namespace Foundation.SpaViewEngine.Models.TypeConverters
{
    public abstract class SpaViewJsonConverter : JsonConverter
    {
        public override bool CanRead { get { return false; } }

        public override bool CanWrite { get { return true; } }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            throw new NotSupportedException();
        }
    }
}
