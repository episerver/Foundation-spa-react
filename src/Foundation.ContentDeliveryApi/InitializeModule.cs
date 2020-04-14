using EPiServer.ContentApi.Cms;
using EPiServer.ContentApi.Core;
using EPiServer.ContentApi.Routing;
using EPiServer.Framework;
using EPiServer.Framework.Initialization;
using EPiServer.ServiceLocation;
using Foundation.ContentDeliveryApi.Infrastructure;
using Foundation.ContentDeliveryApi.Models;
using Foundation.ContentDeliveryApi.Models.TypeConverters;
using System;
using System.Web;

namespace Foundation.ContentDeliveryApi
{
    [InitializableModule]
    [ModuleDependency(new Type[] { typeof(EPiServer.Web.InitializationModule), typeof(ContentApiCmsInitialization) , typeof(RoutingInitialization)})]
    public class InitializeModule : IConfigurableModule
    {
        public void ConfigureContainer(ServiceConfigurationContext context)
        {
            context.Services.Add(typeof(ContentApiRouteService), typeof(ContentDeliveryApiRouter), ServiceInstanceScope.HttpContext);
            context.Services.AddSingleton<UrlResolverService, CustomUrlResolverService>();
            context.Services.AddSingleton<IViewModelSerializer, DefaultViewModelSerializer>();
            context.Services.AddSingleton<IContentConverter>();
            context.Services.AddSingleton<ContentLoaderService, CustomContentLoaderService>();
        }

        public void Initialize(InitializationEngine context)
        {

        }

        public void Uninitialize(InitializationEngine context)
        {
        }
    }
}
