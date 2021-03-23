using EPiServer.ContentApi.Cms;
using EPiServer.ContentApi.Routing;
using EPiServer.Framework;
using EPiServer.Framework.Initialization;
using EPiServer.ServiceLocation;
using System;

namespace Foundation.ContentDelivery
{
    [InitializableModule]
    [ModuleDependency(new Type[] { typeof(EPiServer.Web.InitializationModule), typeof(ContentApiCmsInitialization) , typeof(RoutingInitialization)})]
    public class InitializeModule : IConfigurableModule
    {
        public void ConfigureContainer(ServiceConfigurationContext context)
        {
            context.ConfigureFoundationContentDelivery();
        }

        public void Initialize(InitializationEngine context)
        {
            
        }

        public void Uninitialize(InitializationEngine context)
        {
        }
    }
}
