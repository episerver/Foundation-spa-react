using Baaijte.Optimizely.ImageSharp.Web;
using Baaijte.Optimizely.ImageSharp.Web.Providers;
using SixLabors.ImageSharp.Web.Caching.Azure;
using SixLabors.ImageSharp.Web.DependencyInjection;
using EPiServer.ContentApi.Cms;
using EPiServer.ContentApi.Cms.Internal;
using EPiServer.ContentApi.Core.Configuration;
using EPiServer.ContentApi.Core.DependencyInjection;
using EPiServer.ContentDefinitionsApi;
using EPiServer.ContentManagementApi;
using EPiServer.DependencyInjection;
using EPiServer.Cms.UI.AspNetIdentity;
using EPiServer.Labs.GridView;
using EPiServer.OpenIDConnect;
using EPiServer.Web;
using EPiServer.Web.Routing;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Foundation.ContentActionsApi;
using UNRVLD.ODP.VisitorGroups.Initilization;
using UNRVLD.ODP.VisitorGroups;
using EPiServer.ServiceLocation;
using ODPApiUserProfile = HeadlessCms.Infrastructure.ODPUserProfile;
using EPiServer.Cms.TinyMce.Core;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
//using System.Net.Http;

namespace HeadlessCms
{
    public class Startup
    {
        private readonly IWebHostEnvironment _webHostingEnvironment;
        protected readonly IConfiguration _configuration;

        public Startup(IWebHostEnvironment webHostingEnvironment, IConfiguration configuration)
        {
            _webHostingEnvironment = webHostingEnvironment;
            _configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            #region Optimizely: CMS
            // Add standard CMS Configured for external application & templates
            services
                .AddCmsAspNetIdentity<ApplicationUser>(configureIdentity: options => {
                    // Update password policy
                })
                .AddCms()
                .AddEmbeddedLocalization<Startup>()
                .Configure<ExternalApplicationOptions>(options => {
                    /**
                     * Set to true when Optimizely Data Platform isn't used, this will restore On-Page-Edit for
                     * Content-Areas. However it will also remove personalization options from interface.
                     */
                    options.OptimizeForDelivery = false;
                })
                .Configure<DisplayOptions>(options => {
                    options
                        .Add("displaymode-screen", "Screen", "u-md-sizeScreen", string.Empty, "epi-icon__layout--full")
                        .Add("displaymode-full", "Full", "u-md-sizeFull", string.Empty, "epi-icon__layout--full")
                        .Add("displaymode-two-thirds", "Wide (2/3)", "u-md-size2of3", string.Empty, "epi -icon__layout--two-thirds")
                        .Add("displaymode-half", "Half (1/2)", "u-md-size1of2", string.Empty, "epi-icon__layout--half")
                        .Add("displaymode-one-third", "Narrow (1/3)", "u-md-size1of3", string.Empty, "epi-icon__layout--one-third")
                        .Add("displaymode-one-sixth", "Extra Narrow (1/6)", "u-md-size1of6", string.Empty, "epi-icon__layout--one-sixth")
                        .Add("displaymode-one-quarter", "Quarter (1/4)", "u-md-size1of4", string.Empty, "epi-icon__layout--one-fourth");
                });
            #endregion

            #region Optimizely: TinyMCE Configuration
            services.Configure<TinyMceConfiguration>(config =>
            {
                config
                    .Default()
                    .AddSettingsTransform("tinymce-webadmin-only-features", (settings, content, propertyName) => {
                        var httpContext = ServiceLocator.Current.GetInstance<IHttpContextAccessor>().HttpContext;
                        var user = httpContext?.User;

                        if (user is ClaimsPrincipal principal && principal.IsInRole("WebAdmins"))
                        {
                            settings.AddPlugin("code");
                            settings.AppendToolbar("| code");
                        }
                    })
                    .AppendToolbar("| alignnone alignleft aligncenter alignright alignjustify");
            });
            #endregion

            #region Optimizely: Authentication (OpenID Connect)
            // OpenID Connect
            services.AddAndConfiureOpenIDConnect<ApplicationUser>(
                configuration: _configuration,
                webhost: _webHostingEnvironment
            );
            #endregion

            #region Optimizely: Standard APIs
            // API Configurations
            int maxSearchResults = 1000;

            // Enable Cors
            services.AddCors(options => {
                options.AddDefaultPolicy(
                    builder => {
                        builder
                            .WithExposedContentDeliveryApiHeaders()
                            .WithExposedContentDefinitionApiHeaders()
                            .AllowAnyMethod()
                            .AllowCredentials();
                    });
            });

            // Add Delivery API to Application
            services
                .AddContentDeliveryApi(OpenIDConnectOptionsDefaults.AuthenticationScheme, options => {
                    options.SiteDefinitionApiEnabled = true;
                })
                // .WithFriendlyUrl() // Only if running Hybrid Headless
                .WithSiteBasedCors();
            services.ConfigureForExternalTemplates();


            // Add different Content Delivery API Options
            services.AddContentSearchApi(OpenIDConnectOptionsDefaults.AuthenticationScheme, options => {
                options.MaximumSearchResults = maxSearchResults;
                options.SearchCacheDuration = TimeSpan.FromSeconds(30);
            });
            services.AddFormsApi();
            services.AddContentManagementApi(OpenIDConnectOptionsDefaults.AuthenticationScheme, options => { });
            services.AddContentDefinitionsApi(OpenIDConnectOptionsDefaults.AuthenticationScheme, options => { });

            // Configure the ContentDeliveryAPI for a Decoupled deployment, using updated preferences
            services
                .ConfigureContentDeliveryApiSerializer(settings => {
                    settings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore;
                })
                .ConfigureForContentDeliveryClient()
                .Configure<ContentApiOptions>(options =>
                {
                    options.EnablePreviewFeatures = true;
                    options.IncludeEmptyContentProperties = false;
                    options.IncludeSiteHosts = true;
                    options.MultiSiteFilteringEnabled = false;
                    options.IncludeNumericContentIdentifier = true;
                    options.FlattenPropertyModel = true;
                    options.EnablePreviewMode = true;
                });
            #endregion

            #region Optimizely: ContentGraph - GraphQL Service
            // Add ContentGraph - GraphQL Service
            services.AddContentGraph(OpenIDConnectOptionsDefaults.AuthenticationScheme, opts =>
            {
                opts.ContentVersionSyncMode = Optimizely.ContentGraph.Cms.Configuration.ContentVersionSyncMode.All;
            });
            #endregion

            #region Optimizely Labs: Content Manager / Grid view / Out-of-context editing / etc..
            // Add Gridview
            services.AddGridView(options =>
            {
                options.IsComponentEnabled = true;
                options.IsViewEnabled = true;
                options.HideChildrenOfContainersInPageTree = true;
                options.ChildrenConvertCommandEnabled = false;
            });
            #endregion

            #region Optimizely Data Platform
            services.AddODPVisitorGroups();
            services.AddHttpContextOrThreadScoped<IODPUserProfile, ODPApiUserProfile>();
            #endregion

            #region Standard .Net Web Application
            // Setup Response compression and caching
            services
                .AddResponseCompression();
            //.AddResponseCaching();
            #endregion

            #region Headless.CMS Extensions & Services
            services
                .AddJsonConversionStandard()        // Ensure that all JSON responses align with the ContentDeliveryAPI
                .AddFoundationSettings()            // Add settings extension
                .ApplyContentApiExtensions()        // Add extensions for the ContentDeliveryAPI to fully support OPE
                .AddContentActionApi()              // Add Content Actions API
                .AddApiExplorer(options => {        // Add & Configure API Explorer
                    options.DefaultAuthScopes.Add(ContentDefinitionsApiOptionsDefaults.Scope);
                    options.DefaultAuthScopes.Add(ContentManagementApiOptionsDefaults.Scope);
                    options.DefaultAuthScopes.Add(ContentDeliveryApiOptionsDefaults.Scope);
                })
                .AddNodeJs(_configuration)          // Add Frontend proxy
                .AddHeadlessCmsInitialContent();    // Add Initial content
            #endregion

            #region Optimizely DXP
            var blobConnection = _configuration.GetConnectionString("EPiServerAzureBlobs");
            if (!_webHostingEnvironment.IsDevelopment() && !string.IsNullOrWhiteSpace(blobConnection))
            {
                services.AddCmsCloudPlatformSupport(_configuration);
                services.Configure<AzureBlobStorageCacheOptions>(options =>
                    {
                        options.ConnectionString = blobConnection;
                        options.ContainerName = "mysitemedia";
                    });
                services.AddImageSharp()
                    .ClearProviders()
                    .AddProvider<BlobImageProvider>()
                    .SetCache<AzureBlobStorageCache>();
            } else
            {
                services.AddBaaijteOptimizelyImageSharp();
            }
            #endregion
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            #region Standard .Net Web Application
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseResponseCompression();
            //app.UseResponseCaching();
            app.UseStaticFiles();
            app.UseCors();
            #endregion

            #region Headless.CMS Extensions & Services
            app.UseBaaijteOptimizelyImageSharp();
            app.UseFoundationSettings();
            app.UseContentActionApi();
            app.UseApiExplorer();
            app.UseNodeJs();
            #endregion

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(name: "Default", pattern: "{controller}/{action}/{id?}"); // Default controllers
                endpoints.MapControllers(); // Attribute Routing

                // If no earlier endpoint matches, redirect the homepage to the CMS - Uncomment for decoupled deployments
                // endpoints.MapGet("/", async http => await Task.Run(() => http.Response.Redirect("/episerver/cms", false)));

                // Map Content as final step
                endpoints.MapContent();
            });
        }
    }
}