using System;
using System.Linq;
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

            // register partial router

        }

        public void Uninitialize(InitializationEngine context)
        {
            //Add uninitialization logic
        }
    }
}