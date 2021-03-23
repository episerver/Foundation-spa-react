import { Taxonomy, Core, Loaders } from '@episerver/spa-core';

export default class TypeMapper extends Loaders.BaseTypeMapper {
  protected map : { [type: string]: Loaders.TypeInfo } = {
    'CookieDropBlock': {dataModel: 'CookieDropBlockData',instanceModel: 'CookieDropBlockType'},
    'ResetPasswordMailPage': {dataModel: 'ResetPasswordMailPageData',instanceModel: 'ResetPasswordMailPageType'},
    'PersonPage': {dataModel: 'PersonPageData',instanceModel: 'PersonPageType'},
    'PersonList': {dataModel: 'PersonListData',instanceModel: 'PersonListType'},
    'ProfileLandingPage': {dataModel: 'ProfileLandingPageData',instanceModel: 'ProfileLandingPageType'},
    'SearchResultPage': {dataModel: 'SearchResultPageData',instanceModel: 'SearchResultPageType'},
    'SearchSettings': {dataModel: 'SearchSettingsData',instanceModel: 'SearchSettingsType'},
    'ReferencePageSettings': {dataModel: 'ReferencePageSettingsData',instanceModel: 'ReferencePageSettingsType'},
    'LayoutSettings': {dataModel: 'LayoutSettingsData',instanceModel: 'LayoutSettingsType'},
    'ResetPasswordPage': {dataModel: 'ResetPasswordPageData',instanceModel: 'ResetPasswordPageType'},
    'LabelSettings': {dataModel: 'LabelSettingsData',instanceModel: 'LabelSettingsType'},
    'StandardPage': {dataModel: 'StandardPageData',instanceModel: 'StandardPageType'},
    'SpaMedia': {dataModel: 'SpaMediaData',instanceModel: 'SpaMediaType'},
    'SpaFolder': {dataModel: 'SpaFolderData',instanceModel: 'SpaFolderType'},
    'CategoryRoot': {dataModel: 'CategoryRootData',instanceModel: 'CategoryRootType'},
    'CustomViewConfigurationBlock': {dataModel: 'CustomViewConfigurationBlockData',instanceModel: 'CustomViewConfigurationBlockType'},
    'BreadcrumbBlock': {dataModel: 'BreadcrumbBlockData',instanceModel: 'BreadcrumbBlockType'},
    'CallToActionBlock': {dataModel: 'CallToActionBlockData',instanceModel: 'CallToActionBlockType'},
    'ButtonBlock': {dataModel: 'ButtonBlockData',instanceModel: 'ButtonBlockType'},
    'CollectionSettings': {dataModel: 'CollectionSettingsData',instanceModel: 'CollectionSettingsType'},
    'CarouselBlock': {dataModel: 'CarouselBlockData',instanceModel: 'CarouselBlockType'},
    'ProfilePage': {dataModel: 'ProfilePageData',instanceModel: 'ProfilePageType'},
    'CodingFile': {dataModel: 'CodingFileData',instanceModel: 'CodingFileType'},
    'PdfFile': {dataModel: 'PdfFileData',instanceModel: 'PdfFileType'},
    'SettingsFolder': {dataModel: 'SettingsFolderData',instanceModel: 'SettingsFolderType'},
    'BlogItemPage': {dataModel: 'BlogItemPageData',instanceModel: 'BlogItemPageType'},
    'BlogListPage': {dataModel: 'BlogListPageData',instanceModel: 'BlogListPageType'},
    'StandardCategory': {dataModel: 'StandardCategoryData',instanceModel: 'StandardCategoryType'},
    'CalendarEventPage': {dataModel: 'CalendarEventPageData',instanceModel: 'CalendarEventPageType'},
    'FolderPage': {dataModel: 'FolderPageData',instanceModel: 'FolderPageType'},
    'HomePage': {dataModel: 'HomePageData',instanceModel: 'HomePageType'},
    'BookmarksPage': {dataModel: 'BookmarksPageData',instanceModel: 'BookmarksPageType'},
    'LandingPage': {dataModel: 'LandingPageData',instanceModel: 'LandingPageType'},
    'TwoColumnLandingPage': {dataModel: 'TwoColumnLandingPageData',instanceModel: 'TwoColumnLandingPageType'},
    'LocationItemPage': {dataModel: 'LocationItemPageData',instanceModel: 'LocationItemPageType'},
    'LocationListPage': {dataModel: 'LocationListPageData',instanceModel: 'LocationListPageType'},
    'TagPage': {dataModel: 'TagPageData',instanceModel: 'TagPageType'},
    'VideoFile': {dataModel: 'VideoFileData',instanceModel: 'VideoFileType'},
    'StandardFile': {dataModel: 'StandardFileData',instanceModel: 'StandardFileType'},
    'ImageMediaData': {dataModel: 'ImageMediaDataData',instanceModel: 'ImageMediaDataType'},
    'FoundationPdfFile': {dataModel: 'FoundationPdfFileData',instanceModel: 'FoundationPdfFileType'},
    'ThreeColumnLandingPage': {dataModel: 'ThreeColumnLandingPageData',instanceModel: 'ThreeColumnLandingPageType'},
    'GoogleMapsBlock': {dataModel: 'GoogleMapsBlockData',instanceModel: 'GoogleMapsBlockType'},
    'ContainerBlock': {dataModel: 'ContainerBlockData',instanceModel: 'ContainerBlockType'},
    'HeroBlock': {dataModel: 'HeroBlockData',instanceModel: 'HeroBlockType'},
    'HealthChatbotBlock': {dataModel: 'HealthChatbotBlockData',instanceModel: 'HealthChatbotBlockType'},
    'CustomizedSearchAdvancedSettings': {dataModel: 'CustomizedSearchAdvancedSettingsData',instanceModel: 'CustomizedSearchAdvancedSettingsType'},
    'CustomizedSearchSettings': {dataModel: 'CustomizedSearchSettingsData',instanceModel: 'CustomizedSearchSettingsType'},
    'CustomizedSearchBlock': {dataModel: 'CustomizedSearchBlockData',instanceModel: 'CustomizedSearchBlockType'},
    'FilterActivitiesBlock': {dataModel: 'FilterActivitiesBlockData',instanceModel: 'FilterActivitiesBlockType'},
    'FilterDistancesBlock': {dataModel: 'FilterDistancesBlockData',instanceModel: 'FilterDistancesBlockType'},
    'FilterTemperaturesBlock': {dataModel: 'FilterTemperaturesBlockData',instanceModel: 'FilterTemperaturesBlockType'},
    'CalendarBlock': {dataModel: 'CalendarBlockData',instanceModel: 'CalendarBlockType'},
    'YouTubeBlock': {dataModel: 'YouTubeBlockData',instanceModel: 'YouTubeBlockType'},
    'VimeoBlock': {dataModel: 'VimeoBlockData',instanceModel: 'VimeoBlockType'},
    'FilterContinentsBlock': {dataModel: 'FilterContinentsBlockData',instanceModel: 'FilterContinentsBlockType'},
    'TwitterBlock': {dataModel: 'TwitterBlockData',instanceModel: 'TwitterBlockType'},
    'TextBlock': {dataModel: 'TextBlockData',instanceModel: 'TextBlockType'},
    'TeaserBlock': {dataModel: 'TeaserBlockData',instanceModel: 'TeaserBlockType'},
    'RssReaderBlock': {dataModel: 'RssReaderBlockData',instanceModel: 'RssReaderBlockType'},
    'PageListBlock': {dataModel: 'PageListBlockData',instanceModel: 'PageListBlockType'},
    'FacebookBlock': {dataModel: 'FacebookBlockData',instanceModel: 'FacebookBlockType'},
    'NavigationBlock': {dataModel: 'NavigationBlockData',instanceModel: 'NavigationBlockType'},
    'MenuItemBlock': {dataModel: 'MenuItemBlockData',instanceModel: 'MenuItemBlockType'},
    'HeroBlockCallout': {dataModel: 'HeroBlockCalloutData',instanceModel: 'HeroBlockCalloutType'},
    'VideoBlock': {dataModel: 'VideoBlockData',instanceModel: 'VideoBlockType'},
    'TextboxElementBlock': {dataModel: 'TextboxElementBlockData',instanceModel: 'TextboxElementBlockType'},
    'TextareaElementBlock': {dataModel: 'TextareaElementBlockData',instanceModel: 'TextareaElementBlockType'},
    'NumberElementBlock': {dataModel: 'NumberElementBlockData',instanceModel: 'NumberElementBlockType'},
    'DateTimeRangeElementBlock': {dataModel: 'DateTimeRangeElementBlockData',instanceModel: 'DateTimeRangeElementBlockType'},
    'AddressesElementBlock': {dataModel: 'AddressesElementBlockData',instanceModel: 'AddressesElementBlockType'},
    'DateTimeElementBlock': {dataModel: 'DateTimeElementBlockData',instanceModel: 'DateTimeElementBlockType'},
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
