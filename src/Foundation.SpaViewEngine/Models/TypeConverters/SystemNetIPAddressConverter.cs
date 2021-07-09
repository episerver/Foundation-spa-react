using EPiServer.ServiceLocation;
using Newtonsoft.Json;
using System;
using System.Net;

namespace Foundation.SpaViewEngine.Models.TypeConverters
{
    [ServiceConfiguration(typeof(SystemNetIPAddressConverter), Lifecycle = ServiceInstanceScope.Singleton)]
    [ServiceConfiguration(typeof(SpaViewJsonConverter), Lifecycle = ServiceInstanceScope.Singleton)]
    public class SystemNetIPAddressConverter : ContentApiTypeConverter<IPAddress>
    {
        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            if (!(value is IPAddress val))
                throw new ArgumentException("The value must be an instance of System.Net.IPAddress", "value");
            serializer.Serialize(writer, val.ToString());
        }
    }
}
