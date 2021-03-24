import { Taxonomy, Core, Loaders } from '@episerver/spa-core';

export default class TypeMapper extends Loaders.BaseTypeMapper {
  protected map : { [type: string]: Loaders.TypeInfo } = {
    'CookieDropBlock': {dataModel: 'CookieDropBlockData',instanceModel: 'CookieDropBlockType'},
    'PersonList': {dataModel: 'PersonListData',instanceModel: 'PersonListType'},
    'ProfileLandingPage': {dataModel: 'ProfileLandingPageData',instanceModel: 'ProfileLandingPageType'},
    'SearchResultPage': {dataModel: 'SearchResultPageData',instanceModel: 'SearchResultPageType'},
    'SearchSettings': {dataModel: 'SearchSettingsData',instanceModel: 'SearchSettingsType'},
    'ReferencePageSettings': {dataModel: 'ReferencePageSettingsData',instanceModel: 'ReferencePageSettingsType'},
    'LayoutSettings': {dataModel: 'LayoutSettingsData',instanceModel: 'LayoutSettingsType'},
    'LabelSettings': {dataModel: 'LabelSettingsData',instanceModel: 'LabelSettingsType'},
    'CollectionSettings': {dataModel: 'CollectionSettingsData',instanceModel: 'CollectionSettingsType'},
    'PersonPage': {dataModel: 'PersonPageData',instanceModel: 'PersonPageType'},
    'StandardPage': {dataModel: 'StandardPageData',instanceModel: 'StandardPageType'},
    'SpaFolder': {dataModel: 'SpaFolderData',instanceModel: 'SpaFolderType'},
    'CategoryRoot': {dataModel: 'CategoryRootData',instanceModel: 'CategoryRootType'},
    'PdfFile': {dataModel: 'PdfFileData',instanceModel: 'PdfFileType'},
    'SettingsFolder': {dataModel: 'SettingsFolderData',instanceModel: 'SettingsFolderType'},
    'BreadcrumbBlock': {dataModel: 'BreadcrumbBlockData',instanceModel: 'BreadcrumbBlockType'},
    'CallToActionBlock': {dataModel: 'CallToActionBlockData',instanceModel: 'CallToActionBlockType'},
    'ButtonBlock': {dataModel: 'ButtonBlockData',instanceModel: 'ButtonBlockType'},
    'CarouselBlock': {dataModel: 'CarouselBlockData',instanceModel: 'CarouselBlockType'},
    'SpaMedia': {dataModel: 'SpaMediaData',instanceModel: 'SpaMediaType'},
    'ContainerBlock': {dataModel: 'ContainerBlockData',instanceModel: 'ContainerBlockType'},
    'ResetPasswordMailPage': {dataModel: 'ResetPasswordMailPageData',instanceModel: 'ResetPasswordMailPageType'},
    'ProfilePage': {dataModel: 'ProfilePageData',instanceModel: 'ProfilePageType'},
    'BlogItemPage': {dataModel: 'BlogItemPageData',instanceModel: 'BlogItemPageType'},
    'BlogListPage': {dataModel: 'BlogListPageData',instanceModel: 'BlogListPageType'},
    'StandardCategory': {dataModel: 'StandardCategoryData',instanceModel: 'StandardCategoryType'},
    'CalendarEventPage': {dataModel: 'CalendarEventPageData',instanceModel: 'CalendarEventPageType'},
    'FolderPage': {dataModel: 'FolderPageData',instanceModel: 'FolderPageType'},
    'HomePage': {dataModel: 'HomePageData',instanceModel: 'HomePageType'},
    'LandingPage': {dataModel: 'LandingPageData',instanceModel: 'LandingPageType'},
    'ThreeColumnLandingPage': {dataModel: 'ThreeColumnLandingPageData',instanceModel: 'ThreeColumnLandingPageType'},
    'ResetPasswordPage': {dataModel: 'ResetPasswordPageData',instanceModel: 'ResetPasswordPageType'},
    'TwoColumnLandingPage': {dataModel: 'TwoColumnLandingPageData',instanceModel: 'TwoColumnLandingPageType'},
    'LocationListPage': {dataModel: 'LocationListPageData',instanceModel: 'LocationListPageType'},
    'TagPage': {dataModel: 'TagPageData',instanceModel: 'TagPageType'},
    'VideoFile': {dataModel: 'VideoFileData',instanceModel: 'VideoFileType'},
    'StandardFile': {dataModel: 'StandardFileData',instanceModel: 'StandardFileType'},
    'ImageMediaData': {dataModel: 'ImageMediaDataData',instanceModel: 'ImageMediaDataType'},
    'FoundationPdfFile': {dataModel: 'FoundationPdfFileData',instanceModel: 'FoundationPdfFileType'},
    'CodingFile': {dataModel: 'CodingFileData',instanceModel: 'CodingFileType'},
    'BookmarksPage': {dataModel: 'BookmarksPageData',instanceModel: 'BookmarksPageType'},
    'LocationItemPage': {dataModel: 'LocationItemPageData',instanceModel: 'LocationItemPageType'},
    'HealthChatbotBlock': {dataModel: 'HealthChatbotBlockData',instanceModel: 'HealthChatbotBlockType'},
    'GoogleMapsBlock': {dataModel: 'GoogleMapsBlockData',instanceModel: 'GoogleMapsBlockType'},
    'HeroBlockCallout': {dataModel: 'HeroBlockCalloutData',instanceModel: 'HeroBlockCalloutType'},
    'CustomizedSearchSettings': {dataModel: 'CustomizedSearchSettingsData',instanceModel: 'CustomizedSearchSettingsType'},
    'HeroBlock': {dataModel: 'HeroBlockData',instanceModel: 'HeroBlockType'},
    'CustomizedSearchAdvancedSettings': {dataModel: 'CustomizedSearchAdvancedSettingsData',instanceModel: 'CustomizedSearchAdvancedSettingsType'},
    'FilterActivitiesBlock': {dataModel: 'FilterActivitiesBlockData',instanceModel: 'FilterActivitiesBlockType'},
    'FilterContinentsBlock': {dataModel: 'FilterContinentsBlockData',instanceModel: 'FilterContinentsBlockType'},
    'FilterDistancesBlock': {dataModel: 'FilterDistancesBlockData',instanceModel: 'FilterDistancesBlockType'},
    'FilterTemperaturesBlock': {dataModel: 'FilterTemperaturesBlockData',instanceModel: 'FilterTemperaturesBlockType'},
    'CalendarBlock': {dataModel: 'CalendarBlockData',instanceModel: 'CalendarBlockType'},
    'YouTubeBlock': {dataModel: 'YouTubeBlockData',instanceModel: 'YouTubeBlockType'},
    'VimeoBlock': {dataModel: 'VimeoBlockData',instanceModel: 'VimeoBlockType'},
    'CustomizedSearchBlock': {dataModel: 'CustomizedSearchBlockData',instanceModel: 'CustomizedSearchBlockType'},
    'TwitterBlock': {dataModel: 'TwitterBlockData',instanceModel: 'TwitterBlockType'},
    'VideoBlock': {dataModel: 'VideoBlockData',instanceModel: 'VideoBlockType'},
    'MenuItemBlock': {dataModel: 'MenuItemBlockData',instanceModel: 'MenuItemBlockType'},
    'NavigationBlock': {dataModel: 'NavigationBlockData',instanceModel: 'NavigationBlockType'},
    'FacebookBlock': {dataModel: 'FacebookBlockData',instanceModel: 'FacebookBlockType'},
    'CustomViewConfigurationBlock': {dataModel: 'CustomViewConfigurationBlockData',instanceModel: 'CustomViewConfigurationBlockType'},
    'RssReaderBlock': {dataModel: 'RssReaderBlockData',instanceModel: 'RssReaderBlockType'},
    'PageListBlock': {dataModel: 'PageListBlockData',instanceModel: 'PageListBlockType'},
    'TeaserBlock': {dataModel: 'TeaserBlockData',instanceModel: 'TeaserBlockType'},
    'TextBlock': {dataModel: 'TextBlockData',instanceModel: 'TextBlockType'},
    'TextboxElementBlock': {dataModel: 'TextboxElementBlockData',instanceModel: 'TextboxElementBlockType'},
    'TextareaElementBlock': {dataModel: 'TextareaElementBlockData',instanceModel: 'TextareaElementBlockType'},
    'NumberElementBlock': {dataModel: 'NumberElementBlockData',instanceModel: 'NumberElementBlockType'},
    'DateTimeElementBlock': {dataModel: 'DateTimeElementBlockData',instanceModel: 'DateTimeElementBlockType'},
    'DateTimeRangeElementBlock': {dataModel: 'DateTimeRangeElementBlockData',instanceModel: 'DateTimeRangeElementBlockType'},
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
