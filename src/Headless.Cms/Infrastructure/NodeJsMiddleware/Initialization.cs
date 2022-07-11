using HeadlessCms.Infrastructure.NodeJsMiddleware;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Configuration;

namespace Microsoft.AspNetCore.Builder
{
    public static class NodeJsAppBuilderExtensions
    {
        /// <summary>
        /// Adds a Middleware that proxies incoming requests to a Node.JS based
        /// webserver running on the same machine, which is fully controlled by
        /// this Application Scope
        /// </summary>
        /// <param name="app">The application context to add the middleware to</param>
        /// <returns>The application scope to continue configuration</returns>
        public static IApplicationBuilder UseNodeJs(this IApplicationBuilder app)
        {
            var service = app.ApplicationServices.GetService<NodeJsMiddlewareOptions>();
            if (service is null || (service is not null && !service.Disabled))
                app.UseMiddleware<NodeJsMiddleware>();
            return app;
        }
    }
}

namespace Microsoft.Extensions.DependencyInjection.Extensions
{
    public static class NodeJsServiceCollectionExtensions
    {
        public static IServiceCollection AddNodeJs(this IServiceCollection services, IConfiguration config)
        {
            
            services
                .AddSingleton<NodeJsProcess>()
                .PostConfigure<NodeJsMiddlewareOptions>(options => {
                    config.GetSection(NodeJsMiddlewareOptions.Section).Bind(options);
                });
            return services;
        }
    }
}
