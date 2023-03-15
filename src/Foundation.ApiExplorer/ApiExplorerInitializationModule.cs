using EPiServer.Framework;
using EPiServer.Framework.Initialization;
using EPiServer.ServiceLocation;
using EPiServer.Shell.Modules;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Foundation.ApiExplorer
{

    [InitializableModule]
    public class ApiExplorerInitializationModule : IConfigurableModule
    {
        public void ConfigureContainer(ServiceConfigurationContext context)
        {
            context.Services.Configure<ProtectedModuleOptions>(o => o.Items.Add(new ModuleDetails { Name = "Foundation.ApiExplorer" }));
        }

        public void Initialize(InitializationEngine context)
        {
            // No initialization actions
        }

        public void Uninitialize(InitializationEngine context)
        {
            // No uninitialization actions
        }
    }
}
