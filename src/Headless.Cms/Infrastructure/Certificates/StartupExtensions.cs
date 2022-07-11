using Microsoft.Extensions.Configuration;
using HeadlessCms.Infrastructure.Certificates;
using System;
using EPiServer.OpenIDConnect;
using EPiServer.Cms.UI.AspNetIdentity;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Hosting;

#nullable enable
namespace Microsoft.Extensions.DependencyInjection.Extensions
{
    public static class StartupExtensions
    {
        public static IServiceCollection AddAndConfiureOpenIDConnect<TUser>(this IServiceCollection services, IConfiguration configuration, IWebHostEnvironment webhost, Action<OpenIDConnectOptions>? configureOptions = null) where TUser : ApplicationUser
        {
            var config = configuration.GetCertificateOptions();

            // We shouldn't need runtime acces to this configuration, but we just add it in case
            services.AddOptions<CertificateOptions>("Foundation:Certificates").BindConfiguration("Foundation:Certificates");

            var signingCertificate = config.GetSigningCertificate(webhost);
            var encryptionCertificate = config.GetEncryptionCertificate(webhost);
            var useDevelopmentCertificate = signingCertificate is null || encryptionCertificate is null || config.UseDevelopmentCertificate;
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
            services.AddOpenIDConnectUI();
            return services;
        }
    }
}
#nullable restore