using System.Web.Mvc;
using System.Web.Routing;
using EPiServer.Framework;
using EPiServer.Framework.Initialization;

namespace Foundation.SpaViewEngine.SpaContainer
{
    [InitializableModule]
    [ModuleDependency(typeof(EPiServer.Web.InitializationModule))]
    public class SpaContainerInitialization : IInitializableModule
    {
        public void Initialize(InitializationEngine context)
        {
            // Get or create container under root
            SpaFolderHelper.GetOrCreateDeploymentFolder();

            // Add asset route to the web application
            RouteTable.Routes.MapRoute(
                "SpaMediaAssetRoute", 
                "spaview/{container}/{*path}", 
                new { controller = "SpaMediaAsset", action = "Index", container = "", path="" }, 
                new { controller = "SpaMediaAsset", action = "Index"}, 
                new string[] { "Foundation.SpaViewEngine.Controllers" }
            );
        }

        public void Uninitialize(InitializationEngine context)
        {
        }
    }
}