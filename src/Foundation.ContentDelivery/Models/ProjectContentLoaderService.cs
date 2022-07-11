using EPiServer;
using EPiServer.ContentApi.Core;
using EPiServer.ContentApi.Core.Security;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.Find;
using EPiServer.Security;
using EPiServer.Web;
using EPiServer.Web.Routing;
using System.Collections.Generic;
using System.Linq;

namespace Foundation.ContentDelivery.Models
{
    public class ProjectAwareContentLoaderService : ContentLoaderService
    {
        protected readonly IProjectResolver projectResolver;
        protected readonly ProjectRepository projectRepository;
        protected readonly ContentApiContextModeResolver contextModeResolver;
        protected readonly IUrlResolver urlResolver;
        protected readonly ISecurityPrincipal principalAccessor;

        public ProjectAwareContentLoaderService(
            IContentLoader contentLoader,
            IPermanentLinkMapper permanentLinkMapper,
            IUrlResolver urlResolver,
            ContentApiContextModeResolver contextModeResolver,
            IContentProviderManager providerManager,
            IProjectResolver projectResolver,
            ProjectRepository projectRepository,
            ISecurityPrincipal principalAccessor
        ) : base(contentLoader, permanentLinkMapper, urlResolver, contextModeResolver, providerManager)
        {
            this.projectResolver = projectResolver;
            this.projectRepository = projectRepository;
            this.contextModeResolver = contextModeResolver;
            this.urlResolver = urlResolver;
            this.principalAccessor = principalAccessor;
        }

        protected IEnumerable<int> CurrentProjects => projectResolver.GetCurrentProjects();

        /// <summary>
        /// Add Support for loading within a project
        /// </summary>
        /// <param name="language">The requested language branch</param>
        /// <param name="shouldUseMasterIfFallbackNotExist">Whether or not the system should fall-back to the master</param>
        /// <returns>The LoaderOptions used to load the content</returns>
        protected override LanguageSelector CreateLoaderOptions(string language, bool shouldUseMasterIfFallbackNotExist = false)
        {
            var options = base.CreateLoaderOptions(language, shouldUseMasterIfFallbackNotExist);
            if (CurrentProjects.Count() > 0)
                options.Setup<ProjectLoaderOption>(x => x.ProjectIds = CurrentProjects);
            return options;
        }

        protected override bool ShouldContentBeExposed(IContent content)
        {
            if (base.ShouldContentBeExposed(content))
                return true;

            // At this stage we know we are most likely dealing with unpublished content,
            // (i.e. part of the project or otherwise) so we ensure that (a) we're in
            // edit/preview mode and (b) that the current user has at least edit access
            // to the content item - and thus is allowed to see this version.
            if (contextModeResolver.CurrentMode().EditOrPreview())
            {
                if (content is ISecurable securedContent)
                {
                    var descriptor = securedContent.GetSecurityDescriptor();
                    var principal = principalAccessor.GetCurrentPrincipal();
                    if (descriptor.HasAccess(principal, AccessLevel.Edit))
                        return true;
                }
            }

            return false;
        }

    }
}
