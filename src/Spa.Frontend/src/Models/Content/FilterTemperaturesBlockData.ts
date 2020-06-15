import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from '@episerver/spa-core/Property'
import IContent, { BaseIContent } from '@episerver/spa-core/Models/IContent'
import ContentLink from '@episerver/spa-core/Models/ContentLink'
import { ComponentProps } from '@episerver/spa-core/EpiComponent'

/**
 * Filter Temperatures Block
 *
 * Temperature slider for locations
 *
 * @GUID 28629b4b-9475-4c44-9c15-31961391f166
 */
export default interface FilterTemperaturesBlockData extends IContent {
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
     * Filter title
     *
     * No description available
     */
    filterTitle: StringProperty

    /**
     * All condition text
     *
     * No description available
     */
    allConditionText: StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface FilterTemperaturesBlockProps extends ComponentProps<FilterTemperaturesBlockData> {}

export class FilterTemperaturesBlockType extends BaseIContent<FilterTemperaturesBlockData> implements FilterTemperaturesBlockData {
    protected _typeName : string = "FilterTemperaturesBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'categories': 'ContentReferenceList',
        'padding': 'LongString',
        'margin': 'LongString',
        'backgroundColor': 'LongString',
        'blockOpacity': 'FloatNumber',
        'filterTitle': 'LongString',
        'allConditionText': 'LongString',
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
     * Filter title
     *
     * No description available
     */
    public filterTitle: StringProperty;

    /**
     * All condition text
     *
     * No description available
     */
    public allConditionText: StringProperty;

}
