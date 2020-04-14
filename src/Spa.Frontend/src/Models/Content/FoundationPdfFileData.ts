import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

/**
 * Pdf File
 *
 * No Description available.
 *
 * @GUID ee7e1eb6-2b6d-4cc9-8ed1-56ec0cbaa40b
 */
export default interface FoundationPdfFileData extends IContent {
    /**
     * Height
     *
     * The height of PDF preview embed (px)
     */
    height: NumberProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface FoundationPdfFileProps extends ComponentProps<FoundationPdfFileData> {}
