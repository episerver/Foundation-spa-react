using EPiServer.Framework;
using EPiServer.Framework.Initialization;
using EPiServer.ServiceLocation;
using EPiServer.Shell.Modules;

namespace HeadlessCms.Infrastructure
{
    [InitializableModule]
    public class HeadlessCmsInitialization : IConfigurableModule
    {
        public void ConfigureContainer(ServiceConfigurationContext context)
        {
            //Register the protected scripts
            context.Services.Configure<ProtectedModuleOptions>(o => o.Items.Add(new ModuleDetails { Name = "Headless.Cms" }));
        }

        public void Initialize(InitializationEngine context)
        {
            // Nothing to be done here
        }

        public void Uninitialize(InitializationEngine context)
        {
            // Nothing to be done here
        }
    }
}
