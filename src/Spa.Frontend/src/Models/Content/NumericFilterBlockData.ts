import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent, { BaseIContent } from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

/**
 * Numeric Filter Block
 *
 * Filter product search blocks by field values
 *
 * @GUID 7747d13c-d029-4cb5-b020-549676123ac4
 */
export default interface NumericFilterBlockData extends IContent {
    /**
     * Name
     *
     * Name of field in index
     */
    fieldName: StringProperty

    /**
     * Operator
     *
     * No description available
     */
    fieldOperator: StringProperty

    /**
     * Value
     *
     * The value to filter search results on
     */
    fieldValue: NumberProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface NumericFilterBlockProps extends ComponentProps<NumericFilterBlockData> {}

export class NumericFilterBlockType extends BaseIContent<NumericFilterBlockData> implements NumericFilterBlockData {
    protected _typeName : string = "NumericFilterBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'fieldName': 'LongString',
        'fieldOperator': 'LongString',
        'fieldValue': 'FloatNumber',
    }

    /**
     * Name
     *
     * Name of field in index
     */
    public fieldName: StringProperty;

    /**
     * Operator
     *
     * No description available
     */
    public fieldOperator: StringProperty;

    /**
     * Value
     *
     * The value to filter search results on
     */
    public fieldValue: NumberProperty;

}
