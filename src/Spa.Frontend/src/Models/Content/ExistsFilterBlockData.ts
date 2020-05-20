import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'episerver/Property'
import IContent, { BaseIContent } from 'episerver/Models/IContent'
import ContentLink from 'episerver/Models/ContentLink'
import { ComponentProps } from 'episerver/EpiComponent'

/**
 * Exists Filter Block
 *
 * Filter product that has a value for the given field
 *
 * @GUID e93c9a50-4b62-4116-8e56-1df84ab93ef7
 */
export default interface ExistsFilterBlockData extends IContent {
    /**
     * Name
     *
     * Name of field in index
     */
    fieldName: StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface ExistsFilterBlockProps extends ComponentProps<ExistsFilterBlockData> {}

export class ExistsFilterBlockType extends BaseIContent<ExistsFilterBlockData> implements ExistsFilterBlockData {
    protected _typeName : string = "ExistsFilterBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'fieldName': 'LongString',
    }

    /**
     * Name
     *
     * Name of field in index
     */
    public fieldName: StringProperty;

}
