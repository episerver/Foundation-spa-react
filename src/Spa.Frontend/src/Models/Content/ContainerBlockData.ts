import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'episerver/Property'
import IContent, { BaseIContent } from 'episerver/Models/IContent'
import ContentLink from 'episerver/Models/ContentLink'
import { ComponentProps } from 'episerver/EpiComponent'

/**
 * Container Block
 *
 * Allow to style individual blocks, as well as groups of blocks
 *
 * @GUID 8bdfac81-1dbd-43b9-a012-522bd67ee8b3
 */
export default interface ContainerBlockData extends IContent {
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
     * Main content area
     *
     * No description available
     */
    mainContentArea: ContentAreaProperty

    /**
     * CSS class
     *
     * No description available
     */
    cssClass: StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface ContainerBlockProps extends ComponentProps<ContainerBlockData> {}

export class ContainerBlockType extends BaseIContent<ContainerBlockData> implements ContainerBlockData {
    protected _typeName : string = "ContainerBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'categories': 'ContentReferenceList',
        'padding': 'LongString',
        'margin': 'LongString',
        'backgroundColor': 'LongString',
        'blockOpacity': 'FloatNumber',
        'mainContentArea': 'ContentArea',
        'cssClass': 'LongString',
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
     * Main content area
     *
     * No description available
     */
    public mainContentArea: ContentAreaProperty;

    /**
     * CSS class
     *
     * No description available
     */
    public cssClass: StringProperty;

}
