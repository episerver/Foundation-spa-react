import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'episerver/Property'
import IContent, { BaseIContent } from 'episerver/Models/IContent'
import ContentLink from 'episerver/Models/ContentLink'
import { ComponentProps } from 'episerver/EpiComponent'

/**
 * Breadcrumb Block
 *
 * Render normal navigation structures as a breadcrumb
 *
 * @GUID de43eb04-0d26-442a-91fc-e36e14a352b6
 */
export default interface BreadcrumbBlockData extends IContent {
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
     * Destination page
     *
     * No description available
     */
    destinationPage: ContentReferenceProperty

    /**
     * Breadcrumb separator
     *
     * No description available
     */
    separator: StringProperty

    /**
     * Alignment option
     *
     * No description available
     */
    alignment: StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface BreadcrumbBlockProps extends ComponentProps<BreadcrumbBlockData> {}

export class BreadcrumbBlockType extends BaseIContent<BreadcrumbBlockData> implements BreadcrumbBlockData {
    protected _typeName : string = "BreadcrumbBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'categories': 'ContentReferenceList',
        'padding': 'LongString',
        'margin': 'LongString',
        'backgroundColor': 'LongString',
        'blockOpacity': 'FloatNumber',
        'destinationPage': 'PageReference',
        'separator': 'LongString',
        'alignment': 'LongString',
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
     * Destination page
     *
     * No description available
     */
    public destinationPage: ContentReferenceProperty;

    /**
     * Breadcrumb separator
     *
     * No description available
     */
    public separator: StringProperty;

    /**
     * Alignment option
     *
     * No description available
     */
    public alignment: StringProperty;

}
