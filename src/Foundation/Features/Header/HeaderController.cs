using EPiServer;
using EPiServer.Web.Routing;
using Foundation.Features.Home;
using System.Web.Mvc;

namespace Foundation.Features.Header
{
    public class HeaderController : Controller
    {
        private readonly IHeaderViewModelFactory _headerViewModelFactory;
        private readonly IContentRouteHelper _contentRouteHelper;

        public HeaderController(IHeaderViewModelFactory headerViewModelFactory,
            IContentRouteHelper contentRouteHelper,
            IContentLoader contentLoader)
        {
            _headerViewModelFactory = headerViewModelFactory;
            _contentRouteHelper = contentRouteHelper;
        }

        [ChildActionOnly]
        public ActionResult GetHeader(HomePage homePage)
        {
            var content = _contentRouteHelper.Content;
            return PartialView("_Header", _headerViewModelFactory.CreateHeaderViewModel(content, homePage));
        }

        [ChildActionOnly]
        public ActionResult GetHeaderLogoOnly()
        {
            return PartialView("_HeaderLogo", _headerViewModelFactory.CreateHeaderLogoViewModel());
        }
    }
}