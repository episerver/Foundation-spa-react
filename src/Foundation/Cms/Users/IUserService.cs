using EPiServer.Cms.UI.AspNetIdentity;
using EPiServer.ServiceLocation;
using Foundation.Cms.Identity;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using System;
using System.Threading.Tasks;

namespace Foundation.Cms.Users
{
    public interface IUserService
    {
        ServiceAccessor<ApplicationUserManager<SiteUser>> UserManager { get; }
        ServiceAccessor<IAuthenticationManager> AuthenticationManager { get; }
        ServiceAccessor<ApplicationSignInManager<SiteUser>> SignInManager { get; }
        Guid CurrentContactId { get; }
        SiteUser GetSiteUser(string email);
        Task<ExternalLoginInfo> GetExternalLoginInfoAsync();
        Task<IdentityResult> CreateUserAsync(SiteUser user);
        void SignOut();
    }
}
