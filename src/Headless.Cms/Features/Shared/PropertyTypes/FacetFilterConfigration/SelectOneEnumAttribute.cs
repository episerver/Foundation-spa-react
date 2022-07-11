using EPiServer.Shell.ObjectEditing;
using Microsoft.AspNetCore.Mvc.ModelBinding.Metadata;
using System;

namespace HeadlessCms.Features.Shared.PropertyTypes.FacetFilterConfiguration
{
    public class SelectOneEnumAttribute : SelectOneAttribute
    {
        public SelectOneEnumAttribute(Type enumType)
        {
            EnumType = enumType;
        }

        public Type EnumType { get; set; }

        public new void CreateDisplayMetadata(DisplayMetadataProviderContext context)
        {
            SelectionFactoryType = typeof(EnumSelectionFactory<>).MakeGenericType(EnumType);
            base.CreateDisplayMetadata(context);
        }
    }
}
