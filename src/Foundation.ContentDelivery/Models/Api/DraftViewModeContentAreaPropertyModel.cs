using EPiServer.ContentApi.Core;
using EPiServer.ContentApi.Core.Security;
using EPiServer.ContentApi.Core.Serialization;
using EPiServer.ContentApi.Core.Serialization.Models;
using EPiServer.Core;
using EPiServer.Core.Html.StringParsing;
using EPiServer.Security;
using EPiServer.ServiceLocation;
using EPiServer.SpecializedProperties;
using EPiServer.Web;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using EPiServer.Labs.BlockEnhancements.ContentDraftView;
using EPiServer.Globalization;
using EPiServer.DataAbstraction;

// Class name conflict resolution
using IContextModeResolver = EPiServer.Web.IContextModeResolver;

namespace Foundation.ContentDelivery.Models.Api
{
    public class DraftViewModeContentAreaPropertyModel : CollectionPropertyModelBase<ContentAreaItemModel, PropertyContentArea>
    {
        protected readonly IContextModeResolver _contextModeResolver;
        protected readonly IContentModelReferenceConverter _contentModelReferenceConverter;

        #region Constructors
        public DraftViewModeContentAreaPropertyModel(PropertyContentArea propertyLongString, bool excludePersonalizedContent) : base(propertyLongString, excludePersonalizedContent)
        {
            _contextModeResolver = ServiceLocator.Current.GetInstance<IContextModeResolver>();
            _contentModelReferenceConverter = ServiceLocator.Current.GetInstance<IContentModelReferenceConverter>();
        }

        public DraftViewModeContentAreaPropertyModel(PropertyContentArea propertyLongString, ConverterContext converterContext) : base(propertyLongString, converterContext)
        {
            _contextModeResolver = ServiceLocator.Current.GetInstance<IContextModeResolver>();
            _contentModelReferenceConverter = ServiceLocator.Current.GetInstance<IContentModelReferenceConverter>();
        }

        public DraftViewModeContentAreaPropertyModel(PropertyContentArea propertyLongString, bool excludePersonalizedContent, ContentLoaderService contentLoaderService, IContentModelMapper contentModelMapper, IContentAccessEvaluator accessEvaluator, ISecurityPrincipal principalAccessor)
            : base(propertyLongString, excludePersonalizedContent, contentLoaderService, contentModelMapper, accessEvaluator, principalAccessor)
        {
            _contextModeResolver = ServiceLocator.Current.GetInstance<IContextModeResolver>();
            _contentModelReferenceConverter = ServiceLocator.Current.GetInstance<IContentModelReferenceConverter>();
        }

        public DraftViewModeContentAreaPropertyModel(PropertyContentArea propertyLongString, ConverterContext converterContext, ContentLoaderService contentLoaderService, ContentConvertingService contentConvertingService, IContentAccessEvaluator accessEvaluator, ISecurityPrincipal principalAccessor)
            : base(propertyLongString, converterContext, contentLoaderService, contentConvertingService, accessEvaluator, principalAccessor)
        {
            _contextModeResolver = ServiceLocator.Current.GetInstance<IContextModeResolver>();
            _contentModelReferenceConverter = ServiceLocator.Current.GetInstance<IContentModelReferenceConverter>();
        }
        #endregion

        protected override IEnumerable<ContentAreaItemModel> GetValue()
        {
            if (_propertyLongString.Value is ContentArea contentArea)
                return FilteredItems(contentArea, _excludePersonalizedContent).Select(x => CreateItemModel(x));
            return null;
        }

        /// <summary>
        /// This method is private in the base class, so duplicated here
        /// </summary>
        /// <param name="contentArea"></param>
        /// <param name="excludePersonalizedContent"></param>
        /// <returns></returns>
        protected virtual IEnumerable<ContentAreaItem> FilteredItems(
            ContentArea contentArea,
            bool excludePersonalizedContent)
        {
            if (ConverterContext.IsContentManagementRequest)
                return contentArea.Fragments.OfType<ContentFragment>().Select(f => new ContentAreaItem(f));
            IPrincipal principal = excludePersonalizedContent ? _principalAccessor.GetAnonymousPrincipal() : _principalAccessor.GetCurrentPrincipal();
            return contentArea.Fragments.GetFilteredFragments(principal).OfType<ContentFragment>().Select(f => new ContentAreaItem(f));
        }

        protected virtual ContentAreaItemModel CreateItemModel(ContentAreaItem item)
        {
            ContentModelReference reference;
            if (TryGetLatestVersion(item, out var contentVersion, true))
                reference = _contentModelReferenceConverter.GetContentModelReference(contentVersion.ContentLink);
            else
                reference = _contentModelReferenceConverter.GetContentModelReference(item.ContentLink);

            return new ContentAreaItemModel()
            {
                ContentLink = reference,
                DisplayOption = item.RenderSettings.ContainsKey(ContentFragment.ContentDisplayOptionAttributeName) ? item.RenderSettings[ContentFragment.ContentDisplayOptionAttributeName].ToString() : "",
                //Tag = item.RenderSettings.ContainsKey(ContentFragment.)
            };
        }

        protected virtual bool TryGetLatestVersion(ContentAreaItem item, out ContentVersion contentVersion, bool nullIfPublished = true)
        {
            contentVersion = null;

            if (_contextModeResolver.CurrentMode.EditOrPreview() && ContentDraftView.IsInContentDraftViewMode)
            {
                LanguageResolver languageResolver = ServiceLocator.Current.GetInstance<LanguageResolver>();
                contentVersion = ServiceLocator.Current.GetInstance<IContentVersionRepository>().LoadCommonDraft(item.ContentLink, languageResolver.GetPreferredCulture().Name); //Language issues ahead?
                if (nullIfPublished && contentVersion.Status == VersionStatus.Published)
                    contentVersion = null;
            }

            return contentVersion != null;
        }
    }
}
