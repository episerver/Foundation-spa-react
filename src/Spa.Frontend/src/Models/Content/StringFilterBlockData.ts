import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * String Filter Block
 *
 * Filter product search blocks by field values
 *
 * @GUID efcb0aef-5427-49bb-ab1b-2b429a2f2cc3
 */
export default interface StringFilterBlockData extends Taxonomy.IContent {
    /**
     * Name
     *
     * Name of field in index
     */
    fieldName: ContentDelivery.StringProperty

    /**
     * Value
     *
     * The value to filter search results on
     */
    fieldValue: ContentDelivery.StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface StringFilterBlockProps extends ComponentTypes.AbstractComponentProps<StringFilterBlockData> {}

export class StringFilterBlockType extends Taxonomy.AbstractIContent<StringFilterBlockData> implements StringFilterBlockData {
    protected _typeName : string = "StringFilterBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'fieldName': 'LongString',
        'fieldValue': 'LongString',
    }

    /**
     * Name
     *
     * Name of field in index
     */
    public get fieldName() : StringFilterBlockData["fieldName"] { return this.getProperty("fieldName"); }

    /**
     * Value
     *
     * The value to filter search results on
     */
    public get fieldValue() : StringFilterBlockData["fieldValue"] { return this.getProperty("fieldValue"); }

}
