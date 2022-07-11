using System.ComponentModel;

namespace HeadlessCms.Features.Shared.PropertyTypes.FacetFilterConfiguration
{
    public class EnumSelectionDescriptionAttribute : DescriptionAttribute
    {
        public string Text { get; set; }
        public object Value { get; set; }
    }
}