using EPiServer.Core;
using EPiServer.DataAnnotations;
using Foundation.Cms.Settings;
using Foundation.Features.MyAccount.ResetPassword;
using Foundation.Features.Search.Search;
using Foundation.Infrastructure;
using System.ComponentModel.DataAnnotations;

namespace Foundation.Features.Settings
{
    [SettingsContentType(DisplayName = "Site Structure Settings Page",
        GUID = "bf69f959-c91b-46cb-9829-2ecf9d11e13b",
        Description = "Site structure settings",
        SettingsName = "Page references")]
    public class ReferencePageSettings : SettingsBase
    {
        #region References

        [AllowedTypes(typeof(ResetPasswordPage))]
        [Display(Name = "Reset password page", GroupName = TabNames.SiteStructure, Order = 40)]
        public virtual ContentReference ResetPasswordPage { get; set; }

        [AllowedTypes(typeof(MailBasePage))]
        [Display(Name = "Reset password", GroupName = TabNames.MailTemplates, Order = 30)]
        public virtual ContentReference ResetPasswordMail { get; set; }

        [AllowedTypes(typeof(SearchResultPage))]
        [Display(Name = "Search page", GroupName = TabNames.SiteStructure, Order = 10)]
        public virtual ContentReference SearchPage { get; set; }

        #endregion
    }
}