using EPiServer.Cms.UI.AspNetIdentity;
using EPiServer.ContentApi.OAuth;
using Foundation;
using Foundation.Cms.Extensions;
using Foundation.Cms.Identity;
using Foundation.ContentDelivery;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Owin;
using System;

[assembly: OwinStartup(typeof(Startup))]
namespace Foundation
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseContentApiCors();
            app.ConfigureAuthentication("EpiServerDB");
            app.UseContentApiIdentityOAuthAuthorization<ApplicationUserManager<SiteUser>, SiteUser>(new ContentApiOAuthOptions()
            {
                RequireSsl = false,
                AccessTokenExpireTimeSpan = TimeSpan.FromMinutes(60)
            });
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = "ApplicationCookie",
                LoginPath = new PathString("/user")
            });
        }
    }
}