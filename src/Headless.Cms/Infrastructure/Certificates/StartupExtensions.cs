using Microsoft.Extensions.Configuration;
using HeadlessCms.Infrastructure.Certificates;
using System;
using EPiServer.OpenIDConnect;
using EPiServer.Cms.UI.AspNetIdentity;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Hosting;
using OpenIddict.Server;
using EPiServer.ContentApi.Cms;
using EPiServer.ContentDefinitionsApi;
using EPiServer.ContentManagementApi;

#nullable enable
namespace Microsoft.Extensions.DependencyInjection.Extensions
{
    public static class StartupExtensions
    {
        /// <summary>
        /// Helper method to contain the needed stpes to configure the OpenID Connect integration within the CMS
        /// </summary>
        /// <typeparam name="TUser">The object describing the user</typeparam>
        /// <param name="services">The service container on which to operate</param>
        /// <param name="configuration">The current application configuration</param>
        /// <param name="webhost">The current application webhost</param>
        /// <param name="configureOptions">Allows for overriding the OpenID configuration using a callback</param>
        /// <returns>The service container with the services added</returns>
        public static IServiceCollection AddAndConfiureOpenIDConnect<TUser>(this IServiceCollection services, IConfiguration configuration, IWebHostEnvironment webhost, Action<OpenIDConnectOptions>? configureOptions = null) where TUser : ApplicationUser
        {
            var config = configuration.GetCertificateOptions();
            var useDevelopmentCertificate = config.UseDevelopmentCertificate;
            var signingCertificate = config.UseDevelopmentCertificate ? null : config.GetSigningCertificate(webhost);
            var encryptionCertificate = config.UseDevelopmentCertificate ? null : config.GetEncryptionCertificate(webhost);
            
            services.AddOpenIDConnect<TUser>(
                useDevelopmentCertificate: useDevelopmentCertificate,
                signingCertificate: signingCertificate,
                encryptionCertificate: encryptionCertificate,
                createSchema: true,
                configureOptions: options =>
                {
                    options.RequireHttps = !webhost.IsDevelopment();
                    options.AllowResourceOwnerPasswordFlow = true;
                    configureOptions?.Invoke(options);
                }
            );

            services.PostConfigureAll<OpenIddictServerOptions>(opts =>
            {
                // Ensure the Content Definitions API Scope has been registered
                if (!opts.Scopes.Contains(ContentDefinitionsApiOptionsDefaults.Scope))
                    opts.Scopes.Add(ContentDefinitionsApiOptionsDefaults.Scope);

                // Ensure the Content Management API Scope has been registered
                if (!opts.Scopes.Contains(ContentManagementApiOptionsDefaults.Scope))
                    opts.Scopes.Add(ContentManagementApiOptionsDefaults.Scope);

                // Ensure the Content Delivery API Scope has been registered
                if (!opts.Scopes.Contains(ContentDeliveryApiOptionsDefaults.Scope))
                    opts.Scopes.Add(ContentDeliveryApiOptionsDefaults.Scope);
            });

            services.AddOpenIDConnectUI();
            return services;
        }
    }
}
#nullable restore