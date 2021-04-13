using System;

namespace Foundation.SpaViewEngine.Models.TypeConverters
{
    /// <summary>
    /// Base class for JsonConverters relying on generic to define supported types
    /// </summary>
    /// <typeparam name="T">The type that can be converted by an instance of this class.</typeparam>
    public abstract class ContentApiTypeConverter<T> : SpaViewJsonConverter
    {
        public bool ExcludePersonalizedContent { get; set; } = false;

        public string Expand { get; set; } = "*";

        public override bool CanConvert(Type objectType)
        {
            return typeof(T).IsAssignableFrom(objectType);
        }
    }
}
