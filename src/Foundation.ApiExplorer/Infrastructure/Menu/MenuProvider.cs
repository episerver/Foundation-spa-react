using EPiServer.Shell.Navigation;
using EPiServer.Shell.Modules;
using EPiServer.Shell.Web;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using System.Collections.Generic;

using Foundation.ApiExplorer.AdminSection.ApiExplorer;

namespace Foundation.ApiExplorer.Infrastructure.Menu
{

    [MenuProvider]
    public class MenuProvider : IMenuProvider
    {
        private readonly ModuleTable _modules;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public MenuProvider(ModuleTable modules, IHttpContextAccessor httpContextAccessor)
        {
            _modules = modules;
            _httpContextAccessor = httpContextAccessor;
        }

        public IEnumerable<MenuItem> GetMenuItems()
        {
            var menuItems = new List<MenuItem>();
            menuItems.Add(new RouteMenuItem("API Explorer",
                MenuPaths.Global + "/ApiExplorer",
                new RouteValueDictionary((object) new { controller = "ApiExplorer", action = "Index", moduleArea = "Foundation.ApiExplorer" })
            ) {
                SortIndex = 150,
                //AuthorizationPolicy = CmsPolicyNames.CmsAdmin,
                Url = GetUrl()
            });

            return menuItems;
        }

        private string? GetUrl() => this._httpContextAccessor.HttpContext?.Request != null ? this._httpContextAccessor.HttpContext.GetControllerPath(typeof (ApiExplorerController), "Index") : null;
    }
}