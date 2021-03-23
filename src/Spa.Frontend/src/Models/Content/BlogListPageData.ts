import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Blog List Page
 *
 * Blog List Page for dates such as year and month
 *
 * @GUID eaadaff2-3e89-4117-adeb-f8d43565d2f4
 */
export default interface BlogListPageData extends Taxonomy.IContent {
    /**
     * Heading
     *
     * No description available
     */
    heading: ContentDelivery.StringProperty

    /**
     * Root
     *
     * No description available
     */
    root: ContentDelivery.ContentReferenceProperty

    /**
     * Categories
     *
     * Categories associated with this content.
     */
    categories: ContentDelivery.ContentReferenceListProperty

    /**
     * Include all levels
     *
     * No description available
     */
    includeAllLevels: ContentDelivery.BooleanProperty

    /**
     * Sort order
     *
     * No description available
     */
    sortOrder: ContentDelivery.NumberProperty

    /**
     * Include publish date
     *
     * No description available
     */
    includePublishDate: ContentDelivery.BooleanProperty

    /**
     * Include teaser text
     *
     * No description available
     */
    includeTeaserText: ContentDelivery.BooleanProperty

    /**
     * Teaser ratio (width-height)
     *
     * No description available
     */
    teaserRatio: ContentDelivery.StringProperty

    /**
     * Category filter (match all selected)
     *
     * Categories to filter the list on
     */
    categoryListFilter: ContentDelivery.ContentReferenceListProperty

    /**
     * Template of blogs listing
     *
     * No description available
     */
    template: ContentDelivery.StringProperty

    /**
     * Preview option (not available in the Grid template)
     *
     * No description available
     */
    previewOption: ContentDelivery.StringProperty

    /**
     * Overlay color (hex or rgba)
     *
     * Apply for Card template
     */
    overlayColor: ContentDelivery.StringProperty

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
     * Overlay text color (hex or rgba)
     *
     * Apply for Card template
     */
    overlayTextColor: ContentDelivery.StringProperty

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
export interface BlogListPageProps extends ComponentTypes.AbstractComponentProps<BlogListPageData> {}

export class BlogListPageType extends Taxonomy.AbstractIContent<BlogListPageData> implements BlogListPageData {
    protected _typeName : string = "BlogListPage";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'heading': 'LongString',
        'root': 'PageReference',
        'categories': 'ContentReferenceList',
        'includeAllLevels': 'Boolean',
        'sortOrder': 'Number',
        'includePublishDate': 'Boolean',
        'includeTeaserText': 'Boolean',
        'teaserRatio': 'LongString',
        'categoryListFilter': 'ContentReferenceList',
        'template': 'LongString',
        'previewOption': 'LongString',
        'overlayColor': 'LongString',
        'mainBody': 'XhtmlString',
        'metaTitle': 'LongString',
        'excludeFromSearch': 'Boolean',
        'pageImage': 'ContentReference',
        'cssFiles': 'LinkCollection',
        'scriptFiles': 'LinkCollection',
        'overlayTextColor': 'LongString',
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
     * Heading
     *
     * No description available
     */
    public get heading() : BlogListPageData["heading"] { return this.getProperty("heading"); }

    /**
     * Root
     *
     * No description available
     */
    public get root() : BlogListPageData["root"] { return this.getProperty("root"); }

    /**
     * Categories
     *
     * Categories associated with this content.
     */
    public get categories() : BlogListPageData["categories"] { return this.getProperty("categories"); }

    /**
     * Include all levels
     *
     * No description available
     */
    public get includeAllLevels() : BlogListPageData["includeAllLevels"] { return this.getProperty("includeAllLevels"); }

    /**
     * Sort order
     *
     * No description available
     */
    public get sortOrder() : BlogListPageData["sortOrder"] { return this.getProperty("sortOrder"); }

    /**
     * Include publish date
     *
     * No description available
     */
    public get includePublishDate() : BlogListPageData["includePublishDate"] { return this.getProperty("includePublishDate"); }

    /**
     * Include teaser text
     *
     * No description available
     */
    public get includeTeaserText() : BlogListPageData["includeTeaserText"] { return this.getProperty("includeTeaserText"); }

    /**
     * Teaser ratio (width-height)
     *
     * No description available
     */
    public get teaserRatio() : BlogListPageData["teaserRatio"] { return this.getProperty("teaserRatio"); }

    /**
     * Category filter (match all selected)
     *
     * Categories to filter the list on
     */
    public get categoryListFilter() : BlogListPageData["categoryListFilter"] { return this.getProperty("categoryListFilter"); }

    /**
     * Template of blogs listing
     *
     * No description available
     */
    public get template() : BlogListPageData["template"] { return this.getProperty("template"); }

    /**
     * Preview option (not available in the Grid template)
     *
     * No description available
     */
    public get previewOption() : BlogListPageData["previewOption"] { return this.getProperty("previewOption"); }

    /**
     * Overlay color (hex or rgba)
     *
     * Apply for Card template
     */
    public get overlayColor() : BlogListPageData["overlayColor"] { return this.getProperty("overlayColor"); }

    /**
     * Main body
     *
     * No description available
     */
    public get mainBody() : BlogListPageData["mainBody"] { return this.getProperty("mainBody"); }

    /**
     * Title
     *
     * No description available
     */
    public get metaTitle() : BlogListPageData["metaTitle"] { return this.getProperty("metaTitle"); }

    /**
     * Exclude from results
     *
     * This will determine whether or not to show on search
     */
    public get excludeFromSearch() : BlogListPageData["excludeFromSearch"] { return this.getProperty("excludeFromSearch"); }

    /**
     * Image
     *
     * No description available
     */
    public get pageImage() : BlogListPageData["pageImage"] { return this.getProperty("pageImage"); }

    /**
     * CSS files
     *
     * No description available
     */
    public get cssFiles() : BlogListPageData["cssFiles"] { return this.getProperty("cssFiles"); }

    /**
     * Script files
     *
     * No description available
     */
    public get scriptFiles() : BlogListPageData["scriptFiles"] { return this.getProperty("scriptFiles"); }

    /**
     * Overlay text color (hex or rgba)
     *
     * Apply for Card template
     */
    public get overlayTextColor() : BlogListPageData["overlayTextColor"] { return this.getProperty("overlayTextColor"); }

    /**
     * Main content area
     *
     * No description available
     */
    public get mainContentArea() : BlogListPageData["mainContentArea"] { return this.getProperty("mainContentArea"); }

    /**
     * Keywords
     *
     * No description available
     */
    public get keywords() : BlogListPageData["keywords"] { return this.getProperty("keywords"); }

    /**
     * Hide site header
     *
     * No description available
     */
    public get hideSiteHeader() : BlogListPageData["hideSiteHeader"] { return this.getProperty("hideSiteHeader"); }

    /**
     * Video
     *
     * No description available
     */
    public get teaserVideo() : BlogListPageData["teaserVideo"] { return this.getProperty("teaserVideo"); }

    /**
     * CSS
     *
     * No description available
     */
    public get css() : BlogListPageData["css"] { return this.getProperty("css"); }

    /**
     * Scripts
     *
     * No description available
     */
    public get scripts() : BlogListPageData["scripts"] { return this.getProperty("scripts"); }

    /**
     * Page description
     *
     * No description available
     */
    public get pageDescription() : BlogListPageData["pageDescription"] { return this.getProperty("pageDescription"); }

    /**
     * Hide site footer
     *
     * No description available
     */
    public get hideSiteFooter() : BlogListPageData["hideSiteFooter"] { return this.getProperty("hideSiteFooter"); }

    /**
     * Text
     *
     * No description available
     */
    public get teaserText() : BlogListPageData["teaserText"] { return this.getProperty("teaserText"); }

    /**
     * Content type
     *
     * No description available
     */
    public get metaContentType() : BlogListPageData["metaContentType"] { return this.getProperty("metaContentType"); }

    /**
     * Industry
     *
     * No description available
     */
    public get industry() : BlogListPageData["industry"] { return this.getProperty("industry"); }

    /**
     * Author
     *
     * No description available
     */
    public get authorMetaData() : BlogListPageData["authorMetaData"] { return this.getProperty("authorMetaData"); }

    /**
     * Disable indexing
     *
     * No description available
     */
    public get disableIndexing() : BlogListPageData["disableIndexing"] { return this.getProperty("disableIndexing"); }

    /**
     * Highlight in page list
     *
     * No description available
     */
    public get highlight() : BlogListPageData["highlight"] { return this.getProperty("highlight"); }

    /**
     * Text alignment
     *
     * No description available
     */
    public get teaserTextAlignment() : BlogListPageData["teaserTextAlignment"] { return this.getProperty("teaserTextAlignment"); }

    /**
     * Color theme
     *
     * No description available
     */
    public get teaserColorTheme() : BlogListPageData["teaserColorTheme"] { return this.getProperty("teaserColorTheme"); }

    /**
     * Button label
     *
     * No description available
     */
    public get teaserButtonText() : BlogListPageData["teaserButtonText"] { return this.getProperty("teaserButtonText"); }

    /**
     * Button theme
     *
     * No description available
     */
    public get teaserButtonStyle() : BlogListPageData["teaserButtonStyle"] { return this.getProperty("teaserButtonStyle"); }

    /**
     * Button color
     *
     * No description available
     */
    public get teaserButtonColor() : BlogListPageData["teaserButtonColor"] { return this.getProperty("teaserButtonColor"); }

    /**
     * Button text color
     *
     * No description available
     */
    public get teaserButtonTextColor() : BlogListPageData["teaserButtonTextColor"] { return this.getProperty("teaserButtonTextColor"); }

    /**
     * Display hover effect
     *
     * No description available
     */
    public get applyHoverEffect() : BlogListPageData["applyHoverEffect"] { return this.getProperty("applyHoverEffect"); }

    /**
     * Padding
     *
     * No description available
     */
    public get padding() : BlogListPageData["padding"] { return this.getProperty("padding"); }

    /**
     * Margin
     *
     * No description available
     */
    public get margin() : BlogListPageData["margin"] { return this.getProperty("margin"); }

}
