using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using Foundation.Features.Shared;
using Foundation.Infrastructure;
using System.ComponentModel.DataAnnotations;

namespace Foundation.Features.ProfileLandingPages.ProfileLandingPage
{
    [ContentType(DisplayName = "Profile Page Landing Page",
       GUID = "71F9E8E1-46DA-4D40-883F-A1BEFACAEB88",
       Description = "Default standard page that has top content area, main body, and main content area",
       GroupName = GroupNames.Content)]
    [ImageUrl("~/assets/icons/gfx/page-type-thumbnail-landingpage-onecol.png")]
    public class ProfileLandingPage : FoundationPageData
    {
        [Display(Name = "Top content area", GroupName = SystemTabNames.Content, Order = 90)]
        public virtual ContentArea TopContentArea { get; set; }
    }
}