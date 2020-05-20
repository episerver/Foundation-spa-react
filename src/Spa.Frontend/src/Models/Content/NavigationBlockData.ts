import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'episerver/Property'
import IContent, { BaseIContent } from 'episerver/Models/IContent'
import ContentLink from 'episerver/Models/ContentLink'
import { ComponentProps } from 'episerver/EpiComponent'

/**
 * Navigation Block
 *
 * Render normal left/right navigation structures
 *
 * @GUID 7c53f707-c932-4fdd-a654-37ff2a1258eb
 */
export default interface NavigationBlockData extends IContent {
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
     * Root page
     *
     * No description available
     */
    rootPage: ContentReferenceProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface NavigationBlockProps extends ComponentProps<NavigationBlockData> {}

export class NavigationBlockType extends BaseIContent<NavigationBlockData> implements NavigationBlockData {
    protected _typeName : string = "NavigationBlock";
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
        'rootPage': 'PageReference',
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
     * Root page
     *
     * No description available
     */
    public rootPage: ContentReferenceProperty;

}
