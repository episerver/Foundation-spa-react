import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

/**
 * CategoryRoot
 *
 * No Description available.
 *
 * @GUID c29bf090-05bf-43eb-98d6-91575bce4441
 */
export default interface CategoryRootData extends IContent {
    /**
     * Description
     *
     * No description available
     */
    description: StringProperty

    /**
     * IsSelectable
     *
     * No description available
     */
    isSelectable: BooleanProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface CategoryRootProps extends ComponentProps<CategoryRootData> {}