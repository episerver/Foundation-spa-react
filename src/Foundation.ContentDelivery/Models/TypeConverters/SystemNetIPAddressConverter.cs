using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Foundation.ContentDelivery.Models.TypeConverters
{
    public class SystemNetIPAddressConverter : ContentApiTypeConverter<IPAddress>
    {
        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            var val = value as IPAddress;
            if (val == null)
                throw new ArgumentException("The value must be an instance of System.Net.IPAddress", "value");
            serializer.Serialize(writer, val.ToString());
        }
    }
}
