using EPiServer;
using EPiServer.Web;
using EPiServer.Core;
using EPiServer.ServiceLocation;
using Microsoft.AspNetCore.Http;
using System;
using System.Linq;
using CoreContentLoaderService = EPiServer.ContentApi.Core.Internal.ContentLoaderService;
using ContentApiIContextModeResolver = EPiServer.ContentApi.Core.Internal.IContextModeResolver;
using WebContextModeResolver = EPiServer.Web.IContextModeResolver;
using Foundation.ContentApi.Extensions.Services;
using Foundation.ContentApi.Extensions.Infrastructure;
using Microsoft.AspNetCore.Authentication;
using EPiServer.Security;

namespace Microsoft.Extensions.DependencyInjection
{
    /// <summary>
    /// This class provides the extensions to enable these extensions within
    /// an Optimizely Content Cloud  / Commerce Cloud application
    /// </summary>
    public static class StartupExtensions
    {
        public static IServiceCollection ApplyContentApiExtensions(this IServiceCollection services, string? authSchema = null, bool interceptLoaderSerivce = false)
        {
            // Check preconditions
            if (!services.Any(x => x.ServiceType == typeof(CoreContentLoaderService)))
                throw new Exception("No ContentLoaderService has been configured - did you configure the ContentDeliveryAPI?");

            // Add the services specific to this extension
            services
                .AddSingleton<IApiRequestAssessor, DefaultApiRequestAssessor>() // Add a pluggable method to determine if an URL is a API URL
                .AddHttpContextOrThreadScoped(serviceProvider => {
                    var httpContextAccessor = serviceProvider.GetInstance<IHttpContextAccessor>();
                    var authenticationService = serviceProvider.GetInstance<IAuthenticationService>();
                    var principalAccessor = serviceProvider.GetInstance<IPrincipalAccessor>();
                    return new ApiPrincipalAccessor(httpContextAccessor, authenticationService, principalAccessor, authSchema);
                })
                .AddHttpContextOrThreadScoped<UniversalContextModeResolver, UniversalContextModeResolver>();

            // Replace the Context Mode Resolvers with an universal version, so the context mode is resolved the same at
            // any location
            services
                .AddHttpContextOrThreadScoped<WebContextModeResolver>(locator => locator.GetInstance<UniversalContextModeResolver>())
                .AddHttpContextOrThreadScoped<ContentApiIContextModeResolver>(locator => locator.GetInstance<UniversalContextModeResolver>());

            services.TryIntercept<IPrincipalAccessor>((serviceProvider, principalAccessor) =>
            {
                var httpContextAccessor = serviceProvider.GetInstance<IHttpContextAccessor>();
                var authenticationService = serviceProvider.GetInstance<IAuthenticationService>();
                //var principalAccessor = serviceProvider.GetInstance<IPrincipalAccessor>();
                return new ApiPrincipalAccessor(httpContextAccessor, authenticationService, principalAccessor, authSchema);
            });

            if (interceptLoaderSerivce)
            {
                // Wrap the current ContentLoaderService with a new version, supporting projects and more. This is only
                // needed due to ContentApi.Commerce providing a new content-loader and this extension should be operational
                // regardless of the commerce being installed
                services.Intercept<CoreContentLoaderService>((serviceProvider, currentService) =>
                {
                    var contentLoader = serviceProvider.GetInstance<IContentLoader>();
                    var permanentLinkMapper = serviceProvider.GetInstance<IPermanentLinkMapper>();
                    var providerManager = serviceProvider.GetInstance<IContentProviderManager>();
                    var contextModeResolver = serviceProvider.GetInstance<UniversalContextModeResolver>();
                    var projectResolver = serviceProvider.GetInstance<IProjectResolver>();
                    var httpContextAccessor = serviceProvider.GetInstance<IHttpContextAccessor>();
                    return new ContentLoaderServiceWrapper(contentLoader, permanentLinkMapper, providerManager, contextModeResolver, projectResolver, httpContextAccessor, currentService);
                });
            } else
            {
                services.AddTransient<CoreContentLoaderService, ContentLoaderService>();
            }

            return services;
        }
    }
}
