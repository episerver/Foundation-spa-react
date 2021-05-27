using EPiServer.Core;
using EPiServer.DataAnnotations;

namespace Foundation.SpaViewEngine.SpaContainer
{
    [ContentType(GUID = "3ce3288f-ebf0-4130-addb-37683742230e", AvailableInEditMode = false)]
    [AvailableContentTypes(
        Availability = EPiServer.DataAbstraction.Availability.Specific,
        Include = new[] { typeof(SpaMedia) })]
    public class SpaFolder : ContentFolder
    {

    }
}