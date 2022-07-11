using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using EPiServer.PlugIn;
using EPiServer.Shell.ObjectEditing;
using EPiServer.SpecializedProperties;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace HeadlessCms.Features.Shared.PropertyTypes {
    public class ColorModel
    {
        [Display(Name = "Color name")]
        public string ColorName { get; set; }

        [Display(Name = "Color code")]
        [ClientEditor(ClientEditingClass = "foundation/editors/ColorPicker")]
        public string ColorCode { get; set; }
    }

    [PropertyDefinitionTypePlugIn]
    public class ColorPropertyList : PropertyList<ColorModel>
    {
    }
}