import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

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
