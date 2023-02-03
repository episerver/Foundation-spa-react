using EPiServer.Cms.Shell;
using EPiServer.Cms.Shell.UI.Configurations;
using EPiServer.Cms.Shell.UI.Notifications.Feature.Internal;
using EPiServer.Cms.Shell.UI.Rest.Projects;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.Framework.TypeScanner;
using EPiServer.Security;
using EPiServer.ServiceLocation;
using EPiServer.Shell;
using EPiServer.Shell.UI.Internal;
using EPiServer.Web;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.FileProviders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Foundation.ApiExplorer
{
    public class ApiExplorerModule : CmsModule
    {
        public ApiExplorerModule(string name, string routeBasePath, string resourceBasePath)
            : base(name, routeBasePath, resourceBasePath)
        {
        }

        public ApiExplorerModule(string name, string routeBasePath, string resourceBasePath, Uri uiUrl, Uri utilUrl, Func<string, string> absolutePathConverter, ITypeScannerLookup typeScannerLookup, IFileProvider vpp, IEnumerable<IContentRepositoryDescriptor> contentRepositoryDescriptors, CmsUIDefaults cmsUiDefaults, CategoryRepository categoryRepository, DisplayResolutionService displayResolutionService, ServiceAccessor<SiteDefinition> currentSiteDefinition, IFrameRepository frameRepository, IProjectService projectService, IHttpContextAccessor requestContext, IFeatureNotificationService featureNotificationService, ServiceAccessor<ExternalApplicationOptions> externalApplicationOptionsAccessor, UserGuideUrlProvider userGuideUrlProvider, IContentLanguageAccessor contentLanguageAccessor, ImageEditorOptions imageEditorOptions, IPrincipalAccessor principalAccessor, UIOptions uiOptions, HeadlessModeOptions headlessModeOptions)
            : base(name, routeBasePath, resourceBasePath, uiUrl, utilUrl, absolutePathConverter, typeScannerLookup, vpp, contentRepositoryDescriptors, cmsUiDefaults, categoryRepository, displayResolutionService, currentSiteDefinition, frameRepository, projectService, requestContext, featureNotificationService, externalApplicationOptionsAccessor, userGuideUrlProvider, contentLanguageAccessor, imageEditorOptions, principalAccessor, uiOptions, headlessModeOptions)
        {
        }
    }
}
