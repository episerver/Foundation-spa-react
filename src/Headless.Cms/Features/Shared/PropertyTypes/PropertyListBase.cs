using EPiServer.Core;
using EPiServer.Framework.Serialization;
using EPiServer.ServiceLocation;
using Newtonsoft.Json;

namespace HeadlessCms.Features.Shared.PropertyTypes
{
    public class PropertyListBase<T> : PropertyList<T>
    {
        private Injected<IObjectSerializerFactory> _objectSerializerFactory;

        private IObjectSerializer _objectSerializer;

        public PropertyListBase()
        {
            _objectSerializer = this._objectSerializerFactory.Service.GetSerializer("application/json");
        }

        protected override T ParseItem(string value)
        {
            return JsonConvert.DeserializeObject<T>(value);
        }
    }
}
