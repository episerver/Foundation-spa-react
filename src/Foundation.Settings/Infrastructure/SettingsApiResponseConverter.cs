//using System.Text.Json.Serialization;
using System.Text.Json;
using System;
using Foundation.Settings.Models;
using Newtonsoft.Json;

namespace Foundation.Settings.Infrastructure
{
    public class SettingsApiResponseConverter<T> : System.Text.Json.Serialization.JsonConverter<SettingsApiResponse<T>>
    {
        public virtual JsonSerializerSettings SerializerSettings {
            get {
                return new JsonSerializerSettings {
                    NullValueHandling = NullValueHandling.Ignore
                };
            }
        }

        public override SettingsApiResponse<T> Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options) 
        {
            var currentValue = reader.GetString();
            if (currentValue == null)
                return new SettingsApiResponse<T>{};

            return JsonConvert.DeserializeObject<SettingsApiResponse<T>>(currentValue, SerializerSettings) ?? new SettingsApiResponse<T>{};
        }

        public override void Write( Utf8JsonWriter writer, SettingsApiResponse<T> response, JsonSerializerOptions options) 
        {
            //
        }
    }
}