import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent, { BaseIContent } from 'Episerver/Models/IContent'
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

export class VideoFileType extends BaseIContent<VideoFileData> implements VideoFileData {
    protected _typeName : string = "VideoFile";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'copyright': 'LongString',
        'previewImage': 'ContentReference',
        'fileSize': 'LongString',
    }

    /**
     * Copyright
     *
     * No description available
     */
    public copyright: StringProperty;

    /**
     * PreviewImage
     *
     * No description available
     */
    public previewImage: ContentReferenceProperty;

    /**
     * FileSize
     *
     * No description available
     */
    public fileSize: StringProperty;

}
