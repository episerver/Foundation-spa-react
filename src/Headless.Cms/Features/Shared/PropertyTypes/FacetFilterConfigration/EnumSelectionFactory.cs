using EPiServer.Shell.ObjectEditing;
using System;
using System.Collections.Generic;
using System.Linq;

namespace HeadlessCms.Features.Shared.PropertyTypes.FacetFilterConfiguration
{
    public class EnumSelectionFactory<TEnum> : ISelectionFactory where TEnum : struct, IConvertible
    {
        private static Type _descriptionType = typeof(EnumSelectionDescriptionAttribute);

        public IEnumerable<ISelectItem> GetSelections(ExtendedMetadata metadata)
        {
            var type = typeof(TEnum);

            var values = Enum.GetValues(type);

            foreach (var value in values)
            {
                var description = GetDescription(type, value);

                yield return new SelectItem
                {
                    Text = description?.Text ?? EnumHelpers.GetValueName<TEnum>(value),
                    Value = description?.Value ?? value
                };
            }
        }

        private static EnumSelectionDescriptionAttribute GetDescription(Type type, object value)
        {
            var enumName = type.GetEnumName(value);
            if (enumName is null)
                return null;

            var member = type.GetMember(enumName).FirstOrDefault();
            if (member is null)
                return null;

            return member
                .GetCustomAttributes(_descriptionType, false)
                .FirstOrDefault() as EnumSelectionDescriptionAttribute;
        }
    }
}
