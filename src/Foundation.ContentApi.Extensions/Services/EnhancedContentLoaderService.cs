using EPiServer.ContentApi.Core.Configuration;
using EPiServer.Web;
using Microsoft.AspNetCore.Http;
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
        protected readonly IContentLoader contentLoader;
        protected readonly ContentApiOptions contentApiOptions;
        protected readonly IHttpContextAccessor httpContextAccessor;
        protected readonly IContentVersionRepository contentVersionRepository;

        public EnhancedContentLoaderService(
              IContentLoader contentLoader,
              IPermanentLinkMapper permanentLinkMapper,
              IContentProviderManager providerManager,
              WebContextModeResolver contextModeResolver,
              ContentApiOptions contentApiOptions,
              IHttpContextAccessor httpContextAccessor,
              IContentVersionRepository contentVersionRepository,
              IPublishedStateAssessor publishedStateAssessor
        ) : base(contentLoader, permanentLinkMapper, providerManager, publishedStateAssessor)
        {
            this.contextModeResolver = contextModeResolver;
            this.contentLoader = contentLoader;
            this.contentApiOptions = contentApiOptions;
            this.httpContextAccessor = httpContextAccessor;
            this.contentVersionRepository = contentVersionRepository;
        }

        public override IContent? Get(Guid guid, string language, bool fallbackToMaster)
        {
            if (!contextModeResolver.CurrentMode.EditOrPreview())
                return base.Get(guid, language, fallbackToMaster);

            if (guid == Guid.Empty) return default;
            var loaderOptions = CreateLoaderOptions(language, fallbackToMaster);
            var content = SelectVersion(contentLoader.Get<IContent>(guid, loaderOptions), loaderOptions);
            if (content is null || !ShouldContentBeExposed(content)) return default;
            return content;
        }

        public override IContent? Get(
            ContentReference contentReference,
            string language,
            bool fallbackToMaster = false)
        {
            // Return the base value if we're not in edit or preview mode, return default if there's no ContentReference
            if (!contextModeResolver.CurrentMode.EditOrPreview())
                return base.Get(contentReference, language, fallbackToMaster);

            if (ContentReference.IsNullOrEmpty(contentReference)) return default;

            var loaderOptions = CreateLoaderOptions(language, fallbackToMaster);
            var content = SelectVersion(contentLoader.Get<IContent>(contentReference, loaderOptions), loaderOptions);
            if (content is null || !ShouldContentBeExposed(content)) return default;
            return content;
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
            return options;
        }

        protected virtual IContent? SelectVersion(IContent? content, LanguageSelector loaderOptions)
        {
            // Only continue if we have content and we're in edit or preview mode, if not just return the content
            if (content is null || !contextModeResolver.CurrentMode.EditOrPreview())
                return content;

            // If the content is versionable, not the root page and no version has yet been selected, select the Common Draft version
            if (content is IVersionable && content.ContentLink != ContentReference.RootPage && (content.ContentLink.GetPublishedOrLatest || content.ContentLink.WorkID == 0))
            {
                var language = (content is ILocalizable localizable ? localizable.Language : loaderOptions.Language).TwoLetterISOLanguageName;
                var contentVersion = contentVersionRepository.LoadCommonDraft(content.ContentLink, language);
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
