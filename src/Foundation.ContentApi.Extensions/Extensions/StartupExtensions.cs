using ContentApiContentLoaderService = EPiServer.ContentApi.Core.Internal.ContentLoaderService;
using ContentApiIContextModeResolver = EPiServer.ContentApi.Core.Internal.IContextModeResolver;
using WebContextModeResolver = EPiServer.Web.IContextModeResolver;
using Foundation.ContentApi.Extensions.Services;
using Foundation.ContentApi.Extensions.Infrastructure;
using EPiServer.ContentApi.Core.Serialization;
using Foundation.ContentApi.Extensions.Conversion;
using Foundation.ContentApi.Extensions.Conversion.StructuredHtml;

namespace Microsoft.Extensions.DependencyInjection
{
    /// <summary>
    /// This class provides the extensions to enable these extensions within
    /// an Optimizely Content Cloud  / Commerce Cloud application
    /// </summary>
    public static class StartupExtensions
    {
        /// <summary>
        /// Add the following ContentDeliveryAPI Extensions: UnifiedContextMode, UnifiedPrincipal, StructuredHtml, ContentLoader
        /// </summary>
        /// <param name="services">The service collection to add the extensions to</param>
        /// <returns>The enriched service collection</returns>
        /// <exception cref="Exception">If the extension is applied prior to the ContentDeliveryAPI</exception>
        /// <see cref="AddStructuredHtml(IServiceCollection)"/>
        /// <see cref="AddUnifiedContextModeResolver(IServiceCollection)"/>
        /// <see cref="AddUnifiedPrincipalResolution(IServiceCollection, string?)"/>
        public static IServiceCollection ApplyContentApiExtensions(this IServiceCollection services)
        {
            // Check preconditions
            if (!services.Any(x => x.ServiceType == typeof(ContentApiContentLoaderService)))
                throw new Exception("No ContentLoaderService has been configured - did you configure the ContentDeliveryAPI?");

            services
                .AddUnifiedContextModeResolver()
                .AddStructuredHtml()
                .AddEnhancedContentLoader();

            return services;
        }

        public static IServiceCollection AddUnifiedContextModeResolver(this IServiceCollection services)
        {

            // Replace the Context Mode Resolvers with an universal version, so the context mode is resolved the same at
            // any location
            services
                .AddSingleton<IApiRequestAssessor, DefaultApiRequestAssessor>()
                .AddHttpContextOrThreadScoped<UniversalContextModeResolver, UniversalContextModeResolver>()
                .AddHttpContextOrThreadScoped<WebContextModeResolver>(locator => locator.GetInstance<UniversalContextModeResolver>())
                .AddHttpContextOrThreadScoped<ContentApiIContextModeResolver>(locator => locator.GetInstance<UniversalContextModeResolver>());
            return services;
        }


        public static IServiceCollection AddStructuredHtml(this IServiceCollection services)
        {
            // Add the services specific to this extension
            services
                .AddHttpContextOrThreadScoped<IPropertyConverterProvider, StructuredHtmlPropertyConverterProvider>()
                .AddHttpContextOrThreadScoped<StructuredHtmlPropertyConverter, StructuredHtmlPropertyConverter>()
                .AddTransient<IPropertyConverter, StructuredHtmlPropertyConverter>(s => s.GetInstance<StructuredHtmlPropertyConverter>())
                .AddTransient<DefaultBlockView>()
                .AddOptions<StructuredHtmlPropertyOptions>();
            return services;
        }

        /// <summary>
        /// Repace the ContentLoader Service with a content loader that fully supports:
        /// <list type="bullet">
        ///     <item>Loading any content version</item>
        ///     <item>Access rights checking on each content item</item>
        ///     <item>Loading the correct draft based on a selected project</item>
        ///     <item>Loading the correct draft based on a visitor group preview</item>
        /// </list>
        /// The ContentLoader service is implemented as interceptor, so it does not interferes
        /// to a minimum with any other extension of the ContentLoader services
        /// </summary>
        /// <param name="services">The service collection to add the replacement to</param>
        /// <returns>The changed service collection</returns>
        public static IServiceCollection AddEnhancedContentLoader(this IServiceCollection services)
        {
            // Wrap the current ContentLoaderService with a new version, supporting projects and more. This is only
            // needed due to ContentApi.Commerce providing a new content-loader and this extension should be operational
            // regardless of the commerce being installed
            return services
                .AddTransient<ContentApiContentLoaderService, EnhancedContentLoaderService>()
                .AddHttpContextOrThreadScoped<IContentFilter, VisitorGroupPreviewContentFilter>();
        }
    }
}
