using EPiServer.Cms.Shell.UI.ObjectEditing.EditorDescriptors;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using EPiServer.Framework.DataAnnotations;
using EPiServer.PlugIn;
using EPiServer.Shell.ObjectEditing;
using EPiServer.SpecializedProperties;
using EPiServer.Web;
using Foundation.Cms.Blocks;
using Foundation.Cms.EditorDescriptors;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Foundation.Cms.Pages
{
    [ContentType(DisplayName = "Cms Home Page",
        GUID = "452d1812-7385-42c3-8073-c1b7481e7b20",
        Description = "Used for home page of all sites",
        AvailableInEditMode = true,
        GroupName = CmsGroupNames.Content)]
    [ImageUrl("~/assets/icons/cms/pages/home.png")]
    public class CmsHomePage : FoundationPageData
    {
        #region Content

        [CultureSpecific]
        [Display(Name = "Top content area", GroupName = SystemTabNames.Content, Order = 190)]
        public virtual ContentArea TopContentArea { get; set; }

        [CultureSpecific]
        [Display(Name = "Bottom content area", GroupName = SystemTabNames.Content, Order = 210)]
        public virtual ContentArea BottomContentArea { get; set; }

        [CultureSpecific]
        [Display(Name = "Banner text", GroupName = CmsTabNames.Header, Order = 20)]
        public virtual XhtmlString BannerText { get; set; }
        #endregion

        #region Menu   

        [AllowedTypes(new[] { typeof(MenuItemBlock), typeof(PageData) })]
        [UIHint("HideContentAreaActionsContainer", PresentationLayer.Edit)]
        [Display(Name = "Main menu", GroupName = CmsTabNames.Menu, Order = 10)]
        public virtual ContentArea MainMenu { get; set; }

        [CultureSpecific]
        [Display(Name = "My account menu (CMS)",
            Description = "This menu will show if show commerce components in header is false",
            GroupName = CmsTabNames.Menu,
            Order = 40)]
        public virtual LinkItemCollection MyAccountCmsMenu { get; set; }

        #endregion

        #region Header

        [CultureSpecific]
        [UIHint(UIHint.Image)]
        [Display(Name = "Site logo", GroupName = CmsTabNames.Header, Order = 10)]
        public virtual ContentReference SiteLogo { get; set; }

        [Display(Name = "Logo height (pixels)", GroupName = CmsTabNames.Header, Order = 35)]
        public virtual int LogoHeight { get; set; }

        [SelectOne(SelectionFactoryType = typeof(HeaderMenuSelectionFactory))]
        [Display(Name = "Menu style", GroupName = CmsTabNames.Header, Order = 30)]
        public virtual string HeaderMenuStyle { get; set; }

        #endregion

        #region Footer

        [Display(Name = "Introduction", GroupName = CmsTabNames.Footer, Order = 10)]
        public virtual string Introduction { get; set; }

        [Display(Name = "Company header", GroupName = CmsTabNames.Footer, Order = 20)]
        public virtual string CompanyHeader { get; set; }

        [Display(Name = "Company name", GroupName = CmsTabNames.Footer, Order = 25)]
        public virtual string CompanyName { get; set; }

        [Display(Name = "Comapny address", GroupName = CmsTabNames.Footer, Order = 30)]
        public virtual string CompanyAddress { get; set; }

        [Display(Name = "Company phone", GroupName = CmsTabNames.Footer, Order = 40)]
        public virtual string CompanyPhone { get; set; }

        [Display(Name = "Company email", GroupName = CmsTabNames.Footer, Order = 50)]
        public virtual string CompanyEmail { get; set; }

        [Display(Name = "Links header", GroupName = CmsTabNames.Footer, Order = 60)]
        public virtual string LinksHeader { get; set; }

        [UIHint("FooterColumnNavigation")]
        [Display(Name = "Links", GroupName = CmsTabNames.Footer, Order = 70)]
        public virtual LinkItemCollection Links { get; set; }

        [Display(Name = "Social header", GroupName = CmsTabNames.Footer, Order = 80)]
        public virtual string SocialHeader { get; set; }

        [Display(Name = "Social links", GroupName = CmsTabNames.Footer, Order = 85)]
        public virtual LinkItemCollection SocialLinks { get; set; }

        [CultureSpecific]
        [Display(Name = "Content area", GroupName = CmsTabNames.Footer, Order = 90)]
        public virtual ContentArea ContentArea { get; set; }

        [Display(Name = "Copyright", GroupName = CmsTabNames.Footer, Order = 130)]
        public virtual string FooterCopyrightText { get; set; }

        #endregion

        #region References

        [AllowedTypes(typeof(ResetPasswordPage))]
        [Display(Name = "Reset password page", GroupName = CmsTabNames.SiteStructure, Order = 40)]
        public virtual ContentReference ResetPasswordPage { get; set; }

        [AllowedTypes(typeof(MailBasePage))]
        [Display(Name = "Reset password", GroupName = CmsTabNames.MailTemplates, Order = 30)]
        public virtual ContentReference ResetPasswordMail { get; set; }

        [AllowedTypes(typeof(SearchResultPage))]
        [Display(Name = "Search page", GroupName = CmsTabNames.SiteStructure, Order = 10)]
        public virtual ContentReference SearchPage { get; set; }

        #endregion

        [Display(GroupName = CmsTabNames.CustomSettings, Order = 100)]
        [EditorDescriptor(EditorDescriptorType = typeof(CollectionEditorDescriptor<SelectionItem>))]
        public virtual IList<SelectionItem> Sectors { get; set; }

        [Display(GroupName = CmsTabNames.CustomSettings, Order = 200)]
        [EditorDescriptor(EditorDescriptorType = typeof(CollectionEditorDescriptor<SelectionItem>))]
        public virtual IList<SelectionItem> Locations { get; set; }

        public override void SetDefaultValues(ContentType contentType)
        {
            base.SetDefaultValues(contentType);

            LogoHeight = 50;
        }
    }

    [PropertyDefinitionTypePlugIn]
    public class SelectionItemProperty : PropertyList<SelectionItem>
    {
    }
}