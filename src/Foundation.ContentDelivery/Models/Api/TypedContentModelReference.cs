using EPiServer.ContentApi.Core.Serialization.Models;
using System.Collections.Generic;

namespace Foundation.ContentDelivery.Models.Api
{
    /// <summary>
    /// Extension of the ContentModelReference, which adds a ContentType field
    /// to the ContentModelReference.
    /// </summary>
    public class TypedContentModelReference : ContentModelReference
    {
        public List<string> ContentType { get; set; }

        public static TypedContentModelReference CreateFromBase(ContentModelReference contentModelReference)
        {
            var converted = new TypedContentModelReference()
            {
                Expanded = contentModelReference.Expanded,
                GuidValue = contentModelReference.GuidValue,
                Id = contentModelReference.Id,
                Language = contentModelReference.Language,
                ProviderName = contentModelReference.ProviderName,
                Url = contentModelReference.Url,
                WorkId = contentModelReference.WorkId
            };
            return converted;
        }
    }
}
