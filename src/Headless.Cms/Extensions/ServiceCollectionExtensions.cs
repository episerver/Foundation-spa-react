using EPiServer.Web;
using HeadlessCms.Infrastructure;
using HeadlessCms.Infrastructure.Installers;
using Microsoft.AspNetCore.Mvc.NewtonsoftJson;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using System.Collections.Generic;

namespace Microsoft.Extensions.DependencyInjection.Extensions
{
    public static class HeadlessCmsServiceCollectionExtensions
    {
        public static IServiceCollection AddHeadlessCmsInitialContent(this IServiceCollection services)
        {
            // Add installer steps
            services.TryAddEnumerable(ServiceDescriptor.Singleton(typeof(IInstaller), typeof(SchemaInstaller)));
            services.TryAddEnumerable(ServiceDescriptor.Singleton(typeof(IInstaller), typeof(DataInstaller)));

            // Add installer
            services.TryAddEnumerable(ServiceDescriptor.Singleton(typeof(IFirstRequestInitializer), typeof(ContentInstaller)));
            return services;
        }

        public static IServiceCollection AddJsonConversionStandard(this IServiceCollection services)
        {
            services.AddControllers().AddNewtonsoftJson(options =>
            {
                var namingStrategy = new CamelCaseNamingStrategy
                {
                    ProcessDictionaryKeys = true,
                    ProcessExtensionDataNames = true,
                    OverrideSpecifiedNames = true
                };

                options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                options.SerializerSettings.Formatting = Formatting.Indented;
                options.SerializerSettings.MissingMemberHandling = MissingMemberHandling.Ignore;
                options.SerializerSettings.TypeNameHandling = TypeNameHandling.None;
                options.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Utc;
                options.SerializerSettings.ContractResolver = new DefaultContractResolver
                {
                    NamingStrategy = namingStrategy
                };
                options.SerializerSettings.Converters = (IList<JsonConverter>)new List<JsonConverter>()
                {
                    new StringEnumConverter(namingStrategy),
                    new ProblemDetailsConverter(),
                    new ValidationProblemDetailsConverter()
                };
            });

            return services;
        }
    }
}