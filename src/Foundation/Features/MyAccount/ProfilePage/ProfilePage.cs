using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using Foundation.Features.Shared;
using System.ComponentModel.DataAnnotations;

namespace Foundation.Features.MyAccount.ProfilePage
{
    [ContentType(DisplayName = "Profile Page",
        GUID = "c03371fb-fc21-4a6e-8f79-68c400519145",
        Description = "Page to show and manage profile information",
        GroupName = SystemTabNames.Content,
        AvailableInEditMode = false)]
    [ImageUrl("~/assets/icons/cms/pages/elected.png")]
    public class ProfilePage : FoundationPageData
    {
    }
}