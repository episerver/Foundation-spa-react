using EPiServer.Shell.Modules;
using Foundation.ApiExplorer;
using Foundation.ApiExplorer.Infrastructure;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace EPiServer.DependencyInjection
{
    public static class ApiExplorerStartupExtensions
    {
        public static IServiceCollection AddApiExplorer(this IServiceCollection services, Uri siteUrl)
        {
            var options = ApiExplorerOptions.CreateFromSiteURL(siteUrl);
            return services.AddApiExplorer(options);
        }
        public static IServiceCollection AddApiExplorer(this IServiceCollection services, string siteUrl)
        {
            var options = ApiExplorerOptions.CreateFromSiteURL(siteUrl);
            return services.AddApiExplorer(options);
        }
        public static IServiceCollection AddApiExplorer(this IServiceCollection services, Action<ApiExplorerOptions> configure)
        {
            var options = new ApiExplorerOptions();
            configure(options);
            return services.AddApiExplorer(options);
        }
        public static IServiceCollection AddApiExplorer(this IServiceCollection services, ApiExplorerOptions options)
        {
            // Add the Admin Module
            services.Configure<ProtectedModuleOptions>(o => o.Items.Add(new ModuleDetails { Name = "Foundation.ApiExplorer" }));

            // Auth name in definition
            string AuthName = "OptiContentCloud";

            // Configure authentication for endpoints
            var wellKnown = options.MasterUrl is not null ? new Uri(options.MasterUrl, ".well-known/openid-configuration") : new Uri("/.well-known/openid-configuration", UriKind.Relative);
            var securityDefinition = new OpenApiSecurityScheme()
            {
                Type = SecuritySchemeType.OpenIdConnect,
                OpenIdConnectUrl = wellKnown,
                Description = $"{ options.ApplicationName } Integrated OpenID Connect service",
            };
            options.ConfigureSecurity?.Invoke(securityDefinition);
            services.AddSingleton(options);

            //Add Swagger
            services.AddSwaggerGen(swaggerOptions => {
                swaggerOptions.SwaggerDoc(options.DocumentName, options.CreateApiInfo());
                swaggerOptions.ResolveConflictingActions(OptimizelyConflictResolver.Resolve);
                swaggerOptions.AddSecurityDefinition(AuthName, securityDefinition);
                swaggerOptions.CustomSchemaIds(x => x.FullName?.Contains(".Models.") ?? false ? x.FullName[(x.FullName.IndexOf(".Models.") + 8)..] : x.Name);

                if (options.GlobalAuthScopes != null && options.GlobalAuthScopes.Count > 0)
                {
                    var schemaReference = new OpenApiSecurityScheme()
                    {
                        Reference = new OpenApiReference() { Id = AuthName, Type = ReferenceType.SecurityScheme }
                    };
                    var securityRequirement = new OpenApiSecurityRequirement {
                        { schemaReference, options.GlobalAuthScopes }
                    };
                    swaggerOptions.AddSecurityRequirement(securityRequirement);
                }
            });
            services.AddSwaggerGenNewtonsoftSupport();

            return services;
        }

        public static IApplicationBuilder UseApiExplorer(this IApplicationBuilder app, bool mapEndpoints = true)
        {
            // Make sure we have the options
            var options = app.ApplicationServices.GetService<ApiExplorerOptions>();
            if (null == options)
                throw new ApplicationException("Make sure to add the Api Explorer to the service container. (services.AddApiExplorer(...));");

            // Enable Swagger
            app.UseSwagger();
            app.UseSwaggerUI(c => {
                var endpoint = $"/swagger/{ options.DocumentName }/swagger.json";
                c.SwaggerEndpoint(endpoint, options.ApplicationName);
                c.HeadContent = "<style>.swagger-ui .topbar { display: none; } .swagger-ui .information-container.wrapper .info { margin: 20px 0px; }</style>";
                if (options.EnableFilter)
                    c.EnableFilter();
                c.EnablePersistAuthorization();
                c.OAuthClientId(options.OAuthClientId);
                c.OAuthClientSecret(options.OAuthClientSecret);
                c.OAuthAppName("Foundation.ApiExplorer");
                c.OAuthScopes(options.DefaultAuthScopes.ToArray());
            });

            // Map endpoints if needed
            if (mapEndpoints)
            {
                app.UseEndpoints(endpoints =>
                {
                    endpoints.MapApiExplorer();
                });
            }

            return app;
        }

        public static IEndpointRouteBuilder MapApiExplorer(this IEndpointRouteBuilder endpoints)
        {
            endpoints.MapSwagger();
            return endpoints;
        }
    }

    
}