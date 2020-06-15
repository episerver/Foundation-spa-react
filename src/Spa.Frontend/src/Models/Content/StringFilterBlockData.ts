import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from '@episerver/spa-core/Property'
import IContent, { BaseIContent } from '@episerver/spa-core/Models/IContent'
import ContentLink from '@episerver/spa-core/Models/ContentLink'
import { ComponentProps } from '@episerver/spa-core/EpiComponent'

/**
 * String Filter Block
 *
 * Filter product search blocks by field values
 *
 * @GUID efcb0aef-5427-49bb-ab1b-2b429a2f2cc3
 */
export default interface StringFilterBlockData extends IContent {
    /**
     * Name
     *
     * Name of field in index
     */
    fieldName: StringProperty

    /**
     * Value
     *
     * The value to filter search results on
     */
    fieldValue: StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface StringFilterBlockProps extends ComponentProps<StringFilterBlockData> {}

export class StringFilterBlockType extends BaseIContent<StringFilterBlockData> implements StringFilterBlockData {
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
    public fieldName: StringProperty;

    /**
     * Value
     *
     * The value to filter search results on
     */
    public fieldValue: StringProperty;

}
