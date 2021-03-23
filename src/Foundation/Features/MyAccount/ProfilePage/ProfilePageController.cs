using EPiServer.Cms.UI.AspNetIdentity;
using EPiServer.Core;
using EPiServer.Personalization;
using EPiServer.Security;
using EPiServer.Web.Routing;
using Foundation.Cms.Identity;
using Foundation.Cms.Settings;

using Foundation.Features.Settings;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace Foundation.Features.MyAccount.ProfilePage
{
    [Authorize]
    public class ProfilePageController : IdentityControllerBase<ProfilePage>
    {
        private readonly ISettingsService _settingsService;

        public ProfilePageController(
            ApplicationSignInManager<SiteUser> signinManager,
            ApplicationUserManager<SiteUser> userManager,
            ISettingsService settingsService) : base(signinManager, userManager)
        {
            _settingsService = settingsService;
        }

        public ActionResult Index(ProfilePage currentPage)
        {
            var currentUser = EPiServerProfile.Current;
            var viewModel = new ProfilePageViewModel(currentPage)
            {
                CurrentUser = currentUser,
                ResetPasswordPage = UrlResolver.Current.GetUrl(_settingsService.GetSiteSettings<ReferencePageSettings>()?.ResetPasswordPage ?? ContentReference.StartPage)
            };

            return View(viewModel);
        }
    }
}