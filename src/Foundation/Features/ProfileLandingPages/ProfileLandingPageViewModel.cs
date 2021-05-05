using Foundation.Features.ProfileLandingPages.ProfileLandingPage;
using Foundation.Features.Shared;

namespace Foundation.Features.LandingPages.ProfileLandingPages
{
    public class ProfileLandingPageViewModel : ContentViewModel<ProfileLandingPage>
    {
        public string CategoryName { get; set; }

        public ProfileLandingPageViewModel(ProfileLandingPage currentPage) : base(currentPage)
        {
        }

        public static ProfileLandingPageViewModel Create(ProfileLandingPage currentPage)
        {
            var model = new ProfileLandingPageViewModel(currentPage);

            return model;
        }
    }
}
