using EPiServer;
using EPiServer.Core;
using EPiServer.ServiceLocation;
using EPiServer.Web.Mvc.Html;
using Foundation.Features.Home;
using Foundation.Features.Login;
using System;
using System.Web.Mvc;

namespace Foundation.Helpers
{
    public static class Extensions
    {
        private static readonly Lazy<IContentLoader> ContentLoader =
            new Lazy<IContentLoader>(() => ServiceLocator.Current.GetInstance<IContentLoader>());

        public static UserViewModel GetUserViewModel(this UrlHelper urlHelper, string returnUrl, string title = "Login")
        {
            var model = new UserViewModel();
            ContentLoader.Value.TryGet(ContentReference.StartPage, out HomePage homePage);
            model.Logo = urlHelper.ContentUrl(homePage?.SiteLogo);
            model.ResetPasswordUrl = urlHelper.ContentUrl(homePage?.ResetPasswordPage);
            model.Title = title;
            model.LoginViewModel.ReturnUrl = returnUrl;
            return model;
        }
    }
}