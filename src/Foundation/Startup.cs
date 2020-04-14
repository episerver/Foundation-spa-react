using EPiServer.Cms.UI.AspNetIdentity;
using EPiServer.ContentApi.OAuth;
using Foundation;
using Foundation.Cms.Extensions;
using Foundation.Cms.Identity;
using Microsoft.Owin;
using Owin;
using System;

[assembly: OwinStartup(typeof(Startup))]
namespace Foundation
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.ConfigureAuthentication("EPiServerDB");
            app.UseContentApiIdentityOAuthAuthorization<ApplicationUserManager<SiteUser>, SiteUser>(new ContentApiOAuthOptions()
            {
                RequireSsl = false,
                AccessTokenExpireTimeSpan = TimeSpan.FromMinutes(60)
            });
            
        }
    }
}