using EPiServer.DataAnnotations;
using System.ComponentModel.DataAnnotations;

using Foundation.Settings.Models;
using Foundation.Settings.Infrastructure;

namespace HeadlessCms.Features.Settings
{
    [SettingsContentType(DisplayName = "Label Settings",
        GUID = "c17375a6-4a01-402b-8c7f-18257e944527",
        SettingsName = "Site Labels")]
    public class LabelSettings : SettingsBase
    {
        [CultureSpecific]
        [Display(Name = "My account", GroupName = "SiteLabels", Order = 10)]
        public virtual string MyAccountLabel { get; set; }

        [CultureSpecific]
        [Display(Name = "Search", GroupName = "SiteLabels", Order = 30)]
        public virtual string SearchLabel { get; set; }
    }
}