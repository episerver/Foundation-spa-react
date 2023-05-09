using EPiServer.ServiceLocation;

namespace Foundation.ContentApi.Extensions.Conversion
{
    [Options(ConfigurationSection = "StructuredHtml")]
    public class StructuredHtmlPropertyOptions
    {
        /// <summary>
        /// When enabled the ContentDeliveryAPI is able to output structured data instead of raw HTML when
        /// an XHTML property is returned.
        /// </summary>
        public bool Enabled { get; set; } = true;

        /// <summary>
        /// Set the default behavior, structured by default or unstructured by default. Use the rawHTML 
        /// property to change the output.
        /// </summary>
        public bool StructureByDefault { get; set; } = true;
    }
}
