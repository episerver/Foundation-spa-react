import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Page List Block
 *
 * A block that lists a bunch of pages
 *
 * @GUID 30685434-33de-42af-88a7-3126b936aead
 */
export default interface PageListBlockData extends Taxonomy.IContent {
    /**
     * Categories
     *
     * Categories associated with this content
     */
    categories: ContentDelivery.ContentReferenceListProperty

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

    /**
     * Background color
     *
     * No description available
     */
    backgroundColor: ContentDelivery.StringProperty

    /**
     * Block opacity (0 to 1)
     *
     * No description available
     */
    blockOpacity: ContentDelivery.NumberProperty

    /**
     * Heading
     *
     * No description available
     */
    heading: ContentDelivery.StringProperty

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
     * Number of results
     *
     * No description available
     */
    count: ContentDelivery.NumberProperty

    /**
     * Sort order
     *
     * No description available
     */
    sortOrder: ContentDelivery.NumberProperty

    /**
     * Roots
     *
     * No description available
     */
    roots: ContentDelivery.ContentAreaProperty

    /**
     * Filter by page type
     *
     * No description available
     */
    pageTypeFilter: ContentDelivery.Property<any> // Original type: PageType

    /**
     * Filter by category
     *
     * Categories to filter the list on
     */
    categoryListFilter: ContentDelivery.ContentReferenceListProperty

    /**
     * Include all levels
     *
     * No description available
     */
    recursive: ContentDelivery.BooleanProperty

    /**
     * Template of pages listing
     *
     * No description available
     */
    template: ContentDelivery.StringProperty

    /**
     * Preview option (only available in 'Image on the top' templates)
     *
     * No description available
     */
    previewOption: ContentDelivery.StringProperty

    /**
     * Overlay color (only for Card template)
     *
     * Apply for Card template
     */
    overlayColor: ContentDelivery.StringProperty

    /**
     * Overlay text color (only for Card template)
     *
     * Apply for Card template
     */
    overlayTextColor: ContentDelivery.StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface PageListBlockProps extends ComponentTypes.AbstractComponentProps<PageListBlockData> {}

export class PageListBlockType extends Taxonomy.AbstractIContent<PageListBlockData> implements PageListBlockData {
    protected _typeName : string = "PageListBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'categories': 'ContentReferenceList',
        'padding': 'LongString',
        'margin': 'LongString',
        'backgroundColor': 'LongString',
        'blockOpacity': 'FloatNumber',
        'heading': 'LongString',
        'includePublishDate': 'Boolean',
        'includeTeaserText': 'Boolean',
        'count': 'Number',
        'sortOrder': 'Number',
        'roots': 'ContentArea',
        'pageTypeFilter': 'PageType',
        'categoryListFilter': 'ContentReferenceList',
        'recursive': 'Boolean',
        'template': 'LongString',
        'previewOption': 'LongString',
        'overlayColor': 'LongString',
        'overlayTextColor': 'LongString',
    }

    /**
     * Categories
     *
     * Categories associated with this content
     */
    public get categories() : PageListBlockData["categories"] { return this.getProperty("categories"); }

    /**
     * Padding
     *
     * No description available
     */
    public get padding() : PageListBlockData["padding"] { return this.getProperty("padding"); }

    /**
     * Margin
     *
     * No description available
     */
    public get margin() : PageListBlockData["margin"] { return this.getProperty("margin"); }

    /**
     * Background color
     *
     * No description available
     */
    public get backgroundColor() : PageListBlockData["backgroundColor"] { return this.getProperty("backgroundColor"); }

    /**
     * Block opacity (0 to 1)
     *
     * No description available
     */
    public get blockOpacity() : PageListBlockData["blockOpacity"] { return this.getProperty("blockOpacity"); }

    /**
     * Heading
     *
     * No description available
     */
    public get heading() : PageListBlockData["heading"] { return this.getProperty("heading"); }

    /**
     * Include publish date
     *
     * No description available
     */
    public get includePublishDate() : PageListBlockData["includePublishDate"] { return this.getProperty("includePublishDate"); }

    /**
     * Include teaser text
     *
     * No description available
     */
    public get includeTeaserText() : PageListBlockData["includeTeaserText"] { return this.getProperty("includeTeaserText"); }

    /**
     * Number of results
     *
     * No description available
     */
    public get count() : PageListBlockData["count"] { return this.getProperty("count"); }

    /**
     * Sort order
     *
     * No description available
     */
    public get sortOrder() : PageListBlockData["sortOrder"] { return this.getProperty("sortOrder"); }

    /**
     * Roots
     *
     * No description available
     */
    public get roots() : PageListBlockData["roots"] { return this.getProperty("roots"); }

    /**
     * Filter by page type
     *
     * No description available
     */
    public get pageTypeFilter() : PageListBlockData["pageTypeFilter"] { return this.getProperty("pageTypeFilter"); }

    /**
     * Filter by category
     *
     * Categories to filter the list on
     */
    public get categoryListFilter() : PageListBlockData["categoryListFilter"] { return this.getProperty("categoryListFilter"); }

    /**
     * Include all levels
     *
     * No description available
     */
    public get recursive() : PageListBlockData["recursive"] { return this.getProperty("recursive"); }

    /**
     * Template of pages listing
     *
     * No description available
     */
    public get template() : PageListBlockData["template"] { return this.getProperty("template"); }

    /**
     * Preview option (only available in 'Image on the top' templates)
     *
     * No description available
     */
    public get previewOption() : PageListBlockData["previewOption"] { return this.getProperty("previewOption"); }

    /**
     * Overlay color (only for Card template)
     *
     * Apply for Card template
     */
    public get overlayColor() : PageListBlockData["overlayColor"] { return this.getProperty("overlayColor"); }

    /**
     * Overlay text color (only for Card template)
     *
     * Apply for Card template
     */
    public get overlayTextColor() : PageListBlockData["overlayTextColor"] { return this.getProperty("overlayTextColor"); }

}
