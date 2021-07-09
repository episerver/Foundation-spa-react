using EPiServer.Framework;
using EPiServer.Framework.Initialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Web.Routing;

namespace Foundation.SpaViewEngine.SpaView
{
    [InitializableModule]
    [ModuleDependency(typeof(EPiServer.Web.InitializationModule))]
    public class SpaViewInitialization : IInitializableModule
    {
        public void Initialize(InitializationEngine context)
        {
            // Add asset route to the web application
            RouteTable.Routes.MapRoute(
                "SpaViewRoute",
                "SpaView/{controller}/{action}",
                new { controller = "NotFound", action = "Index" },
                new string[] { "Foundation.SpaViewEngine.SpaView.Controllers" }
            );
        }

        public void Uninitialize(InitializationEngine context)
        {

        }
    }
}
