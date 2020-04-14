import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

/**
 * Video File
 *
 * No Description available.
 *
 * @GUID 8a9d9d4b-cd4b-40e8-a777-414cfbda7770
 */
export default interface VideoFileData extends IContent {
    /**
     * Copyright
     *
     * No description available
     */
    copyright: StringProperty

    /**
     * PreviewImage
     *
     * No description available
     */
    previewImage: ContentReferenceProperty

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
export interface VideoFileProps extends ComponentProps<VideoFileData> {}
