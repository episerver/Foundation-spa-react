import { Taxonomy, Core, Loaders } from '@episerver/spa-core';

export default class TypeMapper extends Loaders.BaseTypeMapper {
  protected map : { [type: string]: Loaders.TypeInfo } = {
    'CookieDropBlock': {dataModel: 'CookieDropBlockData',instanceModel: 'CookieDropBlockType'},
    'LocationItemPage': {dataModel: 'LocationItemPageData',instanceModel: 'LocationItemPageType'},
    'SpaMedia': {dataModel: 'SpaMediaData',instanceModel: 'SpaMediaType'},
    'SpaFolder': {dataModel: 'SpaFolderData',instanceModel: 'SpaFolderType'},
    'CategoryRoot': {dataModel: 'CategoryRootData',instanceModel: 'CategoryRootType'},
    'PdfFile': {dataModel: 'PdfFileData',instanceModel: 'PdfFileType'},
    'YouTubeBlock': {dataModel: 'YouTubeBlockData',instanceModel: 'YouTubeBlockType'},
    'VimeoBlock': {dataModel: 'VimeoBlockData',instanceModel: 'VimeoBlockType'},
    'VideoBlock': {dataModel: 'VideoBlockData',instanceModel: 'VideoBlockType'},
    'TwitterBlock': {dataModel: 'TwitterBlockData',instanceModel: 'TwitterBlockType'},
    'TextBlock': {dataModel: 'TextBlockData',instanceModel: 'TextBlockType'},
    'TeaserBlock': {dataModel: 'TeaserBlockData',instanceModel: 'TeaserBlockType'},
    'RssReaderBlock': {dataModel: 'RssReaderBlockData',instanceModel: 'RssReaderBlockType'},
    'RecentPageCategoryRecommendationBlock': {dataModel: 'RecentPageCategoryRecommendationBlockData',instanceModel: 'RecentPageCategoryRecommendationBlockType'},
    'PageListBlock': {dataModel: 'PageListBlockData',instanceModel: 'PageListBlockType'},
    'NavigationBlock': {dataModel: 'NavigationBlockData',instanceModel: 'NavigationBlockType'},
    'MenuItemBlock': {dataModel: 'MenuItemBlockData',instanceModel: 'MenuItemBlockType'},
    'LinkedInCompanyBlock': {dataModel: 'LinkedInCompanyBlockData',instanceModel: 'LinkedInCompanyBlockType'},
    'LocationListPage': {dataModel: 'LocationListPageData',instanceModel: 'LocationListPageType'},
    'HeroBlock': {dataModel: 'HeroBlockData',instanceModel: 'HeroBlockType'},
    'BlogItemPage': {dataModel: 'BlogItemPageData',instanceModel: 'BlogItemPageType'},
    'BookmarksPage': {dataModel: 'BookmarksPageData',instanceModel: 'BookmarksPageType'},
    'StandardCategory': {dataModel: 'StandardCategoryData',instanceModel: 'StandardCategoryType'},
    'VideoFile': {dataModel: 'VideoFileData',instanceModel: 'VideoFileType'},
    'StandardFile': {dataModel: 'StandardFileData',instanceModel: 'StandardFileType'},
    'ImageMediaData': {dataModel: 'ImageMediaDataData',instanceModel: 'ImageMediaDataType'},
    'FoundationPdfFile': {dataModel: 'FoundationPdfFileData',instanceModel: 'FoundationPdfFileType'},
    'TwoColumnLandingPage': {dataModel: 'TwoColumnLandingPageData',instanceModel: 'TwoColumnLandingPageType'},
    'ThreeColumnLandingPage': {dataModel: 'ThreeColumnLandingPageData',instanceModel: 'ThreeColumnLandingPageType'},
    'TagPage': {dataModel: 'TagPageData',instanceModel: 'TagPageType'},
    'StandardPage': {dataModel: 'StandardPageData',instanceModel: 'StandardPageType'},
    'SearchResultPage': {dataModel: 'SearchResultPageData',instanceModel: 'SearchResultPageType'},
    'ResetPasswordPage': {dataModel: 'ResetPasswordPageData',instanceModel: 'ResetPasswordPageType'},
    'ResetPasswordMailPage': {dataModel: 'ResetPasswordMailPageData',instanceModel: 'ResetPasswordMailPageType'},
    'ProfilePage': {dataModel: 'ProfilePageData',instanceModel: 'ProfilePageType'},
    'LandingPage': {dataModel: 'LandingPageData',instanceModel: 'LandingPageType'},
    'FolderPage': {dataModel: 'FolderPageData',instanceModel: 'FolderPageType'},
    'CmsHomePage': {dataModel: 'CmsHomePageData',instanceModel: 'CmsHomePageType'},
    'CalendarEventPage': {dataModel: 'CalendarEventPageData',instanceModel: 'CalendarEventPageType'},
    'BlogListPage': {dataModel: 'BlogListPageData',instanceModel: 'BlogListPageType'},
    'GoogleMapsEmbedBlock': {dataModel: 'GoogleMapsEmbedBlockData',instanceModel: 'GoogleMapsEmbedBlockType'},
    'HeroBlockCallout': {dataModel: 'HeroBlockCalloutData',instanceModel: 'HeroBlockCalloutType'},
    'ContainerBlock': {dataModel: 'ContainerBlockData',instanceModel: 'ContainerBlockType'},
    'CustomViewConfigurationBlock': {dataModel: 'CustomViewConfigurationBlockData',instanceModel: 'CustomViewConfigurationBlockType'},
    'FacebookBlock': {dataModel: 'FacebookBlockData',instanceModel: 'FacebookBlockType'},
    'ContentRecommendationsBlock': {dataModel: 'ContentRecommendationsBlockData',instanceModel: 'ContentRecommendationsBlockType'},
    'CustomizedSearchSettings': {dataModel: 'CustomizedSearchSettingsData',instanceModel: 'CustomizedSearchSettingsType'},
    'FilterActivitiesBlock': {dataModel: 'FilterActivitiesBlockData',instanceModel: 'FilterActivitiesBlockType'},
    'FilterContinentsBlock': {dataModel: 'FilterContinentsBlockData',instanceModel: 'FilterContinentsBlockType'},
    'FilterDistancesBlock': {dataModel: 'FilterDistancesBlockData',instanceModel: 'FilterDistancesBlockType'},
    'FilterTemperaturesBlock': {dataModel: 'FilterTemperaturesBlockData',instanceModel: 'FilterTemperaturesBlockType'},
    'ExistsFilterBlock': {dataModel: 'ExistsFilterBlockData',instanceModel: 'ExistsFilterBlockType'},
    'CustomizedSearchBlock': {dataModel: 'CustomizedSearchBlockData',instanceModel: 'CustomizedSearchBlockType'},
    'StringFilterBlock': {dataModel: 'StringFilterBlockData',instanceModel: 'StringFilterBlockType'},
    'BreadcrumbBlock': {dataModel: 'BreadcrumbBlockData',instanceModel: 'BreadcrumbBlockType'},
    'ButtonBlock': {dataModel: 'ButtonBlockData',instanceModel: 'ButtonBlockType'},
    'CalendarBlock': {dataModel: 'CalendarBlockData',instanceModel: 'CalendarBlockType'},
    'CustomizedSearchAdvancedSettings': {dataModel: 'CustomizedSearchAdvancedSettingsData',instanceModel: 'CustomizedSearchAdvancedSettingsType'},
    'NumericFilterBlock': {dataModel: 'NumericFilterBlockData',instanceModel: 'NumericFilterBlockType'},
    'CallToActionBlock': {dataModel: 'CallToActionBlockData',instanceModel: 'CallToActionBlockType'},
    'CarouselBlock': {dataModel: 'CarouselBlockData',instanceModel: 'CarouselBlockType'},
    'BlogCommentBlock': {dataModel: 'BlogCommentBlockData',instanceModel: 'BlogCommentBlockType'},
    'TextboxElementBlock': {dataModel: 'TextboxElementBlockData',instanceModel: 'TextboxElementBlockType'},
    'TextareaElementBlock': {dataModel: 'TextareaElementBlockData',instanceModel: 'TextareaElementBlockType'},
    'NumberElementBlock': {dataModel: 'NumberElementBlockData',instanceModel: 'NumberElementBlockType'},
    'DateTimeElementBlock': {dataModel: 'DateTimeElementBlockData',instanceModel: 'DateTimeElementBlockType'},
    'AddressesElementBlock': {dataModel: 'AddressesElementBlockData',instanceModel: 'AddressesElementBlockType'},
    'DateTimeRangeElementBlock': {dataModel: 'DateTimeRangeElementBlockData',instanceModel: 'DateTimeRangeElementBlockType'},
    'RangeElementBlock': {dataModel: 'RangeElementBlockData',instanceModel: 'RangeElementBlockType'},
    'UrlElementBlock': {dataModel: 'UrlElementBlockData',instanceModel: 'UrlElementBlockType'},
    'SelectionElementBlock': {dataModel: 'SelectionElementBlockData',instanceModel: 'SelectionElementBlockType'},
    'ChoiceElementBlock': {dataModel: 'ChoiceElementBlockData',instanceModel: 'ChoiceElementBlockType'},
    'ImageChoiceElementBlock': {dataModel: 'ImageChoiceElementBlockData',instanceModel: 'ImageChoiceElementBlockType'},
    'FileUploadElementBlock': {dataModel: 'FileUploadElementBlockData',instanceModel: 'FileUploadElementBlockType'},
    'PredefinedHiddenElementBlock': {dataModel: 'PredefinedHiddenElementBlockData',instanceModel: 'PredefinedHiddenElementBlockType'},
    'VisitorDataHiddenElementBlock': {dataModel: 'VisitorDataHiddenElementBlockData',instanceModel: 'VisitorDataHiddenElementBlockType'},
    'CaptchaElementBlock': {dataModel: 'CaptchaElementBlockData',instanceModel: 'CaptchaElementBlockType'},
    'RecaptchaElementBlock': {dataModel: 'RecaptchaElementBlockData',instanceModel: 'RecaptchaElementBlockType'},
    'ParagraphTextElementBlock': {dataModel: 'ParagraphTextElementBlockData',instanceModel: 'ParagraphTextElementBlockType'},
    'FormStepBlock': {dataModel: 'FormStepBlockData',instanceModel: 'FormStepBlockType'},
    'SubmitButtonElementBlock': {dataModel: 'SubmitButtonElementBlockData',instanceModel: 'SubmitButtonElementBlockType'},
    'ResetButtonElementBlock': {dataModel: 'ResetButtonElementBlockData',instanceModel: 'ResetButtonElementBlockType'},
    'FormContainerBlock': {dataModel: 'FormContainerBlockData',instanceModel: 'FormContainerBlockType'},
    'SysRoot': {dataModel: 'SysRootData',instanceModel: 'SysRootType'},
    'SysRecycleBin': {dataModel: 'SysRecycleBinData',instanceModel: 'SysRecycleBinType'},
    'SysContentFolder': {dataModel: 'SysContentFolderData',instanceModel: 'SysContentFolderType'},
    'SysContentAssetFolder': {dataModel: 'SysContentAssetFolderData',instanceModel: 'SysContentAssetFolderType'},
  }
  protected async doLoadType(typeInfo: Loaders.TypeInfo) : Promise<Taxonomy.IContentType> {
    return import(
    /* webpackInclude: /\.ts$/ */
    /* webpackExclude: /\.noimport\.ts$/ */
    /* webpackChunkName: "types" */
    /* webpackMode: "lazy-once" */
    /* webpackPrefetch: true */
    /* webpackPreload: false */
    "./" + typeInfo.dataModel).then(exports => {
      return exports[typeInfo.instanceModel];
    }).catch(reason => {
      if (Core.DefaultContext.isDebugActive()) {
        console.error(`Error while importing ${typeInfo.instanceModel} from ${typeInfo.dataModel} due to:`, reason);
      }
      return null;
    });
  }
}
