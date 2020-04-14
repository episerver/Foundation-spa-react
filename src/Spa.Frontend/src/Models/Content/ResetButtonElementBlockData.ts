import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

/**
 * ResetButtonElementBlock
 *
 * No Description available.
 *
 * @GUID 0bca37fd-ff33-4b6c-9fb3-2ab64b1d0bc2
 */
export default interface ResetButtonElementBlockData extends IContent {
    /**
     * Label
     *
     * No description available
     */
    label: StringProperty

    /**
     * Description
     *
     * No description available
     */
    description: StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface ResetButtonElementBlockProps extends ComponentProps<ResetButtonElementBlockData> {}
