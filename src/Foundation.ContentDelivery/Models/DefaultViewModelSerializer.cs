using EPiServer.ContentApi.Core.ContentResult;
using EPiServer.ServiceLocation;
using Foundation.ContentDelivery.Models.TypeConverters;
using Newtonsoft.Json;

namespace Foundation.ContentDelivery.Models
{
    public class DefaultViewModelSerializer : IViewModelSerializer
    {
        protected JsonSerializerSettings JsonSerializerSettings { get; }

        public DefaultViewModelSerializer(
            IContentConverter iContentConverter,
            ContentReferenceConverter contentReferenceConverter,
            IJsonSerializerConfiguration jsonSerializerConfiguration
        )
        {
            JsonSerializerSettings = new JsonSerializerSettings()
            {
                ContractResolver = jsonSerializerConfiguration.Settings.ContractResolver,
                Formatting = jsonSerializerConfiguration.Settings.Formatting,
                MaxDepth = jsonSerializerConfiguration.Settings.MaxDepth,
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            };
            foreach (var converter in jsonSerializerConfiguration.Settings.Converters)
            {
                JsonSerializerSettings.Converters.Add(converter);
            }
            JsonSerializerSettings.Converters.Add(iContentConverter);
            JsonSerializerSettings.Converters.Add(contentReferenceConverter);
        }

        public virtual string ConvertToJson(object viewModel)
        {
            return JsonConvert.SerializeObject(viewModel, JsonSerializerSettings);
        }
    }
}
