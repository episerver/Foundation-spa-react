import { IContentType } from 'Episerver/Models/IContent';
import EpiserverSpaContext from 'Episerver/Spa';
import BaseTypeMapper, { TypeMapperTypeInfo } from 'Episerver/Loaders/BaseTypeMapper'
;
export default class TypeMapper extends BaseTypeMapper {
  protected map : { [type: string]: TypeMapperTypeInfo } = {
    'CookieDropBlock': {dataModel: 'CookieDropBlockData',instanceModel: 'CookieDropBlockType'},
    'BlogItemPage': {dataModel: 'BlogItemPageData',instanceModel: 'BlogItemPageType'},
    'LocationListPage': {dataModel: 'LocationListPageData',instanceModel: 'LocationListPageType'},
    'LocationItemPage': {dataModel: 'LocationItemPageData',instanceModel: 'LocationItemPageType'},
    'CategoryRoot': {dataModel: 'CategoryRootData',instanceModel: 'CategoryRootType'},
    'VirtualTemplateRoot': {dataModel: 'VirtualTemplateRootData',instanceModel: 'VirtualTemplateRootType'},
    'VirtualTemplateContent': {dataModel: 'VirtualTemplateContentData',instanceModel: 'VirtualTemplateContentType'},
    'ContentRecommendationsBlock': {dataModel: 'ContentRecommendationsBlockData',instanceModel: 'ContentRecommendationsBlockType'},
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
    'BlogListPage': {dataModel: 'BlogListPageData',instanceModel: 'BlogListPageType'},
    'MenuItemBlock': {dataModel: 'MenuItemBlockData',instanceModel: 'MenuItemBlockType'},
    'BookmarksPage': {dataModel: 'BookmarksPageData',instanceModel: 'BookmarksPageType'},
    'CmsHomePage': {dataModel: 'CmsHomePageData',instanceModel: 'CmsHomePageType'},
    'CustomViewConfigurationBlock': {dataModel: 'CustomViewConfigurationBlockData',instanceModel: 'CustomViewConfigurationBlockType'},
    'PdfFile': {dataModel: 'PdfFileData',instanceModel: 'PdfFileType'},
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
    'CalendarEventPage': {dataModel: 'CalendarEventPageData',instanceModel: 'CalendarEventPageType'},
    'HeroBlock': {dataModel: 'HeroBlockData',instanceModel: 'HeroBlockType'},
    'LinkedInCompanyBlock': {dataModel: 'LinkedInCompanyBlockData',instanceModel: 'LinkedInCompanyBlockType'},
    'GoogleMapsEmbedBlock': {dataModel: 'GoogleMapsEmbedBlockData',instanceModel: 'GoogleMapsEmbedBlockType'},
    'HeroBlockCallout': {dataModel: 'HeroBlockCalloutData',instanceModel: 'HeroBlockCalloutType'},
    'CustomizedSearchAdvancedSettings': {dataModel: 'CustomizedSearchAdvancedSettingsData',instanceModel: 'CustomizedSearchAdvancedSettingsType'},
    'CustomizedSearchSettings': {dataModel: 'CustomizedSearchSettingsData',instanceModel: 'CustomizedSearchSettingsType'},
    'CustomizedSearchBlock': {dataModel: 'CustomizedSearchBlockData',instanceModel: 'CustomizedSearchBlockType'},
    'FilterActivitiesBlock': {dataModel: 'FilterActivitiesBlockData',instanceModel: 'FilterActivitiesBlockType'},
    'FilterContinentsBlock': {dataModel: 'FilterContinentsBlockData',instanceModel: 'FilterContinentsBlockType'},
    'FilterDistancesBlock': {dataModel: 'FilterDistancesBlockData',instanceModel: 'FilterDistancesBlockType'},
    'ExistsFilterBlock': {dataModel: 'ExistsFilterBlockData',instanceModel: 'ExistsFilterBlockType'},
    'NumericFilterBlock': {dataModel: 'NumericFilterBlockData',instanceModel: 'NumericFilterBlockType'},
    'FilterTemperaturesBlock': {dataModel: 'FilterTemperaturesBlockData',instanceModel: 'FilterTemperaturesBlockType'},
    'BreadcrumbBlock': {dataModel: 'BreadcrumbBlockData',instanceModel: 'BreadcrumbBlockType'},
    'ButtonBlock': {dataModel: 'ButtonBlockData',instanceModel: 'ButtonBlockType'},
    'CalendarBlock': {dataModel: 'CalendarBlockData',instanceModel: 'CalendarBlockType'},
    'CallToActionBlock': {dataModel: 'CallToActionBlockData',instanceModel: 'CallToActionBlockType'},
    'CarouselBlock': {dataModel: 'CarouselBlockData',instanceModel: 'CarouselBlockType'},
    'ContainerBlock': {dataModel: 'ContainerBlockData',instanceModel: 'ContainerBlockType'},
    'FacebookBlock': {dataModel: 'FacebookBlockData',instanceModel: 'FacebookBlockType'},
    'StringFilterBlock': {dataModel: 'StringFilterBlockData',instanceModel: 'StringFilterBlockType'},
    'BlogCommentBlock': {dataModel: 'BlogCommentBlockData',instanceModel: 'BlogCommentBlockType'},
    'TextboxElementBlock': {dataModel: 'TextboxElementBlockData',instanceModel: 'TextboxElementBlockType'},
    'TextareaElementBlock': {dataModel: 'TextareaElementBlockData',instanceModel: 'TextareaElementBlockType'},
    'NumberElementBlock': {dataModel: 'NumberElementBlockData',instanceModel: 'NumberElementBlockType'},
    'DateTimeRangeElementBlock': {dataModel: 'DateTimeRangeElementBlockData',instanceModel: 'DateTimeRangeElementBlockType'},
    'DateTimeElementBlock': {dataModel: 'DateTimeElementBlockData',instanceModel: 'DateTimeElementBlockType'},
    'AddressesElementBlock': {dataModel: 'AddressesElementBlockData',instanceModel: 'AddressesElementBlockType'},
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
  protected async doLoadType(typeInfo: TypeMapperTypeInfo) : Promise<IContentType> {
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
      if (EpiserverSpaContext.isDebugActive()) {
        console.error(`Error while importing ${typeInfo.instanceModel} from ${typeInfo.dataModel} due to:`, reason);
      }
      return null;
    });
  }
}
