using EPiServer.Web;
using HeadlessCms.Infrastructure;
using HeadlessCms.Infrastructure.Installers;
using Microsoft.AspNetCore.Mvc.NewtonsoftJson;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using System.Collections.Generic;
using System.Linq;

namespace Microsoft.Extensions.DependencyInjection.Extensions
{
    public static class HeadlessCmsServiceCollectionExtensions
    {
        public static IServiceCollection AddHeadlessCmsInitialContent(this IServiceCollection services)
        {
            // Add installer steps
            services.TryAddEnumerable(ServiceDescriptor.Singleton(typeof(IInstaller), typeof(SchemaInstaller)));
            services.TryAddEnumerable(ServiceDescriptor.Singleton(typeof(IInstaller), typeof(DataInstaller)));
            services.TryAddSingleton<SchemaInstaller, SchemaInstaller>();
            services.TryAddSingleton<DataInstaller, DataInstaller>();
            
            // Add installer
            services.TryAddEnumerable(ServiceDescriptor.Singleton(typeof(IFirstRequestInitializer), typeof(ContentInstaller)));

            // Add JSON Data Converters for Content Definitions
            // So the converters needed to make the system understand the definition structure are internal, but
            // registered within the container. So we'll be using reflection to find them and make them available
            // as instance of JsonConverter.
            var jsonconverters = services
                .Where(x => x.ImplementationType?.IsAssignableTo(typeof(JsonConverter)) ?? false)
                .Where(x => x.ImplementationType?.FullName?.Contains("ContentDefinitionsApi") ?? false)
                .Select(x => {
                    if (x.ImplementationType is not null)
                        return ServiceDescriptor.Singleton(typeof(JsonConverter), x.ImplementationType);
                    return null;
                }).Cast<ServiceDescriptor>().ToList();
            jsonconverters.ForEach(x => services.TryAddEnumerable(x));
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