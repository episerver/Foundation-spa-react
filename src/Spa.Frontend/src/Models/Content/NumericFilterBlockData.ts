import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Numeric Filter Block
 *
 * Filter product search blocks by field values
 *
 * @GUID 7747d13c-d029-4cb5-b020-549676123ac4
 */
export default interface NumericFilterBlockData extends Taxonomy.IContent {
    /**
     * Name
     *
     * Name of field in index
     */
    fieldName: ContentDelivery.StringProperty

    /**
     * Operator
     *
     * No description available
     */
    fieldOperator: ContentDelivery.StringProperty

    /**
     * Value
     *
     * The value to filter search results on
     */
    fieldValue: ContentDelivery.NumberProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface NumericFilterBlockProps extends ComponentTypes.AbstractComponentProps<NumericFilterBlockData> {}

export class NumericFilterBlockType extends Taxonomy.AbstractIContent<NumericFilterBlockData> implements NumericFilterBlockData {
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
    public get fieldName() : NumericFilterBlockData["fieldName"] { return this.getProperty("fieldName"); }

    /**
     * Operator
     *
     * No description available
     */
    public get fieldOperator() : NumericFilterBlockData["fieldOperator"] { return this.getProperty("fieldOperator"); }

    /**
     * Value
     *
     * The value to filter search results on
     */
    public get fieldValue() : NumericFilterBlockData["fieldValue"] { return this.getProperty("fieldValue"); }

}
