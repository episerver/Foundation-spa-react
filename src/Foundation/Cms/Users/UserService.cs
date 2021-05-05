using Castle.Core.Internal;
using EPiServer.Cms.UI.AspNetIdentity;
using EPiServer.Framework.Localization;
using EPiServer.ServiceLocation;
using Foundation.Cms.Identity;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using System;
using System.Threading.Tasks;

namespace Foundation.Cms.Users
{
    public class UserService : IUserService
    {
        private readonly LocalizationService _localizationService;

        public UserService(ServiceAccessor<IAuthenticationManager> authenticationManager,
            ServiceAccessor<ApplicationSignInManager<SiteUser>> signinManager,
            ServiceAccessor<ApplicationUserManager<SiteUser>> userManager,
            LocalizationService localizationService)
        {
            AuthenticationManager = authenticationManager;
            SignInManager = signinManager;
            _localizationService = localizationService;
            UserManager = userManager;
        }

        public virtual ServiceAccessor<ApplicationUserManager<SiteUser>> UserManager { get; }
        public virtual ServiceAccessor<ApplicationSignInManager<SiteUser>> SignInManager { get; }
        public virtual ServiceAccessor<IAuthenticationManager> AuthenticationManager { get; }

        public Guid CurrentContactId => throw new NotImplementedException();

        public virtual SiteUser GetSiteUser(string email)
        {
            if (email == null)
            {
                throw new ArgumentNullException(nameof(email));
            }

            return UserManager().FindByEmail(email);
        }

        public virtual async Task<SiteUser> GetSiteUserAsync(string email)
        {
            if (email == null)
            {
                throw new ArgumentNullException(nameof(email));
            }

            return await UserManager().FindByNameAsync(email);
        }

        public virtual async Task<ExternalLoginInfo> GetExternalLoginInfoAsync() => await AuthenticationManager().GetExternalLoginInfoAsync();

        public virtual async Task<IdentityResult> CreateUserAsync(SiteUser user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            if (user.Password.IsNullOrEmpty())
            {
                throw new MissingFieldException("Password");
            }

            if (user.Email.IsNullOrEmpty())
            {
                throw new MissingFieldException("Email");
            }

            var result = new IdentityResult();
            if (UserManager().FindByEmail(user.Email) != null)
            {
                result = new IdentityResult(_localizationService.GetString("/Registration/Form/Error/UsedEmail", "This email address is already used"));
            }
            else
            {
                result = await UserManager().CreateAsync(user, user.Password);

                if (result.Succeeded)
                {
                    var identity = await UserManager().GenerateUserIdentityAsync(user, DefaultAuthenticationTypes.ApplicationCookie);
                    AuthenticationManager().SignIn(identity);
                }
            }

            return result;
        }

        public virtual void SignOut()
        {
            AuthenticationManager().SignOut();
            TrackingCookieManager.SetTrackingCookie(Guid.NewGuid().ToString());
        }
    }
}