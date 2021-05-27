using EPiServer;
using EPiServer.Core;
using Foundation.Attributes;
using Foundation.Features.Home;
using Foundation.Helpers;
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
            return View(Url.GetUserViewModel(returnUrl));
        }

        public ActionResult Register()
        {
            var model = new UserViewModel();
            var homePage = _contentLoader.Get<PageData>(ContentReference.StartPage) as HomePage;
            // model.Logo = Url.ContentUrl(homePage?.SiteLogo);
            model.Title = "Register";
            return View(model);
        }
    }
}