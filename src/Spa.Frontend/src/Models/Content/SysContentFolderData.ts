import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

/**
 * SysContentFolder
 *
 * Used as content folder
 *
 * @GUID 52f8d1e9-6d87-4db6-a465-41890289fb78
 */
export default interface SysContentFolderData extends IContent {
}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface SysContentFolderProps extends ComponentProps<SysContentFolderData> {}
