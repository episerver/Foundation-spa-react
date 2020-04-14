import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

/**
 * Virtual template root
 *
 * The root where all virtual templates are saved
 *
 * @GUID 2c25988a-ab55-49db-a248-ede870db2d9d
 */
export default interface VirtualTemplateRootData extends IContent {
}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface VirtualTemplateRootProps extends ComponentProps<VirtualTemplateRootData> {}
