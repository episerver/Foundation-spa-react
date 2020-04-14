import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

/**
 * Folder Page
 *
 * A page which allows you to structure pages.
 *
 * @GUID 1bc8e78b-40cc-4efc-a561-a0bba89b51ac
 */
export default interface FolderPageData extends IContent {
}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface FolderPageProps extends ComponentProps<FolderPageData> {}
