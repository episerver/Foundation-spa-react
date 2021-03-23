import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Profile Page Landing Page
 *
 * Default standard page that has top content area, main body, and main content area
 *
 * @GUID 71f9e8e1-46da-4d40-883f-a1befacaeb88
 */
export default interface ProfileLandingPageData extends Taxonomy.IContent {
    /**
     * Categories
     *
     * Categories associated with this content.
     */
    categories: ContentDelivery.ContentReferenceListProperty

    /**
     * Teaser ratio (width-height)
     *
     * No description available
     */
    teaserRatio: ContentDelivery.StringProperty

    /**
     * Top content area
     *
     * No description available
     */
    topContentArea: ContentDelivery.ContentAreaProperty

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
     * Button color
     *
     * No description available
     */
    teaserButtonColor: ContentDelivery.StringProperty

    /**
     * Button text color
     *
     * No description available
     */
    teaserButtonTextColor: ContentDelivery.StringProperty

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
export interface ProfileLandingPageProps extends ComponentTypes.AbstractComponentProps<ProfileLandingPageData> {}

export class ProfileLandingPageType extends Taxonomy.AbstractIContent<ProfileLandingPageData> implements ProfileLandingPageData {
    protected _typeName : string = "ProfileLandingPage";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'categories': 'ContentReferenceList',
        'teaserRatio': 'LongString',
        'topContentArea': 'ContentArea',
        'mainBody': 'XhtmlString',
        'metaTitle': 'LongString',
        'excludeFromSearch': 'Boolean',
        'pageImage': 'ContentReference',
        'cssFiles': 'LinkCollection',
        'scriptFiles': 'LinkCollection',
        'mainContentArea': 'ContentArea',
        'keywords': 'LongString',
        'hideSiteHeader': 'Boolean',
        'teaserVideo': 'ContentReference',
        'css': 'LongString',
        'scripts': 'LongString',
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
        'teaserButtonColor': 'LongString',
        'teaserButtonTextColor': 'LongString',
        'applyHoverEffect': 'Boolean',
        'padding': 'LongString',
        'margin': 'LongString',
    }

    /**
     * Categories
     *
     * Categories associated with this content.
     */
    public get categories() : ProfileLandingPageData["categories"] { return this.getProperty("categories"); }

    /**
     * Teaser ratio (width-height)
     *
     * No description available
     */
    public get teaserRatio() : ProfileLandingPageData["teaserRatio"] { return this.getProperty("teaserRatio"); }

    /**
     * Top content area
     *
     * No description available
     */
    public get topContentArea() : ProfileLandingPageData["topContentArea"] { return this.getProperty("topContentArea"); }

    /**
     * Main body
     *
     * No description available
     */
    public get mainBody() : ProfileLandingPageData["mainBody"] { return this.getProperty("mainBody"); }

    /**
     * Title
     *
     * No description available
     */
    public get metaTitle() : ProfileLandingPageData["metaTitle"] { return this.getProperty("metaTitle"); }

    /**
     * Exclude from results
     *
     * This will determine whether or not to show on search
     */
    public get excludeFromSearch() : ProfileLandingPageData["excludeFromSearch"] { return this.getProperty("excludeFromSearch"); }

    /**
     * Image
     *
     * No description available
     */
    public get pageImage() : ProfileLandingPageData["pageImage"] { return this.getProperty("pageImage"); }

    /**
     * CSS files
     *
     * No description available
     */
    public get cssFiles() : ProfileLandingPageData["cssFiles"] { return this.getProperty("cssFiles"); }

    /**
     * Script files
     *
     * No description available
     */
    public get scriptFiles() : ProfileLandingPageData["scriptFiles"] { return this.getProperty("scriptFiles"); }

    /**
     * Main content area
     *
     * No description available
     */
    public get mainContentArea() : ProfileLandingPageData["mainContentArea"] { return this.getProperty("mainContentArea"); }

    /**
     * Keywords
     *
     * No description available
     */
    public get keywords() : ProfileLandingPageData["keywords"] { return this.getProperty("keywords"); }

    /**
     * Hide site header
     *
     * No description available
     */
    public get hideSiteHeader() : ProfileLandingPageData["hideSiteHeader"] { return this.getProperty("hideSiteHeader"); }

    /**
     * Video
     *
     * No description available
     */
    public get teaserVideo() : ProfileLandingPageData["teaserVideo"] { return this.getProperty("teaserVideo"); }

    /**
     * CSS
     *
     * No description available
     */
    public get css() : ProfileLandingPageData["css"] { return this.getProperty("css"); }

    /**
     * Scripts
     *
     * No description available
     */
    public get scripts() : ProfileLandingPageData["scripts"] { return this.getProperty("scripts"); }

    /**
     * Page description
     *
     * No description available
     */
    public get pageDescription() : ProfileLandingPageData["pageDescription"] { return this.getProperty("pageDescription"); }

    /**
     * Hide site footer
     *
     * No description available
     */
    public get hideSiteFooter() : ProfileLandingPageData["hideSiteFooter"] { return this.getProperty("hideSiteFooter"); }

    /**
     * Text
     *
     * No description available
     */
    public get teaserText() : ProfileLandingPageData["teaserText"] { return this.getProperty("teaserText"); }

    /**
     * Content type
     *
     * No description available
     */
    public get metaContentType() : ProfileLandingPageData["metaContentType"] { return this.getProperty("metaContentType"); }

    /**
     * Industry
     *
     * No description available
     */
    public get industry() : ProfileLandingPageData["industry"] { return this.getProperty("industry"); }

    /**
     * Author
     *
     * No description available
     */
    public get authorMetaData() : ProfileLandingPageData["authorMetaData"] { return this.getProperty("authorMetaData"); }

    /**
     * Disable indexing
     *
     * No description available
     */
    public get disableIndexing() : ProfileLandingPageData["disableIndexing"] { return this.getProperty("disableIndexing"); }

    /**
     * Highlight in page list
     *
     * No description available
     */
    public get highlight() : ProfileLandingPageData["highlight"] { return this.getProperty("highlight"); }

    /**
     * Text alignment
     *
     * No description available
     */
    public get teaserTextAlignment() : ProfileLandingPageData["teaserTextAlignment"] { return this.getProperty("teaserTextAlignment"); }

    /**
     * Color theme
     *
     * No description available
     */
    public get teaserColorTheme() : ProfileLandingPageData["teaserColorTheme"] { return this.getProperty("teaserColorTheme"); }

    /**
     * Button label
     *
     * No description available
     */
    public get teaserButtonText() : ProfileLandingPageData["teaserButtonText"] { return this.getProperty("teaserButtonText"); }

    /**
     * Button theme
     *
     * No description available
     */
    public get teaserButtonStyle() : ProfileLandingPageData["teaserButtonStyle"] { return this.getProperty("teaserButtonStyle"); }

    /**
     * Button color
     *
     * No description available
     */
    public get teaserButtonColor() : ProfileLandingPageData["teaserButtonColor"] { return this.getProperty("teaserButtonColor"); }

    /**
     * Button text color
     *
     * No description available
     */
    public get teaserButtonTextColor() : ProfileLandingPageData["teaserButtonTextColor"] { return this.getProperty("teaserButtonTextColor"); }

    /**
     * Display hover effect
     *
     * No description available
     */
    public get applyHoverEffect() : ProfileLandingPageData["applyHoverEffect"] { return this.getProperty("applyHoverEffect"); }

    /**
     * Padding
     *
     * No description available
     */
    public get padding() : ProfileLandingPageData["padding"] { return this.getProperty("padding"); }

    /**
     * Margin
     *
     * No description available
     */
    public get margin() : ProfileLandingPageData["margin"] { return this.getProperty("margin"); }

}
