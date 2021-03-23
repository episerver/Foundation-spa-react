using EPiServer.Personalization;
using Foundation.Cms.Identity;
using Foundation.Features.Shared;
using System.Collections.Generic;

namespace Foundation.Features.MyAccount.ProfilePage
{
    public class ProfilePageViewModel : ContentViewModel<ProfilePage>
    {
        public ProfilePageViewModel()
        {
        }

        public ProfilePageViewModel(ProfilePage profilePage) : base(profilePage)
        {
        }
        public SiteUser SiteUser { get; set; }
        public EPiServerProfile CurrentUser { get; set; }
        public string ResetPasswordPage { get; set; }
    }
}