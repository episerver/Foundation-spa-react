using EPiServer.ContentApi.Cms;
using EPiServer.ContentApi.Cms.Internal;
using EPiServer.ContentApi.Core.Configuration;
using EPiServer.ContentApi.Core.DependencyInjection;
using EPiServer.ContentDefinitionsApi;
using EPiServer.ContentManagementApi;
using EPiServer.DependencyInjection;
using EPiServer.Core;
using EPiServer.Cms.UI.AspNetIdentity;
//using EPiServer.Labs.ContentManager;
//using EPiServer.Labs.GridView;
using EPiServer.OpenIDConnect;
using EPiServer.Web;
using EPiServer.Web.Routing;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using System;
using System.Linq;
using System.Collections.Generic;
using Foundation.ContentActionsApi;
using EPiServer.Labs.BlockEnhancements;
using EPiServer.Labs.ProjectEnhancements;
using EPiServer.Labs.LinkItemProperty;
using UNRVLD.ODP.VisitorGroups.Initilization;

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

            if (_webHostingEnvironment.IsDevelopment())
            {
                //Add development configuration
            }

            #region Optimizely: CMS
            // Add standard CMS Configured for external application & templates
            services
                .AddCmsAspNetIdentity<ApplicationUser>(configureIdentity: options => {
                    // Update password policy
                })
                .AddCms()
                .AddEmbeddedLocalization<Startup>()
                //.Configure<ExternalApplicationOptions>(options => {
                //    options.OptimizeForDelivery = true; // This partially disables VG personalization, hmm, not sure...
                //})
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

            #region Optimizely: Authentication (OpenID Connect)
            // OpenID Connect
            services.AddAndConfiureOpenIDConnect<ApplicationUser>(
                configuration: _configuration,
                webhost: _webHostingEnvironment/*,
                configureOptions: options =>
                {
                    options.Applications.Add(new OpenIDConnectApplication
                    {
                        ClientId = "cms",
                        Scopes = { "openid", "offline_access", "profile", "email", "roles", ContentDeliveryApiOptionsDefaults.Scope, ContentManagementApiOptionsDefaults.Scope, ContentDefinitionsApiOptionsDefaults.Scope },
                        PostLogoutRedirectUris = { BackendUri },
                        RedirectUris =
                        {
                            new Uri(BackendUri, "/login-callback"),
                            new Uri(BackendUri, "/login-renewal"),
                        },
                    });
                }*/
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
            });
            services.AddFormsApi();
            services.AddContentManagementApi(OpenIDConnectOptionsDefaults.AuthenticationScheme, options => {});
            services.AddContentDefinitionsApi(OpenIDConnectOptionsDefaults.AuthenticationScheme, options => {});

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

            #region Optimizely: Project GraphQL
            // Add Project GraphQL
            // services.AddContentGraph(_configuration);
            #endregion

            #region Optimizely Labs: Content Manager / Grid view / Out-of-context editing / etc..
            // Add Content Manager
            //services.AddContentManager(options =>
            //{
            //    options.IsContentManagerEnabled = true;
            //    options.IsBlocksProviderEnabled = true;
            //    options.AutocompleteEnabled = true;
            //    options.NotificationReceiversRoles = new[] { "WebEditors" };
            //    options.CustomViewsFolderName = "CustomExternalViews";
            //    options.AvailableGadgets = new[]
            //    {
            //        ExternalDashboardGadgetType.Starred,
            //        ExternalDashboardGadgetType.Rejected,
            //        ExternalDashboardGadgetType.Tasks
            //    };
            //});

            // Add Gridview
            //services.AddGridView(options =>
            //{
            //    options.IsComponentEnabled = true;
            //    options.IsViewEnabled = true;
            //    options.HideChildrenOfContainersInPageTree = true;
            //    options.ChildrenConvertCommandEnabled = true;
            //});

            // Add Block Enhancements
            services.AddBlockEnhancements(options =>
            {
                options.InlineTranslate = true;
                options.AllowQuickEditOnSharedBlocks = true;
            });

            // Add Project Enhancements
            services.AddProjectEnhancements(options =>
            {
                options.ShowCategories = true;
                options.ShowDescription = true;
                options.ShowLastEditInfo = true;
                options.ShowNotificationTooltip = true;
                options.ShowPageTreeIndicator = true;
                options.ShowSelectedProjectPopup = true;
                options.ShowVisibleTo = true;
            });

            // Add Link Items 
            services.AddLinkItemProperty();
            #endregion

            #region Optimizely Data Platform
            services.AddODPVisitorGroups();
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
                .ApplyContentApiExtensions(OpenIDConnectOptionsDefaults.AuthenticationScheme)        // Add extensions for the ContentDeliveryAPI to fully support OPE
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
            if (!_webHostingEnvironment.IsDevelopment()) 
                services.AddCmsCloudPlatformSupport(_configuration);
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
