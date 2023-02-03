using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using EPiServer.PlugIn;
using EPiServer.SpecializedProperties;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace HeadlessCms.Features.Shared.PropertyTypes
{
    public class GroupLinkCollection
    {
        [Display(Name = "Main category text", GroupName = SystemTabNames.Content, Order = 10)]
        public virtual string MainCategoryText { get; set; }

        [Display(Name = "Category links", GroupName = SystemTabNames.Content, Order = 20)]
        public virtual LinkItemCollection ListCategories { get; set; }
    }

    /// <summary>
    /// The GroupLinkCollectionProperty is used by the MenuItemBlock definition
    /// </summary>
    [PropertyDefinitionTypePlugIn]
    public class GroupLinkCollectionProperty : PropertyList<GroupLinkCollection>
    {
        protected override GroupLinkCollection ParseItem(string value)
        {
            return JsonConvert.DeserializeObject<GroupLinkCollection>(value);
        }
    }
}