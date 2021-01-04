using dotenv.net;
using dotenv.net.DependencyInjection.Infrastructure;
using dotenv.net.Interfaces;
using dotenv.net.Utilities;
using EPiServer.ContentApi.Core;
using EPiServer.ContentApi.Core.Configuration;
using EPiServer.ContentApi.Routing;
using EPiServer.ContentApi.Search;
using EPiServer.ServiceLocation;
using Foundation.Cms.Extensions;
using Foundation.ContentDelivery.Infrastructure;
using Foundation.ContentDelivery.Models;
using Foundation.ContentDelivery.Models.TypeConverters;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;

namespace Foundation.ContentDelivery
{
    public static class Extensions
    {
        public static void ConfigureFoundationContentDelivery(this ServiceConfigurationContext context)
        {
            context.ConfigureFoundationCms();

            var corsString = ConfigurationManager.AppSettings["foundation:contentDelivery:cors_Urls"];
            if (corsString.IsNullOrEmpty() && File.Exists(HttpContext.Current.Server.MapPath("/") + "..\\Spa.FrontEnd\\.env"))
            {
                context.Services.AddSingleton<IEnvReader, EnvReader>();
                AddEnv(builder =>
                {
                    builder
                        .AddEnvFile(HttpContext.Current.Server.MapPath("/") + "..\\Spa.FrontEnd\\.env")
                        .AddEncoding(Encoding.UTF8)
                        .AddThrowOnError(true)
                        .AddTrimOptions(true);
                });

                corsString = Environment.GetEnvironmentVariable("EPI_CORS_URL");
            }

            context.Services.Add(typeof(ContentApiRouteService), typeof(ContentDeliveryApiRouter), ServiceInstanceScope.HttpContext);
            context.Services.AddSingleton<UrlResolverService, CustomUrlResolverService>();
            context.Services.AddSingleton<IViewModelSerializer, DefaultViewModelSerializer>();
            context.Services.AddSingleton<IContentConverter>();
            context.Services.AddSingleton<ContentLoaderService, ProjectAwareContentLoaderService>();
            context.Services.Configure<ContentApiConfiguration>(c =>
            {
                var clients = new List<ContentApiClient>();
                if (corsString.IsNullOrEmpty())
                {
#if DEBUG
                    clients.Add(new ContentApiClient { ClientId = "Default", AccessControlAllowOrigin = "*" });
#else
                    throw new InvalidOperationException("Please set foundation:contentDelivery:cors_Urls appsetting to configure CORS");
#endif
                }
                else
                {
                    clients = corsString.Split(',').Select(x => new ContentApiClient
                    {
                        AccessControlAllowOrigin = x,
                        ClientId = Guid.NewGuid().ToString()
                    }).ToList();
                }

                c.EnablePreviewFeatures = true;
                c.Default()
                    .SetMinimumRoles(string.Empty)
                    .SetRequiredRole(string.Empty)
                    .SetEnablePreviewMode(true)
                    .SetClients(clients);
            });

            context.Services.Configure<ContentApiSearchConfiguration>(config =>
            {
                config.Default()
                .SetMaximumSearchResults(200)
                .SetSearchCacheDuration(TimeSpan.FromMinutes(60));
            });
        }

        private static void AddEnv(Action<DotEnvOptionsBuilder> setupAction)
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
