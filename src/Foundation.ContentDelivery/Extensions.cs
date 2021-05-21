using dotenv.net;
using dotenv.net.DependencyInjection.Infrastructure;
using dotenv.net.Interfaces;
using dotenv.net.Utilities;
using EPiServer.ContentApi.Core;
using EPiServer.ContentApi.Core.Configuration;
using EPiServer.ContentApi.Routing;
using EPiServer.ContentApi.Search;
using EPiServer.Core;
using EPiServer.ServiceLocation;
using EPiServer.Web;
using EPiServer.Web.Routing;
using Foundation.ContentDelivery.Infrastructure;
using Foundation.ContentDelivery.Models;
using Microsoft.Owin.Cors;
using Owin;
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

        private static readonly Lazy<IUrlResolver> UrlResolver =
            new Lazy<IUrlResolver>(() => ServiceLocator.Current.GetInstance<IUrlResolver>());

        private static readonly Lazy<ISiteDefinitionResolver> SiteDefinitionResolver =
            new Lazy<ISiteDefinitionResolver>(() => ServiceLocator.Current.GetInstance<ISiteDefinitionResolver>());

        public static IAppBuilder UseContentApiCors(this IAppBuilder app)
        {
            app.UseCors(new CorsOptions() { });
            return app;
        }

        public static void ConfigureFoundationContentDelivery(this ServiceConfigurationContext context)
        {

            var corsString = ConfigurationManager.AppSettings["foundation:contentDelivery:cors_Urls"];
            if (string.IsNullOrEmpty(corsString) && File.Exists(HttpContext.Current.Server.MapPath("/") + "..\\Spa.FrontEnd\\.env"))
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
            context.Services.AddSingleton<UrlResolverService, CurrentContextUrlResolverService>();
            // context.Services.AddSingleton<IViewModelSerializer, DefaultViewModelSerializer>();
            // context.Services.AddSingleton<IContentConverter>();
            context.Services.AddSingleton<ContentLoaderService, ProjectAwareContentLoaderService>();
            context.Services.Configure<ContentApiConfiguration>(c =>
            {
                var clients = new List<ContentApiClient>();
                if (string.IsNullOrEmpty(corsString))
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

        /// <summary>
        /// Helper method to get a URL string for a content reference using the provided culture code
        /// </summary>
        /// <param name="contentRef">The content reference of a routable content item to get the URL for.</param>
        /// <param name="lang">The language code to use when retrieving the URL.</param>
        /// <param name="isAbsolute">Whether the full URL including protocol and host should be returned.</param>
        public static Uri GetUri(this ContentReference contentRef, string lang, bool isAbsolute = false)
        {
            var urlString = UrlResolver.Value.GetUrl(contentRef, lang, new UrlResolverArguments { ForceCanonical = true });
            if (string.IsNullOrEmpty(urlString))
            {
                return new Uri(string.Empty);
            }

            //if we're not getting an absolute URL, we don't need to work out the correct host name so exit here
            var uri = new Uri(urlString, UriKind.RelativeOrAbsolute);
            if (uri.IsAbsoluteUri || !isAbsolute)
            {
                return uri;
            }

            //Work out the correct domain to use from the hosts defined in the site definition
            var siteDefinition = SiteDefinitionResolver.Value.GetByContent(contentRef, true, true);
            var host = siteDefinition.Hosts.FirstOrDefault(h => h.Type == HostDefinitionType.Primary) ?? siteDefinition.Hosts.FirstOrDefault(h => h.Type == HostDefinitionType.Undefined);
            var baseUrl = (host?.Name ?? "*").Equals("*") ? siteDefinition.SiteUrl : new Uri($"http{((host.UseSecureConnection ?? false) ? "s" : string.Empty)}://{host.Name}");
            return new Uri(baseUrl, urlString);
        }
    }
}
