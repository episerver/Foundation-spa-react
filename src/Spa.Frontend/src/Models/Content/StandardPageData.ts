import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Standard Page
 *
 * Allows for creation of rich standard pages
 *
 * @GUID c0a25bb7-199c-457d-98c6-b0179c7acae8
 */
export default interface StandardPageData extends Taxonomy.IContent {
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
     * Title color
     *
     * No description available
     */
    titleColor: ContentDelivery.StringProperty

    /**
     * Background color
     *
     * No description available
     */
    backgroundColor: ContentDelivery.StringProperty

    /**
     * Title opacity (0 to 1)
     *
     * No description available
     */
    backgroundOpacity: ContentDelivery.NumberProperty

    /**
     * Background image
     *
     * No description available
     */
    backgroundImage: ContentDelivery.ContentReferenceProperty

    /**
     * Background video
     *
     * No description available
     */
    backgroundVideo: ContentDelivery.ContentReferenceProperty

    /**
     * Top padding mode
     *
     * Sets how much padding should be at the top of the standard content
     */
    topPaddingMode: ContentDelivery.StringProperty

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
export interface StandardPageProps extends ComponentTypes.AbstractComponentProps<StandardPageData> {}

export class StandardPageType extends Taxonomy.AbstractIContent<StandardPageData> implements StandardPageData {
    protected _typeName : string = "StandardPage";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'categories': 'ContentReferenceList',
        'teaserRatio': 'LongString',
        'mainBody': 'XhtmlString',
        'metaTitle': 'LongString',
        'excludeFromSearch': 'Boolean',
        'pageImage': 'ContentReference',
        'cssFiles': 'LinkCollection',
        'mainContentArea': 'ContentArea',
        'keywords': 'LongString',
        'hideSiteHeader': 'Boolean',
        'teaserVideo': 'ContentReference',
        'css': 'LongString',
        'titleColor': 'LongString',
        'backgroundColor': 'LongString',
        'backgroundOpacity': 'FloatNumber',
        'backgroundImage': 'ContentReference',
        'backgroundVideo': 'ContentReference',
        'topPaddingMode': 'LongString',
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
    public get categories() : StandardPageData["categories"] { return this.getProperty("categories"); }

    /**
     * Teaser ratio (width-height)
     *
     * No description available
     */
    public get teaserRatio() : StandardPageData["teaserRatio"] { return this.getProperty("teaserRatio"); }

    /**
     * Main body
     *
     * No description available
     */
    public get mainBody() : StandardPageData["mainBody"] { return this.getProperty("mainBody"); }

    /**
     * Title
     *
     * No description available
     */
    public get metaTitle() : StandardPageData["metaTitle"] { return this.getProperty("metaTitle"); }

    /**
     * Exclude from results
     *
     * This will determine whether or not to show on search
     */
    public get excludeFromSearch() : StandardPageData["excludeFromSearch"] { return this.getProperty("excludeFromSearch"); }

    /**
     * Image
     *
     * No description available
     */
    public get pageImage() : StandardPageData["pageImage"] { return this.getProperty("pageImage"); }

    /**
     * CSS files
     *
     * No description available
     */
    public get cssFiles() : StandardPageData["cssFiles"] { return this.getProperty("cssFiles"); }

    /**
     * Main content area
     *
     * No description available
     */
    public get mainContentArea() : StandardPageData["mainContentArea"] { return this.getProperty("mainContentArea"); }

    /**
     * Keywords
     *
     * No description available
     */
    public get keywords() : StandardPageData["keywords"] { return this.getProperty("keywords"); }

    /**
     * Hide site header
     *
     * No description available
     */
    public get hideSiteHeader() : StandardPageData["hideSiteHeader"] { return this.getProperty("hideSiteHeader"); }

    /**
     * Video
     *
     * No description available
     */
    public get teaserVideo() : StandardPageData["teaserVideo"] { return this.getProperty("teaserVideo"); }

    /**
     * CSS
     *
     * No description available
     */
    public get css() : StandardPageData["css"] { return this.getProperty("css"); }

    /**
     * Title color
     *
     * No description available
     */
    public get titleColor() : StandardPageData["titleColor"] { return this.getProperty("titleColor"); }

    /**
     * Background color
     *
     * No description available
     */
    public get backgroundColor() : StandardPageData["backgroundColor"] { return this.getProperty("backgroundColor"); }

    /**
     * Title opacity (0 to 1)
     *
     * No description available
     */
    public get backgroundOpacity() : StandardPageData["backgroundOpacity"] { return this.getProperty("backgroundOpacity"); }

    /**
     * Background image
     *
     * No description available
     */
    public get backgroundImage() : StandardPageData["backgroundImage"] { return this.getProperty("backgroundImage"); }

    /**
     * Background video
     *
     * No description available
     */
    public get backgroundVideo() : StandardPageData["backgroundVideo"] { return this.getProperty("backgroundVideo"); }

    /**
     * Top padding mode
     *
     * Sets how much padding should be at the top of the standard content
     */
    public get topPaddingMode() : StandardPageData["topPaddingMode"] { return this.getProperty("topPaddingMode"); }

    /**
     * Page description
     *
     * No description available
     */
    public get pageDescription() : StandardPageData["pageDescription"] { return this.getProperty("pageDescription"); }

    /**
     * Hide site footer
     *
     * No description available
     */
    public get hideSiteFooter() : StandardPageData["hideSiteFooter"] { return this.getProperty("hideSiteFooter"); }

    /**
     * Text
     *
     * No description available
     */
    public get teaserText() : StandardPageData["teaserText"] { return this.getProperty("teaserText"); }

    /**
     * Content type
     *
     * No description available
     */
    public get metaContentType() : StandardPageData["metaContentType"] { return this.getProperty("metaContentType"); }

    /**
     * Industry
     *
     * No description available
     */
    public get industry() : StandardPageData["industry"] { return this.getProperty("industry"); }

    /**
     * Author
     *
     * No description available
     */
    public get authorMetaData() : StandardPageData["authorMetaData"] { return this.getProperty("authorMetaData"); }

    /**
     * Disable indexing
     *
     * No description available
     */
    public get disableIndexing() : StandardPageData["disableIndexing"] { return this.getProperty("disableIndexing"); }

    /**
     * Highlight in page list
     *
     * No description available
     */
    public get highlight() : StandardPageData["highlight"] { return this.getProperty("highlight"); }

    /**
     * Text alignment
     *
     * No description available
     */
    public get teaserTextAlignment() : StandardPageData["teaserTextAlignment"] { return this.getProperty("teaserTextAlignment"); }

    /**
     * Color theme
     *
     * No description available
     */
    public get teaserColorTheme() : StandardPageData["teaserColorTheme"] { return this.getProperty("teaserColorTheme"); }

    /**
     * Button label
     *
     * No description available
     */
    public get teaserButtonText() : StandardPageData["teaserButtonText"] { return this.getProperty("teaserButtonText"); }

    /**
     * Button theme
     *
     * No description available
     */
    public get teaserButtonStyle() : StandardPageData["teaserButtonStyle"] { return this.getProperty("teaserButtonStyle"); }

    /**
     * Button color
     *
     * No description available
     */
    public get teaserButtonColor() : StandardPageData["teaserButtonColor"] { return this.getProperty("teaserButtonColor"); }

    /**
     * Button text color
     *
     * No description available
     */
    public get teaserButtonTextColor() : StandardPageData["teaserButtonTextColor"] { return this.getProperty("teaserButtonTextColor"); }

    /**
     * Display hover effect
     *
     * No description available
     */
    public get applyHoverEffect() : StandardPageData["applyHoverEffect"] { return this.getProperty("applyHoverEffect"); }

    /**
     * Padding
     *
     * No description available
     */
    public get padding() : StandardPageData["padding"] { return this.getProperty("padding"); }

    /**
     * Margin
     *
     * No description available
     */
    public get margin() : StandardPageData["margin"] { return this.getProperty("margin"); }

}
