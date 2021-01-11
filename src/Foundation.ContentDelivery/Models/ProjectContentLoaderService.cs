using EPiServer;
using EPiServer.ContentApi.Core;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.Find;
using EPiServer.ServiceLocation;
using EPiServer.Web;
using EPiServer.Web.Routing;
using System.Collections.Generic;
using System.Linq;

namespace Foundation.ContentDelivery.Models
{
    public class ProjectAwareContentLoaderService : ContentLoaderService
    {
        protected readonly IProjectResolver projectResolver;
        protected readonly EPiServer.Web.IContextModeResolver contextModeResolver;

        public ProjectAwareContentLoaderService(
            IContentLoader contentLoader,
            EPiServer.Web.IPermanentLinkMapper permanentLinkMapper,
            IUrlResolver urlResolver,
            EPiServer.ContentApi.Core.IContextModeResolver contextModeResolver,
            IContentProviderManager providerManager,
            IProjectResolver projectResolver,
            EPiServer.Web.IContextModeResolver coreContextModeResolver
        ) : base(contentLoader, permanentLinkMapper, urlResolver, contextModeResolver, providerManager) 
        {
            this.projectResolver = projectResolver;
            this.contextModeResolver = coreContextModeResolver;
        }

        /// <summary>
        /// Add Support for loading within a project
        /// </summary>
        /// <param name="language">The requested language branch</param>
        /// <param name="shouldUseMasterIfFallbackNotExist">Whether or not the system should fall-back to the master</param>
        /// <returns>The LoaderOptions used to load the content</returns>
        protected override LanguageSelector CreateLoaderOptions(string language, bool shouldUseMasterIfFallbackNotExist = false)
        {
            var options = base.CreateLoaderOptions(language, shouldUseMasterIfFallbackNotExist);
            IEnumerable<int> currentProjects = projectResolver.GetCurrentProjects();
            if (currentProjects.Count() > 0)
                options.Setup<ProjectLoaderOption>(x => x.ProjectIds = currentProjects);
            return options;
        }

        protected override bool ShouldContentBeExposed(IContent content)
        {
            if (contextModeResolver.CurrentMode.EditOrPreview())
                return true;

            IEnumerable<int> currentProjects = projectResolver.GetCurrentProjects();
            if (currentProjects.Count() > 0)
            {
                var projectItems = ServiceLocator.Current.GetInstance<ProjectRepository>().GetItems(new ContentReference[] { content.ContentLink });
                if (projectItems.Any(pi => currentProjects.Contains(pi.ProjectID)))
                    return true;
            }

            return base.ShouldContentBeExposed(content);
        }
    }
}
