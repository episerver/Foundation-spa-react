using EPiServer.Web.Mvc;
using Foundation.Features.Shared;
using System.Web.Mvc;

namespace Foundation.Features.Home
{
    public class HomeController : PageController<HomePage>
    {
        public ActionResult Index(HomePage currentContent)
        {
            return View(ContentViewModel.Create<HomePage>(currentContent));
        }
    }
}