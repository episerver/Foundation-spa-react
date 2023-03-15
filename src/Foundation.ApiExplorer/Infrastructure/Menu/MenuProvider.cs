using EPiServer.Shell.Navigation;
using EPiServer.Shell.Modules;
using System.Collections.Generic;
using System;
using EPiServer.Shell;

namespace Foundation.ApiExplorer.Infrastructure.Menu
{

    [MenuProvider]
    public class MenuProvider : IMenuProvider
    {
        protected readonly string RouteBasePath = "/";
        protected readonly ShellModule ShellModule;

        public MenuProvider(ModuleTable shellModules)
        {
            if (shellModules.TryGetModule(GetType().Assembly, out ShellModule module))
            {
                ShellModule = module;
                RouteBasePath = module.GetResolvedRouteBasePath();
            }
            else
                throw new ApplicationException("Unable to find the Foundation.ApiExplorer module");
        }

        public IEnumerable<MenuItem> GetMenuItems()
        {
            var menuItems = new List<MenuItem>
            {
                new UrlMenuItem(
                    "API Explorer",
                    MenuPaths.Global + "/ApiExplorer",
                    Paths.ToResource(Constants.ModuleName, ShellModule.GetRouteSegmentForController("ApiExplorer"))
                ) {
                    SortIndex = 150,
                    //AuthorizationPolicy = CmsPolicyNames.CmsAdmin
                }
            };
            return menuItems;
        }
    }
}