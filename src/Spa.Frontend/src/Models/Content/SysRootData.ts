import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

/**
 * SysRoot
 *
 * Used as root/welcome page
 *
 * @GUID 3fa7d9e7-877b-11d3-827c-00a024cacfcb
 */
export default interface SysRootData extends IContent {
}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface SysRootProps extends ComponentProps<SysRootData> {}
