using EPiServer.Web.Mvc;
using Foundation.Cms.Pages;
using Foundation.Cms.ViewModels;
using System.Web.Mvc;

namespace Foundation.Features.Home
{
    public class HomeController : PageController<CmsHomePage>
    {
        public ActionResult Index(CmsHomePage currentContent)
        {
            return View(ContentViewModel.Create<CmsHomePage>(currentContent));
        }
    }
}