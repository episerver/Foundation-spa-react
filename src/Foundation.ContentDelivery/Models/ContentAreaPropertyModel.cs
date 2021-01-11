using EPiServer.ContentApi.Core;
using EPiServer.ContentApi.Core.Security;
using EPiServer.ContentApi.Core.Serialization;
using EPiServer.ContentApi.Core.Serialization.Models;
using EPiServer.Core;
using EPiServer.Core.Html.StringParsing;
using EPiServer.Editor;
using EPiServer.Security;
using EPiServer.ServiceLocation;
using EPiServer.SpecializedProperties;
using EPiServer.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using IContextModeResolver = EPiServer.Web.IContextModeResolver;
using EPiServer.Labs.BlockEnhancements.ContentDraftView;
using EPiServer.Globalization;
using EPiServer.DataAbstraction;

namespace Foundation.ContentDelivery.Models
{
    class ContentAreaPropertyModel : CollectionPropertyModelBase<ContentAreaItemModel, PropertyContentArea>
    {
        protected readonly IContextModeResolver _contextModeResolver;

        public ContentAreaPropertyModel(
            PropertyContentArea propertyContentArea,
            bool excludePersonalizedContent
        ) : this(
            propertyContentArea, 
            excludePersonalizedContent, 
            ServiceLocator.Current.GetInstance<ContentLoaderService>(), 
            ServiceLocator.Current.GetInstance<IContentModelMapper>(), 
            ServiceLocator.Current.GetInstance<IContentAccessEvaluator>(), 
            ServiceLocator.Current.GetInstance<ISecurityPrincipal>(),
            ServiceLocator.Current.GetInstance<IContextModeResolver>()
        ) { }

        public ContentAreaPropertyModel(
            PropertyContentArea propertyContentArea,
            bool excludePersonalizedContent,
            ContentLoaderService contentLoaderService,
            IContentModelMapper contentModelMapper,
            IContentAccessEvaluator accessEvaluator,
            ISecurityPrincipal principalAccessor,
            IContextModeResolver contextModeResolver
        ) : base(
            propertyContentArea,
            excludePersonalizedContent,
            contentLoaderService,
            contentModelMapper,
            accessEvaluator,
            principalAccessor
        ) {
            _contextModeResolver = contextModeResolver;
        }

        public ContentAreaPropertyModel(
            PropertyContentArea propertyContentArea,
            ConverterContext converterContext
        ) : base(propertyContentArea, converterContext)
        {
            _contextModeResolver = ServiceLocator.Current.GetInstance<IContextModeResolver>();
        }

        public ContentAreaPropertyModel(
            PropertyContentArea propertyContentArea,
            ConverterContext converterContext,
            ContentLoaderService contentLoaderService,
            ContentConvertingService contentConvertingService,
            IContentAccessEvaluator accessEvaluator,
            ISecurityPrincipal principalAccessor,
            IContextModeResolver contextModeResolver
        ) : base(
            propertyContentArea,
            converterContext,
            contentLoaderService,
            contentConvertingService,
            accessEvaluator,
            principalAccessor
        ) {
            _contextModeResolver = contextModeResolver;
        }

        protected virtual IEnumerable<ContentAreaItem> FilteredItems(
            ContentArea contentArea,
            bool excludePersonalizedContent)
        {
            IPrincipal principal = excludePersonalizedContent ? _principalAccessor.GetAnonymousPrincipal() : _principalAccessor.GetCurrentPrincipal();
            return contentArea.Fragments.GetFilteredFragments(principal).OfType<ContentFragment>().Select(f => new ContentAreaItem(f));
        }

        protected virtual ContentAreaItemModel CreateItemModel(ContentAreaItem item)
        {
            ContentVersion contentVersion = null;
            if (_contextModeResolver.CurrentMode.EditOrPreview() && ContentDraftView.IsInContentDraftViewMode)
            {
                contentVersion = GetLatestVersion(item, true);
            }
            return new ContentAreaItemModel()
            {
                ContentLink = new ContentModelReference()
                {
                    GuidValue = new Guid?(item.ContentGuid),
                    Id = new int?(contentVersion != null ? contentVersion.ContentLink.ID : item.ContentLink.ID),
                    WorkId = new int?(contentVersion != null ? contentVersion.ContentLink.WorkID : item.ContentLink.WorkID),
                    ProviderName = contentVersion != null ? contentVersion.ContentLink.ProviderName : item.ContentLink.ProviderName
                },
                DisplayOption = item.RenderSettings.ContainsKey(ContentFragment.ContentDisplayOptionAttributeName) ? item.RenderSettings[ContentFragment.ContentDisplayOptionAttributeName].ToString() : ""
            };
        }

        protected virtual ContentVersion GetLatestVersion(ContentAreaItem item, bool nullIfPublished = true)
        {
            LanguageResolver languageResolver = ServiceLocator.Current.GetInstance<LanguageResolver>();
            var contentVersion = ServiceLocator.Current.GetInstance<IContentVersionRepository>().LoadCommonDraft(item.ContentLink, languageResolver.GetPreferredCulture().Name); //Language issues ahead?
            return nullIfPublished && contentVersion.Status == VersionStatus.Published ? null : contentVersion;
        }

        /// <inheritdoc />
        protected override IEnumerable<ContentAreaItemModel> GetValue() => !(_propertyLongString.Value is ContentArea contentArea) ? null : FilteredItems(contentArea, _excludePersonalizedContent).Select(x => CreateItemModel(x));
    }
}
