using EPiServer.Shell.Modules;
using EPiServer.Shell.ViewComposition;
using EPiServer.Shell.Web.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace Foundation.ApiExplorer.AdminSection.ApiExplorer
{
    [Authorize(Roles = "CmsAdmins,CmsEditors,FrontendDev")]
    [Controller]
    public class ApiExplorerController : Controller
    {
        private readonly IBootstrapper _bootstrapper;
        private readonly IViewManager _viewManager;
        private readonly ModuleTable _moduleTable;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ApiExplorerController(
            IBootstrapper bootstrapper,
            IViewManager viewManager,
            ModuleTable moduleTable,
            IHttpContextAccessor httpContextAccessor)
        {
            _bootstrapper = bootstrapper;
            _viewManager = viewManager;
            _moduleTable = moduleTable;
            _httpContextAccessor = httpContextAccessor;
        }

        public ActionResult Index()
        {
            var model = new ApiExplorerModel()
            {
                SwaggerUrl = "/swagger/index.html"
            };

            //ShellModule moduleOrDefault = _moduleTable.GetModuleOrDefault(typeof (ApiExplorerController).Assembly);
            //if (_httpContextAccessor.HttpContext != null)
            //    _httpContextAccessor.HttpContext.GetRouteData().DataTokens["module"] = (object) moduleOrDefault;
            

            //ICompositeView view = _viewManager.GetView(moduleOrDefault, "api-explorer");
            //return view == null ? (ActionResult) new NotFoundObjectResult((object) "SwaggerUI Not Found") : (ActionResult) View(nameof (Index), (object) model);

            return View(nameof(Index), model);
        }

        protected static string BuildViewName(string methodName)
        {
            return $"Foundation.ApiExplorer/Views/ApiExplorer/{ methodName }.cshtml";
        }
    }
}