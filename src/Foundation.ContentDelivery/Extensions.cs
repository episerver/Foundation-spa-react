using EPiServer;
using EPiServer.ContentApi.Core;
using EPiServer.ContentApi.Core.Configuration;
using EPiServer.ContentApi.Core.Security;
using EPiServer.ContentApi.Core.Security.Internal;
using EPiServer.ContentApi.Core.Serialization;
using EPiServer.ContentApi.Routing;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.Find.ClientConventions;
using EPiServer.Find.Framework;
using EPiServer.Framework.Initialization;
using EPiServer.ServiceLocation;
using EPiServer.Web;
using EPiServer.Web.Routing;
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
            app.UseCors(new CorsOptions() {
            });
            return app;
        }

        public static ServiceConfigurationContext ConfigureForPublicHeadless(this ServiceConfigurationContext context)
        {
            context.Services.Configure<ContentApiConfiguration>(config => config.Default().SetMinimumRoles(string.Empty).SetRequiredRole(string.Empty));
            context.Services.AddSingleton<CorsPolicyService, EtagCorsPolicyService>();
            context.Services.Intercept<IContentModelReferenceConverter>((locator, defaultConverter) => new TypedContentModelReferenceConverter(defaultConverter, locator.GetInstance<IContentTypeRepository>(), locator.GetInstance<IContentLoader>()));
            SearchClient.Instance.Conventions.ForInstancesOf<IContent>().ExcludeField("ContentApiModel");
            return context;
        }

        public static ServiceConfigurationContext ConfigureForHeadlessParity(this ServiceConfigurationContext context)
        {
            context.Services.ConfigureForExternalTemplates();
            context.Services.ConfigureForContentDeliveryClient();
            context.Services.Add(typeof(ContentApiRouteService), typeof(ContentDeliveryApiRouter), ServiceInstanceScope.HttpContext);
            context.Services.AddSingleton<UrlResolverService, CurrentContextUrlResolverService>();

            // This will only work for CMS, not Commerce as it hides the commerce content loader service preventing the children of a commerce item to be loaded.
            //context.Services.AddSingleton<ContentLoaderService, ProjectAwareContentLoaderService>();

            // This will work for both CMS and Commerce, with as caveat that the enhancements introduced by the ProjectContentLoaderService are not applied to the
            // GetChildren method (thus only published children will be returned, regardless of edit mode, projects, etc..). The reason for this is that 
            // ContentDelivery.Commerce introduces it's own ContentLoaderService as an internal class, i.e. it cannot be extended by an implementation. If it's replaced
            // the GetChildren enpoint will not work correctly.
            context.Services.Intercept<ContentLoaderService>((servicelocator, current) => {
                return new ProjectContentLoaderServiceInterceptor(
                    current,
                    servicelocator.GetInstance<IProjectResolver>(),
                    servicelocator.GetInstance<ProjectRepository>(),
                    servicelocator.GetInstance<ISecurityPrincipal>(),
                    servicelocator.GetInstance<IContentLoader>(),
                    servicelocator.GetInstance<IPermanentLinkMapper>(),
                    servicelocator.GetInstance<IUrlResolver>(),
                    servicelocator.GetInstance<ContentApiContextModeResolver>(),
                    servicelocator.GetInstance<IContentProviderManager>()
                );
            });
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
                        .SetFlattenPropertyModel(false) // If set to true almost all indexing by Search & Nav fails as field data becomes very dynamic
                        .SetSiteDefinitionApiEnabled(true)
                        .SetIncludeSiteHosts(true)
                        .SetIncludeNumericContentIdentifier(true)
                        .SetEnablePreviewMode(true)
                        .SetIncludeNullValues(false); // If set to true fiels which are null in the first content item will cause issues for
                                                      // every subsequent content item within Search & Navigation
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
