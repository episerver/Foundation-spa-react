import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

/**
 * SysRecycleBin
 *
 * Used as recycle bin for the website
 *
 * @GUID 4eea90cd-4210-4115-a399-6d6915554e10
 */
export default interface SysRecycleBinData extends IContent {
}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface SysRecycleBinProps extends ComponentProps<SysRecycleBinData> {}
