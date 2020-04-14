import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

/**
 * Standard File
 *
 * Used for standard file types such as Word, Excel, PowerPoint or text documents.
 *
 * @GUID 646ece50-3ce7-4f8b-ba33-9924c9adc9c6
 */
export default interface StandardFileData extends IContent {
    /**
     * FileSize
     *
     * No description available
     */
    fileSize: StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface StandardFileProps extends ComponentProps<StandardFileData> {}
