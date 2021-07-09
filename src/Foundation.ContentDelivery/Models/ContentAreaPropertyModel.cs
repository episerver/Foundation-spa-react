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
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using EPiServer.Labs.BlockEnhancements.ContentDraftView;
using EPiServer.Globalization;
using EPiServer.DataAbstraction;

// Class name conflict resolution
using IContextModeResolver = EPiServer.Web.IContextModeResolver;
using CoreContentAreaPropertyModel = EPiServer.ContentApi.Core.Serialization.Models.ContentAreaPropertyModel;
using Newtonsoft.Json;

namespace Foundation.ContentDelivery.Models
{
    class ContentAreaPropertyModel : CoreContentAreaPropertyModel
    {
        protected readonly IContextModeResolver _contextModeResolver;

        public ContentAreaPropertyModel(PropertyContentArea propertyContentArea, bool excludePersonalizedContent) : this(
            propertyContentArea,
            excludePersonalizedContent,
            ServiceLocator.Current.GetInstance<ContentLoaderService>(),
            ServiceLocator.Current.GetInstance<IContentModelMapper>(),
            ServiceLocator.Current.GetInstance<IContentAccessEvaluator>(),
            ServiceLocator.Current.GetInstance<ISecurityPrincipal>(),
            ServiceLocator.Current.GetInstance<IContextModeResolver>()
        ) {
        }

        public ContentAreaPropertyModel(
          PropertyContentArea propertyContentArea,
          bool excludePersonalizedContent,
          ContentLoaderService contentLoaderService,
          IContentModelMapper contentModelMapper,
          IContentAccessEvaluator accessEvaluator,
          ISecurityPrincipal principalAccessor): this(propertyContentArea, excludePersonalizedContent, contentLoaderService, contentModelMapper, accessEvaluator, principalAccessor,
            ServiceLocator.Current.GetInstance<IContextModeResolver>())
        {
        }

        public ContentAreaPropertyModel(
            PropertyContentArea propertyContentArea,
            bool excludePersonalizedContent,
            ContentLoaderService contentLoaderService,
            IContentModelMapper contentModelMapper,
            IContentAccessEvaluator accessEvaluator,
            ISecurityPrincipal principalAccessor,
            IContextModeResolver contextModeResolver)
          : base(propertyContentArea, excludePersonalizedContent, contentLoaderService, contentModelMapper, accessEvaluator, principalAccessor)
        {
            _contextModeResolver = contextModeResolver;
        }

        /*[JsonConstructor]
        internal ContentAreaPropertyModel()
        {
        }*/

        public ContentAreaPropertyModel(
          PropertyContentArea propertyContentArea,
          ConverterContext converterContext)
          : base(propertyContentArea, converterContext)
        {
            _contextModeResolver = ServiceLocator.Current.GetInstance<IContextModeResolver>();
        }

        public ContentAreaPropertyModel(
          PropertyContentArea propertyContentArea,
          ConverterContext converterContext,
          ContentLoaderService contentLoaderService,
          ContentConvertingService contentConvertingService,
          IContentAccessEvaluator accessEvaluator,
          ISecurityPrincipal principalAccessor)
          : base(propertyContentArea, converterContext, contentLoaderService, contentConvertingService, accessEvaluator, principalAccessor)
        {
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
                reference = CreateReference(item.ContentGuid, contentVersion.ContentLink);
            else
                reference = CreateReference(item.ContentGuid, item.ContentLink);

            return new ContentAreaItemModel()
            {
                ContentLink = reference,
                DisplayOption = item.RenderSettings.ContainsKey(ContentFragment.ContentDisplayOptionAttributeName) ? item.RenderSettings[ContentFragment.ContentDisplayOptionAttributeName].ToString() : "",
                //Tag = item.RenderSettings.ContainsKey(ContentFragment.)
            };
            /*
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
            };*/
        }

        protected virtual ContentModelReference CreateReference(Guid guid, ContentReference reference)
        {
            return new ContentModelReference()
            {
                GuidValue = new Guid?(guid),
                Id = new int?(reference.ID),
                WorkId = new int?(reference.WorkID),
                ProviderName = reference.ProviderName
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

        protected override IEnumerable<ContentAreaItemModel> GetValue() {
            if (!(_propertyLongString.Value is ContentArea contentArea))
                return null;
            return FilteredItems(contentArea, _excludePersonalizedContent).Select(x => CreateItemModel(x));
        }
    }
}
