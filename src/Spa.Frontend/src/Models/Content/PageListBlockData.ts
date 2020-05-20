import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'episerver/Property'
import IContent, { BaseIContent } from 'episerver/Models/IContent'
import ContentLink from 'episerver/Models/ContentLink'
import { ComponentProps } from 'episerver/EpiComponent'

/**
 * Page List Block
 *
 * A block that lists a bunch of pages
 *
 * @GUID 30685434-33de-42af-88a7-3126b936aead
 */
export default interface PageListBlockData extends IContent {
    /**
     * Categories
     *
     * Categories associated with this content
     */
    categories: Property<Array<ContentLink>>

    /**
     * Padding
     *
     * No description available
     */
    padding: StringProperty

    /**
     * Margin
     *
     * No description available
     */
    margin: StringProperty

    /**
     * Background color
     *
     * No description available
     */
    backgroundColor: StringProperty

    /**
     * Block opacity (0 to 1)
     *
     * No description available
     */
    blockOpacity: NumberProperty

    /**
     * Heading
     *
     * No description available
     */
    heading: StringProperty

    /**
     * Include publish date
     *
     * No description available
     */
    includePublishDate: BooleanProperty

    /**
     * Include teaser text
     *
     * No description available
     */
    includeTeaserText: BooleanProperty

    /**
     * Number of results
     *
     * No description available
     */
    count: NumberProperty

    /**
     * Sort order
     *
     * No description available
     */
    sortOrder: NumberProperty

    /**
     * Root
     *
     * No description available
     */
    root: ContentReferenceProperty

    /**
     * Filter by page type
     *
     * No description available
     */
    pageTypeFilter: Property<any> // Original type: PageType

    /**
     * Filter by category
     *
     * Categories to filter the list on
     */
    categoryListFilter: Property<Array<ContentLink>>

    /**
     * Include all levels
     *
     * No description available
     */
    recursive: BooleanProperty

    /**
     * Template of pages listing
     *
     * No description available
     */
    template: StringProperty

    /**
     * Preview option (not available in the Grid template)
     *
     * No description available
     */
    previewOption: StringProperty

    /**
     * Overlay color (hex or rgba)
     *
     * Apply for Card template
     */
    overlayColor: StringProperty

    /**
     * Overlay text color (hex or rgba)
     *
     * Apply for Card template
     */
    overlayTextColor: StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface PageListBlockProps extends ComponentProps<PageListBlockData> {}

export class PageListBlockType extends BaseIContent<PageListBlockData> implements PageListBlockData {
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
        'root': 'PageReference',
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
    public categories: Property<Array<ContentLink>>;

    /**
     * Padding
     *
     * No description available
     */
    public padding: StringProperty;

    /**
     * Margin
     *
     * No description available
     */
    public margin: StringProperty;

    /**
     * Background color
     *
     * No description available
     */
    public backgroundColor: StringProperty;

    /**
     * Block opacity (0 to 1)
     *
     * No description available
     */
    public blockOpacity: NumberProperty;

    /**
     * Heading
     *
     * No description available
     */
    public heading: StringProperty;

    /**
     * Include publish date
     *
     * No description available
     */
    public includePublishDate: BooleanProperty;

    /**
     * Include teaser text
     *
     * No description available
     */
    public includeTeaserText: BooleanProperty;

    /**
     * Number of results
     *
     * No description available
     */
    public count: NumberProperty;

    /**
     * Sort order
     *
     * No description available
     */
    public sortOrder: NumberProperty;

    /**
     * Root
     *
     * No description available
     */
    public root: ContentReferenceProperty;

    /**
     * Filter by page type
     *
     * No description available
     */
    public pageTypeFilter: Property<any> // Original type: PageType;

    /**
     * Filter by category
     *
     * Categories to filter the list on
     */
    public categoryListFilter: Property<Array<ContentLink>>;

    /**
     * Include all levels
     *
     * No description available
     */
    public recursive: BooleanProperty;

    /**
     * Template of pages listing
     *
     * No description available
     */
    public template: StringProperty;

    /**
     * Preview option (not available in the Grid template)
     *
     * No description available
     */
    public previewOption: StringProperty;

    /**
     * Overlay color (hex or rgba)
     *
     * Apply for Card template
     */
    public overlayColor: StringProperty;

    /**
     * Overlay text color (hex or rgba)
     *
     * Apply for Card template
     */
    public overlayTextColor: StringProperty;

}
