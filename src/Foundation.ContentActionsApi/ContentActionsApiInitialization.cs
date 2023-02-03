using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;
using System.Reflection;
using Foundation.ContentActionsApi.Infrastructure;
using Microsoft.AspNetCore.Mvc.ApiExplorer;

namespace Foundation.ContentActionsApi
{
    public static class ContentActionsApiInitialization
    {
        
        /// <summary>
        /// Add the middleware needed to support the ContentActionsApi
        /// </summary>
        /// <param name="app">The application to register the ContentActionsApi on</param>
        /// <returns>The application, for chaining of middleware registration</returns>
        public static IApplicationBuilder UseContentActionApi(this IApplicationBuilder app)
        {
            // Ensure we can enumerate controllers
            var apm = app.ApplicationServices.GetService<ApplicationPartManager>();
            var entry = Assembly.GetEntryAssembly();
            if (entry != null && (apm?.ApplicationParts.All(part => !part.Name.Equals(entry.GetName().Name)) ?? false))
            {
                var part = new AssemblyPart(entry);
                apm.ApplicationParts.Add(part);
            }

            // Add routes
            var opts = app.ApplicationServices.GetRequiredService<ContentActionApiOptions>();
            var routePattern = $"{ opts.ServicePath }/{{contentId}}/{{actionName=Index}}/{{**slug}}";
            app.UseEndpoints(endpoints => {
                endpoints.MapContentActionApi(routePattern);
            });

            return app;
        }

        public static IEndpointRouteBuilder MapContentActionApi(this IEndpointRouteBuilder endpoints, string routePattern)
        {
            endpoints.MapDynamicControllerRoute<RouteTransformer>(routePattern);
            return endpoints;
        }

        public static IServiceCollection AddContentActionApi(this IServiceCollection services) => services.AddContentActionApi(options => { /* No Action */ });
        public static IServiceCollection AddContentActionApi(this IServiceCollection services, Action<ContentActionApiOptions> configure)
        {
            services.Configure(configure);
            services.AddSingleton<RouteTransformer>();
            return services;
        }
    }
}
