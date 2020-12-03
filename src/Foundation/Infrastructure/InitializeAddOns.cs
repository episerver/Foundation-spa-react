using AdvancedExternalReviews;
using dotenv.net;
using dotenv.net.DependencyInjection.Infrastructure;
using dotenv.net.Interfaces;
using dotenv.net.Utilities;
using EPiServer.ContentApi.Core.Configuration;
using EPiServer.ContentApi.Search;
using EPiServer.Framework;
using EPiServer.Framework.Initialization;
using EPiServer.Labs.GridView;
using EPiServer.Labs.ProjectEnhancements;
using EPiServer.Labs.ProjectEnhancements.ProjectCategory;
using EPiServer.ServiceLocation;
using Foundation.Cms.Extensions;
using Foundation.Find.Cms;
using System;
using System.Collections.Generic;
using System.Text;
using System.Web;

namespace Foundation.Infrastructure
{
    [ModuleDependency(typeof(Cms.Initialize))]
    [ModuleDependency(typeof(EPiServer.ContentApi.Core.Internal.ContentApiCoreInitialization))]
    [ModuleDependency(typeof(ServiceContainerInitialization))]
    public class InitializeAddOns : IConfigurableModule
    {
        public void ConfigureContainer(ServiceConfigurationContext context)
        {
            context.Services.AddTransient<IProjectCategoriesDataSource, DefaultProjectCategoriesDataSource>();
            context.Services.Configure<ProjectOptions>(x =>
            {
                x.ShowPageTreeIndicator = true;
                x.ShowDescription = true;
                x.ShowCategories = true;
                x.ShowVisibleTo = true;
                x.ShowNotificationTooltip = true;
                x.ShowSelectedProjectPopup = true;
                x.ShowLastEditInfo = true;
            });

            context.Services.Configure<ExternalReviewOptions>(x =>
            {
                x.EditableLinksEnabled = true;
                x.AllowScreenshotAttachments = true;
                x.IsEnabled = true;
                x.PinCodeSecurity.Enabled = false;
            });

            context.Services.Configure<GridViewOptions>(x =>
            {
                x.ChildrenConvertCommandEnabled = true;
                x.IsViewEnabled = true;
                x.IsComponentEnabled = true;
            });

        }

        public void Initialize(InitializationEngine context)
        {
            // Intentionally left empty
        }

        public void Uninitialize(InitializationEngine context)
        {
            // Intentionally left empty
        }
    }

    public class DefaultProjectCategoriesDataSource : IProjectCategoriesDataSource
    {
        public IEnumerable<ProjectCategoryItem> List()
        {
            return new[]
            {
                new ProjectCategoryItem
                (
                    "Campaigns",
                    "Campaigns",
                    ProjectCategoryColor.Gray,
                    "Used to publish campaigns"
                ),
                new ProjectCategoryItem
                (
                    "Translations",
                    "Translations",
                    ProjectCategoryColor.Teal,
                    "Used by translation companies"
                ),
                new ProjectCategoryItem
                (
                    "Content",
                    "Content",
                    ProjectCategoryColor.Yellow,
                    "Major content updates"
                ),
                new ProjectCategoryItem
                (
                    "Experiments",
                    "Experiments",
                    ProjectCategoryColor.Green,
                    "New version to experiment with"
                )
            };
        }
    }
}
