import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

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
