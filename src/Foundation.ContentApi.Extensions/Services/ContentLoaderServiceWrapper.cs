using EPiServer;
using EPiServer.ContentApi.Core.Internal;
using EPiServer.Core;
using EPiServer.Security;
using EPiServer.ServiceLocation;
using EPiServer.Web;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using CoreContentLoaderService = EPiServer.ContentApi.Core.Internal.ContentLoaderService;

namespace Foundation.ContentApi.Extensions.Services
{
    /// <summary>
    /// Provide an updated ContentLoader service which:
    /// - Offloads the GetChildren methods to the original - base implementation, so it works with both CMS & Commerce - but keep in mind that the children call won't
    ///   be affected by the enhanced logic in this class
    /// - Makes sure the Common Draft version is loaded when the ContextMode is either Edit or Preview - when the WorkID isn't specified by or inferred from the request
    /// - Makes sure draft versions will be exposed through the ContentDelivery API to authenticated users with appropriate rights
    /// - Makes sure that the currently selected project will affect the version loaded
    /// </summary>
    public class ContentLoaderServiceWrapper : CoreContentLoaderService
    {
        protected readonly CoreContentLoaderService baseLoaderService;
        protected readonly UniversalContextModeResolver contextModeResolver;
        protected readonly IProjectResolver projectResolver;
        protected readonly IHttpContextAccessor httpContextAccessor;
        protected readonly IContentLoader contentLoader;

        protected virtual IEnumerable<int> CurrentProjects => projectResolver.GetCurrentProjects();

        public ContentLoaderServiceWrapper(
              IContentLoader contentLoader,
              IPermanentLinkMapper permanentLinkMapper,
              IContentProviderManager providerManager,
              UniversalContextModeResolver contextModeResolver,
              IProjectResolver projectResolver,
              IHttpContextAccessor httpContextAccessor,
              CoreContentLoaderService baseLoaderService
        ) : base(contentLoader, permanentLinkMapper, providerManager)
        {
            this.baseLoaderService = baseLoaderService;
            this.contextModeResolver = contextModeResolver;
            this.projectResolver = projectResolver;
            this.httpContextAccessor = httpContextAccessor;
            this.contentLoader = contentLoader;
        }

        public override IContent? Get(Guid guid, string language, bool fallbackToMaster)
        {
            if (guid == Guid.Empty)
                return null;
            LanguageSelector loaderOptions = CreateLoaderOptions(language, fallbackToMaster);
            var content = SelectVersion(contentLoader.Get<IContent>(guid, loaderOptions), loaderOptions);
            return content is null || !ShouldContentBeExposed(content) ? null : content;
        }

        public override IContent? Get(
            ContentReference contentReference,
            string language,
            bool fallbackToMaster = false)
        {
            if (ContentReference.IsNullOrEmpty(contentReference))
                return null;
            LanguageSelector loaderOptions = CreateLoaderOptions(language, fallbackToMaster);
            var content = SelectVersion(contentLoader.Get<IContent>(contentReference, loaderOptions), loaderOptions);
            return content is null || !ShouldContentBeExposed(content) ? null : content;
        }

        public override IEnumerable<IContent> GetChildren(ContentReference contentReference, string language)
        {
            return baseLoaderService.GetChildren(contentReference, language);
        }

        public override ContentDeliveryQueryRange<IContent> GetChildren(
            ContentReference contentReference,
            string language,
            PagingToken token,
            Func<IContent, bool>? predicate = null)
        {
            if (predicate == null) predicate = ShouldContentBeExposed;
            return baseLoaderService.GetChildren(contentReference, language, token, predicate);
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
            if (CurrentProjects.Count() > 0)
                options.Setup<ProjectLoaderOption>(x => x.ProjectIds = CurrentProjects);
            return options;
        }

        protected virtual IContent? SelectVersion(IContent content, LanguageSelector loaderOptions)
        {
            // Only continue if we have content and we're in edit or preview mode, if not just return the content
            if (content == null || !contextModeResolver.CurrentMode.EditOrPreview())
                return content;

            // If the content is versionable, not the root page and no version has yet been selected, select the Common Draft version
            if (content is IVersionable && content.ContentLink != ContentReference.RootPage && (content.ContentLink.GetPublishedOrLatest || content.ContentLink.WorkID == 0))
            {
                var repo = ServiceLocator.Current.GetInstance<IContentVersionRepository>();
                var language = (content is ILocalizable localizable ? localizable.Language : loaderOptions.Language).TwoLetterISOLanguageName;
                var contentVersion = repo.LoadCommonDraft(content.ContentLink, language);
                content = contentLoader.Get<IContent>(contentVersion.ContentLink, loaderOptions);
            }

            // Return the content
            return content;

        }

        protected override bool ShouldContentBeExposed(IContent content)
        {
            // If the base says "okay", we're not going to argue
            if (base.ShouldContentBeExposed(content))
                return true;

            // At this stage we know we are most likely dealing with unpublished content,
            // (i.e. part of the project or otherwise) so we ensure that (a) we're in
            // edit/preview mode and (b) that the current user has at least edit access
            // to the content item - and thus is allowed to see this version.
            if (contextModeResolver.CurrentMode.EditOrPreview())
            {
                if (content is ISecurable securedContent)
                {
                    var descriptor = securedContent.GetSecurityDescriptor();
                    if (descriptor.HasAccess(PrincipalAccessor.Current, AccessLevel.Edit))
                        return true;
                }
            }

            return false;
        }
    }
}
