import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Cms Home Page
 *
 * Used for home page of all sites
 *
 * @GUID 452d1812-7385-42c3-8073-c1b7481e7b20
 */
export default interface CmsHomePageData extends Taxonomy.IContent {
    /**
     * Main menu
     *
     * No description available
     */
    mainMenu: ContentDelivery.ContentAreaProperty

    /**
     * Introduction
     *
     * No description available
     */
    introduction: ContentDelivery.StringProperty

    /**
     * Site logo
     *
     * No description available
     */
    siteLogo: ContentDelivery.ContentReferenceProperty

    /**
     * Search page
     *
     * No description available
     */
    searchPage: ContentDelivery.ContentReferenceProperty

    /**
     * Categories
     *
     * Categories associated with this content.
     */
    categories: ContentDelivery.ContentReferenceListProperty

    /**
     * Banner text
     *
     * No description available
     */
    bannerText: ContentDelivery.StringProperty

    /**
     * Company header
     *
     * No description available
     */
    companyHeader: ContentDelivery.StringProperty

    /**
     * Company name
     *
     * No description available
     */
    companyName: ContentDelivery.StringProperty

    /**
     * Comapny address
     *
     * No description available
     */
    companyAddress: ContentDelivery.StringProperty

    /**
     * Reset password
     *
     * No description available
     */
    resetPasswordMail: ContentDelivery.ContentReferenceProperty

    /**
     * Menu style
     *
     * No description available
     */
    headerMenuStyle: ContentDelivery.StringProperty

    /**
     * My account menu (CMS)
     *
     * This menu will show if show commerce components in header is false
     */
    myAccountCmsMenu: ContentDelivery.LinkListProperty

    /**
     * Company phone
     *
     * No description available
     */
    companyPhone: ContentDelivery.StringProperty

    /**
     * Reset password page
     *
     * No description available
     */
    resetPasswordPage: ContentDelivery.ContentReferenceProperty

    /**
     * Company email
     *
     * No description available
     */
    companyEmail: ContentDelivery.StringProperty

    /**
     * Teaser ratio (width-height)
     *
     * No description available
     */
    teaserRatio: ContentDelivery.StringProperty

    /**
     * Links header
     *
     * No description available
     */
    linksHeader: ContentDelivery.StringProperty

    /**
     * Links
     *
     * No description available
     */
    links: ContentDelivery.LinkListProperty

    /**
     * Social header
     *
     * No description available
     */
    socialHeader: ContentDelivery.StringProperty

    /**
     * Social links
     *
     * No description available
     */
    socialLinks: ContentDelivery.LinkListProperty

    /**
     * Content area
     *
     * No description available
     */
    contentArea: ContentDelivery.ContentAreaProperty

    /**
     * Main body
     *
     * No description available
     */
    mainBody: ContentDelivery.StringProperty

    /**
     * Title
     *
     * No description available
     */
    metaTitle: ContentDelivery.StringProperty

    /**
     * Exclude from results
     *
     * This will determine whether or not to show on search
     */
    excludeFromSearch: ContentDelivery.BooleanProperty

    /**
     * Image
     *
     * No description available
     */
    pageImage: ContentDelivery.ContentReferenceProperty

    /**
     * CSS files
     *
     * No description available
     */
    cssFiles: ContentDelivery.LinkListProperty

    /**
     * Script files
     *
     * No description available
     */
    scriptFiles: ContentDelivery.LinkListProperty

    /**
     * Copyright
     *
     * No description available
     */
    footerCopyrightText: ContentDelivery.StringProperty

    /**
     * Top content area
     *
     * No description available
     */
    topContentArea: ContentDelivery.ContentAreaProperty

    /**
     * Content Manager
     *
     * No description available
     */
    contentManager: ContentDelivery.ContentAreaProperty

    /**
     * Main content area
     *
     * No description available
     */
    mainContentArea: ContentDelivery.ContentAreaProperty

    /**
     * Keywords
     *
     * No description available
     */
    keywords: ContentDelivery.StringProperty

    /**
     * Hide site header
     *
     * No description available
     */
    hideSiteHeader: ContentDelivery.BooleanProperty

    /**
     * Video
     *
     * No description available
     */
    teaserVideo: ContentDelivery.ContentReferenceProperty

    /**
     * CSS
     *
     * No description available
     */
    css: ContentDelivery.StringProperty

    /**
     * Scripts
     *
     * No description available
     */
    scripts: ContentDelivery.StringProperty

    /**
     * Bottom content area
     *
     * No description available
     */
    bottomContentArea: ContentDelivery.ContentAreaProperty

    /**
     * Page description
     *
     * No description available
     */
    pageDescription: ContentDelivery.StringProperty

    /**
     * Hide site footer
     *
     * No description available
     */
    hideSiteFooter: ContentDelivery.BooleanProperty

    /**
     * Text
     *
     * No description available
     */
    teaserText: ContentDelivery.StringProperty

    /**
     * Content type
     *
     * No description available
     */
    metaContentType: ContentDelivery.StringProperty

    /**
     * Industry
     *
     * No description available
     */
    industry: ContentDelivery.StringProperty

    /**
     * Author
     *
     * No description available
     */
    authorMetaData: ContentDelivery.StringProperty

    /**
     * Disable indexing
     *
     * No description available
     */
    disableIndexing: ContentDelivery.BooleanProperty

    /**
     * Highlight in page list
     *
     * No description available
     */
    highlight: ContentDelivery.BooleanProperty

    /**
     * Text alignment
     *
     * No description available
     */
    teaserTextAlignment: ContentDelivery.StringProperty

    /**
     * Color theme
     *
     * No description available
     */
    teaserColorTheme: ContentDelivery.StringProperty

    /**
     * Button label
     *
     * No description available
     */
    teaserButtonText: ContentDelivery.StringProperty

    /**
     * Button theme
     *
     * No description available
     */
    teaserButtonStyle: ContentDelivery.StringProperty

    /**
     * Display hover effect
     *
     * No description available
     */
    applyHoverEffect: ContentDelivery.BooleanProperty

    /**
     * Padding
     *
     * No description available
     */
    padding: ContentDelivery.StringProperty

    /**
     * Margin
     *
     * No description available
     */
    margin: ContentDelivery.StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface CmsHomePageProps extends ComponentTypes.AbstractComponentProps<CmsHomePageData> {}

export class CmsHomePageType extends Taxonomy.AbstractIContent<CmsHomePageData> implements CmsHomePageData {
    protected _typeName : string = "CmsHomePage";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'mainMenu': 'ContentArea',
        'introduction': 'LongString',
        'siteLogo': 'ContentReference',
        'searchPage': 'ContentReference',
        'categories': 'ContentReferenceList',
        'bannerText': 'XhtmlString',
        'companyHeader': 'LongString',
        'companyName': 'LongString',
        'companyAddress': 'LongString',
        'resetPasswordMail': 'ContentReference',
        'headerMenuStyle': 'LongString',
        'myAccountCmsMenu': 'LinkCollection',
        'companyPhone': 'LongString',
        'resetPasswordPage': 'ContentReference',
        'companyEmail': 'LongString',
        'teaserRatio': 'LongString',
        'linksHeader': 'LongString',
        'links': 'LinkCollection',
        'socialHeader': 'LongString',
        'socialLinks': 'LinkCollection',
        'contentArea': 'ContentArea',
        'mainBody': 'XhtmlString',
        'metaTitle': 'LongString',
        'excludeFromSearch': 'Boolean',
        'pageImage': 'ContentReference',
        'cssFiles': 'LinkCollection',
        'scriptFiles': 'LinkCollection',
        'footerCopyrightText': 'LongString',
        'topContentArea': 'ContentArea',
        'contentManager': 'ContentArea',
        'mainContentArea': 'ContentArea',
        'keywords': 'LongString',
        'hideSiteHeader': 'Boolean',
        'teaserVideo': 'ContentReference',
        'css': 'LongString',
        'scripts': 'LongString',
        'bottomContentArea': 'ContentArea',
        'pageDescription': 'LongString',
        'hideSiteFooter': 'Boolean',
        'teaserText': 'LongString',
        'metaContentType': 'LongString',
        'industry': 'LongString',
        'authorMetaData': 'LongString',
        'disableIndexing': 'Boolean',
        'highlight': 'Boolean',
        'teaserTextAlignment': 'LongString',
        'teaserColorTheme': 'LongString',
        'teaserButtonText': 'LongString',
        'teaserButtonStyle': 'LongString',
        'applyHoverEffect': 'Boolean',
        'padding': 'LongString',
        'margin': 'LongString',
    }

    /**
     * Main menu
     *
     * No description available
     */
    public get mainMenu() : CmsHomePageData["mainMenu"] { return this.getProperty("mainMenu"); }

    /**
     * Introduction
     *
     * No description available
     */
    public get introduction() : CmsHomePageData["introduction"] { return this.getProperty("introduction"); }

    /**
     * Site logo
     *
     * No description available
     */
    public get siteLogo() : CmsHomePageData["siteLogo"] { return this.getProperty("siteLogo"); }

    /**
     * Search page
     *
     * No description available
     */
    public get searchPage() : CmsHomePageData["searchPage"] { return this.getProperty("searchPage"); }

    /**
     * Categories
     *
     * Categories associated with this content.
     */
    public get categories() : CmsHomePageData["categories"] { return this.getProperty("categories"); }

    /**
     * Banner text
     *
     * No description available
     */
    public get bannerText() : CmsHomePageData["bannerText"] { return this.getProperty("bannerText"); }

    /**
     * Company header
     *
     * No description available
     */
    public get companyHeader() : CmsHomePageData["companyHeader"] { return this.getProperty("companyHeader"); }

    /**
     * Company name
     *
     * No description available
     */
    public get companyName() : CmsHomePageData["companyName"] { return this.getProperty("companyName"); }

    /**
     * Comapny address
     *
     * No description available
     */
    public get companyAddress() : CmsHomePageData["companyAddress"] { return this.getProperty("companyAddress"); }

    /**
     * Reset password
     *
     * No description available
     */
    public get resetPasswordMail() : CmsHomePageData["resetPasswordMail"] { return this.getProperty("resetPasswordMail"); }

    /**
     * Menu style
     *
     * No description available
     */
    public get headerMenuStyle() : CmsHomePageData["headerMenuStyle"] { return this.getProperty("headerMenuStyle"); }

    /**
     * My account menu (CMS)
     *
     * This menu will show if show commerce components in header is false
     */
    public get myAccountCmsMenu() : CmsHomePageData["myAccountCmsMenu"] { return this.getProperty("myAccountCmsMenu"); }

    /**
     * Company phone
     *
     * No description available
     */
    public get companyPhone() : CmsHomePageData["companyPhone"] { return this.getProperty("companyPhone"); }

    /**
     * Reset password page
     *
     * No description available
     */
    public get resetPasswordPage() : CmsHomePageData["resetPasswordPage"] { return this.getProperty("resetPasswordPage"); }

    /**
     * Company email
     *
     * No description available
     */
    public get companyEmail() : CmsHomePageData["companyEmail"] { return this.getProperty("companyEmail"); }

    /**
     * Teaser ratio (width-height)
     *
     * No description available
     */
    public get teaserRatio() : CmsHomePageData["teaserRatio"] { return this.getProperty("teaserRatio"); }

    /**
     * Links header
     *
     * No description available
     */
    public get linksHeader() : CmsHomePageData["linksHeader"] { return this.getProperty("linksHeader"); }

    /**
     * Links
     *
     * No description available
     */
    public get links() : CmsHomePageData["links"] { return this.getProperty("links"); }

    /**
     * Social header
     *
     * No description available
     */
    public get socialHeader() : CmsHomePageData["socialHeader"] { return this.getProperty("socialHeader"); }

    /**
     * Social links
     *
     * No description available
     */
    public get socialLinks() : CmsHomePageData["socialLinks"] { return this.getProperty("socialLinks"); }

    /**
     * Content area
     *
     * No description available
     */
    public get contentArea() : CmsHomePageData["contentArea"] { return this.getProperty("contentArea"); }

    /**
     * Main body
     *
     * No description available
     */
    public get mainBody() : CmsHomePageData["mainBody"] { return this.getProperty("mainBody"); }

    /**
     * Title
     *
     * No description available
     */
    public get metaTitle() : CmsHomePageData["metaTitle"] { return this.getProperty("metaTitle"); }

    /**
     * Exclude from results
     *
     * This will determine whether or not to show on search
     */
    public get excludeFromSearch() : CmsHomePageData["excludeFromSearch"] { return this.getProperty("excludeFromSearch"); }

    /**
     * Image
     *
     * No description available
     */
    public get pageImage() : CmsHomePageData["pageImage"] { return this.getProperty("pageImage"); }

    /**
     * CSS files
     *
     * No description available
     */
    public get cssFiles() : CmsHomePageData["cssFiles"] { return this.getProperty("cssFiles"); }

    /**
     * Script files
     *
     * No description available
     */
    public get scriptFiles() : CmsHomePageData["scriptFiles"] { return this.getProperty("scriptFiles"); }

    /**
     * Copyright
     *
     * No description available
     */
    public get footerCopyrightText() : CmsHomePageData["footerCopyrightText"] { return this.getProperty("footerCopyrightText"); }

    /**
     * Top content area
     *
     * No description available
     */
    public get topContentArea() : CmsHomePageData["topContentArea"] { return this.getProperty("topContentArea"); }

    /**
     * Content Manager
     *
     * No description available
     */
    public get contentManager() : CmsHomePageData["contentManager"] { return this.getProperty("contentManager"); }

    /**
     * Main content area
     *
     * No description available
     */
    public get mainContentArea() : CmsHomePageData["mainContentArea"] { return this.getProperty("mainContentArea"); }

    /**
     * Keywords
     *
     * No description available
     */
    public get keywords() : CmsHomePageData["keywords"] { return this.getProperty("keywords"); }

    /**
     * Hide site header
     *
     * No description available
     */
    public get hideSiteHeader() : CmsHomePageData["hideSiteHeader"] { return this.getProperty("hideSiteHeader"); }

    /**
     * Video
     *
     * No description available
     */
    public get teaserVideo() : CmsHomePageData["teaserVideo"] { return this.getProperty("teaserVideo"); }

    /**
     * CSS
     *
     * No description available
     */
    public get css() : CmsHomePageData["css"] { return this.getProperty("css"); }

    /**
     * Scripts
     *
     * No description available
     */
    public get scripts() : CmsHomePageData["scripts"] { return this.getProperty("scripts"); }

    /**
     * Bottom content area
     *
     * No description available
     */
    public get bottomContentArea() : CmsHomePageData["bottomContentArea"] { return this.getProperty("bottomContentArea"); }

    /**
     * Page description
     *
     * No description available
     */
    public get pageDescription() : CmsHomePageData["pageDescription"] { return this.getProperty("pageDescription"); }

    /**
     * Hide site footer
     *
     * No description available
     */
    public get hideSiteFooter() : CmsHomePageData["hideSiteFooter"] { return this.getProperty("hideSiteFooter"); }

    /**
     * Text
     *
     * No description available
     */
    public get teaserText() : CmsHomePageData["teaserText"] { return this.getProperty("teaserText"); }

    /**
     * Content type
     *
     * No description available
     */
    public get metaContentType() : CmsHomePageData["metaContentType"] { return this.getProperty("metaContentType"); }

    /**
     * Industry
     *
     * No description available
     */
    public get industry() : CmsHomePageData["industry"] { return this.getProperty("industry"); }

    /**
     * Author
     *
     * No description available
     */
    public get authorMetaData() : CmsHomePageData["authorMetaData"] { return this.getProperty("authorMetaData"); }

    /**
     * Disable indexing
     *
     * No description available
     */
    public get disableIndexing() : CmsHomePageData["disableIndexing"] { return this.getProperty("disableIndexing"); }

    /**
     * Highlight in page list
     *
     * No description available
     */
    public get highlight() : CmsHomePageData["highlight"] { return this.getProperty("highlight"); }

    /**
     * Text alignment
     *
     * No description available
     */
    public get teaserTextAlignment() : CmsHomePageData["teaserTextAlignment"] { return this.getProperty("teaserTextAlignment"); }

    /**
     * Color theme
     *
     * No description available
     */
    public get teaserColorTheme() : CmsHomePageData["teaserColorTheme"] { return this.getProperty("teaserColorTheme"); }

    /**
     * Button label
     *
     * No description available
     */
    public get teaserButtonText() : CmsHomePageData["teaserButtonText"] { return this.getProperty("teaserButtonText"); }

    /**
     * Button theme
     *
     * No description available
     */
    public get teaserButtonStyle() : CmsHomePageData["teaserButtonStyle"] { return this.getProperty("teaserButtonStyle"); }

    /**
     * Display hover effect
     *
     * No description available
     */
    public get applyHoverEffect() : CmsHomePageData["applyHoverEffect"] { return this.getProperty("applyHoverEffect"); }

    /**
     * Padding
     *
     * No description available
     */
    public get padding() : CmsHomePageData["padding"] { return this.getProperty("padding"); }

    /**
     * Margin
     *
     * No description available
     */
    public get margin() : CmsHomePageData["margin"] { return this.getProperty("margin"); }

}
