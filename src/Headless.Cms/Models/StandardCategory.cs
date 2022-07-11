using EPiServer.DataAnnotations;
using EPiServer.DataAbstraction;
using EPiServer.SpecializedProperties;
using EPiServer.Web;
using Geta.EpiCategories;
using System.ComponentModel.DataAnnotations;

namespace HeadlessCms.Models
{
    [ContentType(GUID = "A9BBD7FC-27C5-4718-890A-E28ACBE5EE26",
        DisplayName = "Standard Category",
        Description = "Used to categorize content")]
    public class StandardCategory : CategoryData
    {
        #region Implement IFoundationContent

        [CultureSpecific]
        [Display(Name = "Hide site header", GroupName = SystemTabNames.Settings, Order = 100)]
        public virtual bool HideSiteHeader { get; set; }

        [CultureSpecific]
        [Display(Name = "Hide site footer", GroupName = SystemTabNames.Settings, Order = 200)]
        public virtual bool HideSiteFooter { get; set; }

        [Display(Name = "CSS files", GroupName = "Styles", Order = 100)]
        public virtual LinkItemCollection CssFiles { get; set; }

        [Display(Name = "CSS", GroupName = "Styles", Order = 200)]
        [UIHint(UIHint.Textarea)]
        public virtual string Css { get; set; }

        [Display(Name = "Script files", GroupName = "Scripts", Order = 100)]
        public virtual LinkItemCollection ScriptFiles { get; set; }

        [UIHint(UIHint.Textarea)]
        [Display(GroupName = "Scripts", Order = 200)]
        public virtual string Scripts { get; set; }

        #endregion
    }
}