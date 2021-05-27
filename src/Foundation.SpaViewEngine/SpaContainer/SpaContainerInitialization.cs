using System;
using System.Linq;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.UI.WebControls;
using EPiServer;
using EPiServer.Core;
using EPiServer.Framework;
using EPiServer.Framework.Initialization;
using EPiServer.Logging;

namespace Foundation.SpaViewEngine.SpaContainer
{
    [InitializableModule]
    [ModuleDependency(typeof(EPiServer.Web.InitializationModule))]
    public class SpaContainerInitialization : IInitializableModule
    {
        public void Initialize(InitializationEngine context)
        {
            // get container under root
            SpaFolderHelper.GetOrCreateDeploymentFolder();
            RouteTable.Routes.MapRoute(
                "SpaViewAssetRoute", 
                "spaview/{container}/{*path}", 
                new { controller = "SpaViewAsset", action = "Index", container = "", path="" }, 
                new { controller = "SpaViewAsset", action = "Index"}, 
                new string[] { "Foundation.SpaViewEngine.SpaContainer" }
            );
        }

        public void Uninitialize(InitializationEngine context)
        {
        }
    }
}