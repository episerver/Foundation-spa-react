using EPiServer;
using EPiServer.Framework.Localization;
using EPiServer.SpecializedProperties;
using EPiServer.Web.Routing;
using Foundation.Cms;
using Foundation.Cms.Settings;
using Foundation.Features.Header;
using Foundation.Features.Settings;
using System.Web.Mvc;

namespace Foundation.Features.MyAccount
{
    public class MyAccountNavigationController : Controller
    {
        private readonly IContentLoader _contentLoader;
        private readonly LocalizationService _localizationService;
        private readonly CookieService _cookieService = new CookieService();
        private readonly IPageRouteHelper _pageRouteHelper;
        private readonly UrlResolver _urlResolver;
        private readonly ISettingsService _settingsService;

        public MyAccountNavigationController(
            IContentLoader contentLoader,
            LocalizationService localizationService,
            IPageRouteHelper pageRouteHelper,
            UrlResolver urlResolver,
            ISettingsService settingsService)
        {
            _contentLoader = contentLoader;
            _localizationService = localizationService;
            _pageRouteHelper = pageRouteHelper;
            _urlResolver = urlResolver;
            _settingsService = settingsService;
        }

        public ActionResult MyAccountMenu(MyAccountPageType id)
        {
            var referenceSettings = _settingsService.GetSiteSettings<ReferencePageSettings>();
            var layoutsettings = _settingsService.GetSiteSettings<LayoutSettings>();
            if (referenceSettings == null || layoutsettings == null)
            {
                return new EmptyResult();
            }

            var model = new MyAccountNavigationViewModel
            {
                CurrentPageType = MyAccountPageType.Link,
                MenuItemCollection = new LinkItemCollection()
            };

            var menuItems = layoutsettings.MyAccountCmsMenu;
            if (menuItems == null)
            {
                return PartialView("_ProfileSidebar", model);
            }

            menuItems = menuItems.CreateWritableClone();

            model.MenuItemCollection.AddRange(menuItems);

            return PartialView("_ProfileSidebar", model);
        }
    }
}