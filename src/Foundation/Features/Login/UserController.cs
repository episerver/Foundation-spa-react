using EPiServer;
using EPiServer.Core;
using EPiServer.Web.Mvc.Html;
using Foundation.Attributes;
using Foundation.Cms.Pages;
using System.Web.Mvc;

namespace Foundation.Features.Login
{
    [OnlyAnonymous]
    public class UserController : Controller
    {
        private readonly IContentLoader _contentLoader;

        public UserController(IContentLoader contentLoader)
        {
            _contentLoader = contentLoader;
        }

        public ActionResult Index(string returnUrl)
        {
            var model = new UserViewModel();
            _contentLoader.TryGet(ContentReference.StartPage, out CmsHomePage homePage);

            model.Logo = Url.ContentUrl(homePage?.SiteLogo);
            model.ResetPasswordUrl = Url.ContentUrl(homePage?.ResetPasswordPage);
            model.Title = "Login";
            model.LoginViewModel.ReturnUrl = returnUrl;
            return View(model);
        }

        public ActionResult Register()
        {
            var model = new UserViewModel();
            var homePage = _contentLoader.Get<PageData>(ContentReference.StartPage) as CmsHomePage;
            model.Logo = Url.ContentUrl(homePage?.SiteLogo);
            model.Title = "Register";
            return View(model);
        }
    }
}