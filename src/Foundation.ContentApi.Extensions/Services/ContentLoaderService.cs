using EPiServer;
using EPiServer.ContentApi.Core.Configuration;
using EPiServer.Core;
using EPiServer.Security;
using EPiServer.ServiceLocation;
using EPiServer.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using CoreContentLoaderService = EPiServer.ContentApi.Core.Internal.ContentLoaderService;


namespace Foundation.ContentApi.Extensions.Services
{
    public class ContentLoaderService : CoreContentLoaderService
    {
        protected readonly UniversalContextModeResolver contextModeResolver;
        protected readonly IProjectResolver projectResolver;
        protected readonly IContentLoader contentLoader;
        protected readonly ApiPrincipalAccessor principalAccessor;
        protected readonly ContentApiOptions contentApiOptions;

        protected virtual IEnumerable<int> CurrentProjects => projectResolver.GetCurrentProjects();

        public ContentLoaderService(
              IContentLoader contentLoader,
              IPermanentLinkMapper permanentLinkMapper,
              IContentProviderManager providerManager,
              UniversalContextModeResolver contextModeResolver,
              IProjectResolver projectResolver,
              ApiPrincipalAccessor principalAccessor,
              ContentApiOptions contentApiOptions
        ) : base(contentLoader, permanentLinkMapper, providerManager)
        {
            this.contextModeResolver = contextModeResolver;
            this.projectResolver = projectResolver;
            this.contentLoader = contentLoader;
            this.principalAccessor = principalAccessor;
            this.contentApiOptions = contentApiOptions;
        }

        public override IContent? Get(Guid guid, string language, bool fallbackToMaster)
        {
            if (guid == Guid.Empty)
                return null;
            LanguageSelector loaderOptions = CreateLoaderOptions(language, fallbackToMaster);
            var content = SelectVersion(contentLoader.Get<IContent>(guid, loaderOptions), loaderOptions);
            if (content is not null && ShouldContentBeExposed(content))
                return content;
            return null;
        }

        public override IContent? Get(
            ContentReference contentReference,
            string language,
            bool fallbackToMaster = false)
        {
            if (ContentReference.IsNullOrEmpty(contentReference))
                return null;
            LanguageSelector loaderOptions = CreateLoaderOptions(language, fallbackToMaster);
            if (contentLoader.TryGet<IContent>(contentReference, loaderOptions, out var content))
            {
                var contentVersion = SelectVersion(content, loaderOptions);
                return contentVersion is not null && ShouldContentBeExposed(contentVersion) ? contentVersion : null;
            }
            return null;
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
            if (CurrentProjects.Any())
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

            // Only continue with the checks if previewMode is enabled by
            // the configuration.
            if (!contentApiOptions.EnablePreviewMode)
                return false;

            // If the default logic said "no", we're going to perform a few
            // additional checks to allow access to unpublished content for
            // authorized users only. Using the following rules:
            // - If WorkID > 0, the current user must have at least "Edit" rights
            // - If WorkID = 0, the current user must have at least "Read" rights
            var principal = principalAccessor.Principal;
            if (principal?.Identity?.IsAuthenticated == true && content is ISecurable securedContent)
            {
                var descriptor = securedContent.GetSecurityDescriptor();
                if (content.ContentLink.WorkID > 0 && descriptor.HasAccess(principal, AccessLevel.Edit))
                    return true;
                if (content.ContentLink.WorkID == 0 && descriptor.HasAccess(principal, AccessLevel.Read))
                    return true;
            }

            return false;
        }
    }
}
