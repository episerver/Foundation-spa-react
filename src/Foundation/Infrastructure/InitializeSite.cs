using dotenv.net;
using dotenv.net.DependencyInjection.Infrastructure;
using dotenv.net.Interfaces;
using dotenv.net.Utilities;
using EPiServer.ContentApi.Core.Configuration;
using EPiServer.ContentApi.Search;
using EPiServer.Framework;
using EPiServer.Framework.Initialization;
using EPiServer.ServiceLocation;
using Foundation.Cms.Extensions;
using Foundation.Find.Cms;
using System;
using System.Collections.Generic;
using System.Text;
using System.Web;

namespace Foundation.Infrastructure
{
    [ModuleDependency(typeof(Cms.Initialize))]
    [ModuleDependency(typeof(EPiServer.ContentApi.Core.Internal.ContentApiCoreInitialization))]
    [ModuleDependency(typeof(ServiceContainerInitialization))]
    public class InitializeSite : IConfigurableModule
    {
        public void ConfigureContainer(ServiceConfigurationContext context)
        {
            ;
            context.ConfigureFoundationCms();
            context.Services.AddSingleton<IEnvReader, EnvReader>();
            AddEnv(builder =>
            {
                builder
                    .AddEnvFile(HttpContext.Current.Server.MapPath("/") + "..\\Spa.FrontEnd\\.env")
                    .AddEncoding(Encoding.UTF8)
                    .AddThrowOnError(true)
                    .AddTrimOptions(true);
            });

            context.Services.Configure<ContentApiConfiguration>(c =>
            {
                var clients = new List<ContentApiClient>()
                {
                    new ContentApiClient
                    {
                        AccessControlAllowOrigin = Environment.GetEnvironmentVariable("EPI_CORS_URL"),
                        ClientId = Guid.NewGuid().ToString()
                    }
                };
                c.EnablePreviewFeatures = true;

                c.Default(RestVersion.Version_3_0)
                    .SetMinimumRoles(string.Empty)
                    .SetRequiredRole(string.Empty)
                    .SetEnablePreviewMode(true)
                    .SetClients(clients); 

                c.Default(RestVersion.Version_2_0)
                    .SetMinimumRoles(string.Empty)
                    .SetRequiredRole(string.Empty)
                    .SetClients(clients);
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
        }

        public void Uninitialize(InitializationEngine context)
        {

        }

        private void AddEnv(Action<DotEnvOptionsBuilder> setupAction)
        {
            if (setupAction == null)
            {
                throw new ArgumentNullException(nameof(setupAction));
            }

            var dotEnvOptionsBuilder = new DotEnvOptionsBuilder();
            setupAction(dotEnvOptionsBuilder);

            var dotEnvOptions = dotEnvOptionsBuilder.Build();
            DotEnv.Config(dotEnvOptions);
        }
    }
}
