using EPiServer.ContentApi.Cms;
using EPiServer.ContentApi.Core.Internal;
using EPiServer.ContentApi.Routing;
using EPiServer.Framework;
using EPiServer.Framework.Initialization;
using EPiServer.ServiceLocation;
using System;

namespace Foundation.ContentDelivery
{
    [InitializableModule]
    [ModuleDependency(new Type[] { 
        typeof(EPiServer.Web.InitializationModule),
        typeof(ServiceContainerInitialization),
        typeof(ContentApiCoreInitialization),
        typeof(ContentApiCmsInitialization), 
        typeof(RoutingInitialization)
    })]
    public class FoundationContentDeliveryInitialization : IConfigurableModule
    {
        public void ConfigureContainer(ServiceConfigurationContext context)
        {
            context.ConfigureForPublicHeadless();
            context.ConfigureForHeadlessParity();
            context.ConfigureForCors();
        }

        public void Initialize(InitializationEngine context)
        {
            context.InitializeForCors();
            context.InitializeForLibSpaCore();
        }

        public void Uninitialize(InitializationEngine context)
        {
            context.UninitializeForCors();
        }
    }
}
