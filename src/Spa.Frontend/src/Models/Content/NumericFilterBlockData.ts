import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'
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
