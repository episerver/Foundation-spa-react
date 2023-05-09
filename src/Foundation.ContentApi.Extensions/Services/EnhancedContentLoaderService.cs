using EPiServer.Cms.Shell;
using EPiServer.ContentApi.Core.Configuration;
using EPiServer.ContentApi.Core.Internal;
using EPiServer.Core;
using EPiServer.Security;
using EPiServer.Web;
using Microsoft.AspNetCore.Http;
using System.Globalization;
using BaseContentLoaderService = EPiServer.ContentApi.Core.Internal.ContentLoaderService;
using WebContextModeResolver = EPiServer.Web.IContextModeResolver;

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
    public class EnhancedContentLoaderService : BaseContentLoaderService
    {
        protected readonly WebContextModeResolver contextModeResolver;
        protected readonly IProjectResolver projectResolver;
        protected readonly IContentLoader contentLoader;
        protected readonly ContentApiOptions contentApiOptions;

        public EnhancedContentLoaderService(
              IContentLoader contentLoader,
              IPermanentLinkMapper permanentLinkMapper,
              IContentProviderManager providerManager,
              WebContextModeResolver contextModeResolver,
              IProjectResolver projectResolver,
              ContentApiOptions contentApiOptions
        ) : base(contentLoader, permanentLinkMapper, providerManager)
        {
            this.contextModeResolver = contextModeResolver;
            this.projectResolver = projectResolver;
            this.contentLoader = contentLoader;
            this.contentApiOptions = contentApiOptions;
        }

        public override IContent? Get(Guid guid, string language, bool fallbackToMaster)
        {
            if (!contextModeResolver.CurrentMode.EditOrPreview())
                return base.Get(guid, language, fallbackToMaster);

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
            if (!contextModeResolver.CurrentMode.EditOrPreview())
                return base.Get(contentReference, language, fallbackToMaster);

            if (ContentReference.IsNullOrEmpty(contentReference))
                return null;
            var loaderOptions = CreateLoaderOptions(language, fallbackToMaster);
            var content = SelectVersion(contentLoader.Get<IContent>(contentReference, loaderOptions), loaderOptions);
            return content is null || !ShouldContentBeExposed(content) ? null : content;
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
            if (!contextModeResolver.CurrentMode.EditOrPreview())
                return options;

            var currentProjects = projectResolver.GetCurrentProjects();
            if (currentProjects.Any())
                options.Setup<ProjectLoaderOption>(x => x.ProjectIds = currentProjects);
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
            // Use the default checks for publised & not expired
            if (base.ShouldContentBeExposed(content))
                return true;

            // Allow any content item to be exposed if preview mode is enabled and the current request is Edit or Preview
            return contentApiOptions.EnablePreviewMode && contextModeResolver.CurrentMode.EditOrPreview();
        }
    }
}
