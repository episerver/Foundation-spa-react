using EPiServer.Shell.ObjectEditing;
using System.Collections.Generic;

namespace Foundation.Features.Shared.SelectionFactories
{
    public class HeaderMenuSelectionFactory : ISelectionFactory
    {
        public IEnumerable<ISelectItem> GetSelections(ExtendedMetadata metadata)
        {
            return new ISelectItem[]
            {
                new SelectItem {Text = "Center logo", Value = "CenterLogo"},
                new SelectItem {Text = "Left logo", Value = "LeftLogo"}
            };
        }
    }
}