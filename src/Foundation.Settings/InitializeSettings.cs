using Microsoft.Extensions.DependencyInjection;
using Foundation.Settings.Infrastructure;
using System;

namespace Foundation.Settings
{
    public class InitializeSettings
    {
        
    }
}

namespace Microsoft.Extensions.DependencyInjection.Extensions
{
    public static class FoundationSettingsInjectionExtensions
    {
        public static IServiceCollection AddFoundationSettings(this IServiceCollection services)
        {
            services.AddSingleton<ISettingsService, SettingsService>();
            return services;
        }
    }
}

namespace Microsoft.AspNetCore.Builder
{
    public static class FoundationSettingsBuilderExtensions
    {
        public static IApplicationBuilder UseFoundationSettings(this IApplicationBuilder builder)
        {
            var service = builder.ApplicationServices.GetService<ISettingsService>();
            if (service != null)
                service.InitializeSettings();
            else
                throw new Exception("The settings service was not registered, please add the ISettingsService before using it.");
            return builder;
        }
    }
}