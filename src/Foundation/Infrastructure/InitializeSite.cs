using EPiServer.ContentApi.Core.Configuration;
using EPiServer.ContentApi.Search;
using EPiServer.Framework;
using EPiServer.Framework.Initialization;
using EPiServer.ServiceLocation;
using Foundation.Cms.Extensions;
using Foundation.Find.Cms;
using System;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Owin;

namespace Foundation.Infrastructure
{
    [ModuleDependency(typeof(Cms.Initialize))]
    [ModuleDependency(typeof(EPiServer.ServiceApi.IntegrationInitialization))]
    [ModuleDependency(typeof(EPiServer.ContentApi.Core.Internal.ContentApiCoreInitialization))]
    [ModuleDependency(typeof(ServiceContainerInitialization))]
    public class InitializeSite : IConfigurableModule
    {
        public void ConfigureContainer(ServiceConfigurationContext context)
        {

            context.ConfigureFoundationCms();
            context.Services.Configure<ContentApiConfiguration>(c =>
            {
                c.EnablePreviewFeatures = true;
                c.Default(RestVersion.Version_3_0)
                    .SetMinimumRoles(string.Empty)
                    .SetRequiredRole(string.Empty);
                c.Default(RestVersion.Version_2_0)
                    .SetMinimumRoles(string.Empty)
                    .SetRequiredRole(string.Empty);
            });

            context.Services.Configure<ContentApiSearchConfiguration>(config =>
            {
                config.Default()
                .SetMaximumSearchResults(200)
                .SetSearchCacheDuration(TimeSpan.FromMinutes(60));
            });
        }

        public void Initialize(InitializationEngine context)
        {
           
            context.InitializeFoundationCms();
            context.InitializeFoundationFindCms();


            var handler = GlobalConfiguration.Configuration.MessageHandlers
                .FirstOrDefault(x => x.GetType() == typeof(PassiveAuthenticationMessageHandler));

            if (handler != null)
            {
                GlobalConfiguration.Configuration.MessageHandlers.Remove(handler);
            }
        }

        public void Uninitialize(InitializationEngine context)
        {

        }
    }
}