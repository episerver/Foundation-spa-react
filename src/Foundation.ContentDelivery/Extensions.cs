using EPiServer.ContentApi.Core;
using EPiServer.ContentApi.Core.Configuration;
using EPiServer.ContentApi.Routing;
using EPiServer.Framework.Initialization;
using EPiServer.ServiceLocation;
using EPiServer.Web;
using Foundation.ContentDelivery.Infrastructure;
using Foundation.ContentDelivery.Models;
using Microsoft.Owin.Cors;
using Owin;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Foundation.ContentDelivery
{
    public static class Extensions
    {
        private static readonly Lazy<ISiteDefinitionRepository> _siteDefinitionRepository =
            new Lazy<ISiteDefinitionRepository>(() => ServiceLocator.Current.GetInstance<ISiteDefinitionRepository>());

        public static IAppBuilder UseContentApiCors(this IAppBuilder app)
        {
            app.UseCors(new CorsOptions() { });
            return app;
        }

        public static ServiceConfigurationContext ConfigureForPublicHeadless(this ServiceConfigurationContext context)
        {
            context.Services.Configure<ContentApiConfiguration>(config => config.Default().SetMinimumRoles(string.Empty).SetRequiredRole(string.Empty));
            return context;
        }

        public static ServiceConfigurationContext ConfigureForHeadlessParity(this ServiceConfigurationContext context)
        {
            context.Services.ConfigureForExternalTemplates();
            context.Services.ConfigureForContentDeliveryClient();
            context.Services.Add(typeof(ContentApiRouteService), typeof(ContentDeliveryApiRouter), ServiceInstanceScope.HttpContext);
            context.Services.AddSingleton<UrlResolverService, CurrentContextUrlResolverService>();
            context.Services.AddSingleton<ContentLoaderService, ProjectAwareContentLoaderService>();
            return context;
        }

        public static ServiceConfigurationContext ConfigureForCors(this ServiceConfigurationContext context)
        {

            context.Services.Configure<ContentApiConfiguration>(config => config.Default().SetClients(GetContentApiClients()));
            return context;
        }

        public static InitializationEngine InitializeForLibSpaCore(this InitializationEngine context)
        {
            context.InitializeInstance<ContentApiConfiguration>(config => {
                config
                    .Default()
                        .SetFlattenPropertyModel(false)
                        .SetSiteDefinitionApiEnabled(true)
                        .SetIncludeSiteHosts(true)
                        .SetIncludeNumericContentIdentifier(true);
            });
            return context;
        }

        public static InitializationEngine InitializeInstance<T>(this InitializationEngine context, Action<T> initialize)
        {
            initialize(context.Locate.Advanced.GetInstance<T>());
            return context;
        }

        public static InitializationEngine InitializeForCors(this InitializationEngine context)
        {
            context.Locate.Advanced.GetInstance<ISiteDefinitionEvents>().SiteUpdated += Extensions_SiteUpdated;
            return context;
        }

        public static InitializationEngine UninitializeForCors(this InitializationEngine context)
        {
            context.Locate.Advanced.GetInstance<ISiteDefinitionEvents>().SiteUpdated -= Extensions_SiteUpdated;
            return context;
        }

        private static void Extensions_SiteUpdated(object sender, SiteDefinitionEventArgs e)
        {
            var clients = GetContentApiClients();
            ServiceLocator.Current.GetInstance<ContentApiConfiguration>().Default().SetClients(clients);
        }

        private static IEnumerable<ContentApiClient> GetContentApiClients()
        {
            return _siteDefinitionRepository.Value.List().SelectMany(site => site.Hosts).Where(host => !host.IsWildcardHost()).Select(host => new ContentApiClient()
            {
                ClientId = host.Site.Name + ": " + host.Name,
                AccessControlAllowOrigin = VirtualPathUtilityEx.RemoveTrailingSlash(host.Url.ToString())
            });
        }
    }
}
