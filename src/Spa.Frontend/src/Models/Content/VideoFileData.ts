import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Video File
 *
 * No Description available.
 *
 * @GUID 8a9d9d4b-cd4b-40e8-a777-414cfbda7770
 */
export default interface VideoFileData extends Taxonomy.IContent {
    /**
     * Copyright
     *
     * No description available
     */
    copyright: ContentDelivery.StringProperty

    /**
     * PreviewImage
     *
     * No description available
     */
    previewImage: ContentDelivery.ContentReferenceProperty

    /**
     * FileSize
     *
     * No description available
     */
    fileSize: ContentDelivery.StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface VideoFileProps extends ComponentTypes.AbstractComponentProps<VideoFileData> {}

export class VideoFileType extends Taxonomy.AbstractIContent<VideoFileData> implements VideoFileData {
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
    public get copyright() : VideoFileData["copyright"] { return this.getProperty("copyright"); }

    /**
     * PreviewImage
     *
     * No description available
     */
    public get previewImage() : VideoFileData["previewImage"] { return this.getProperty("previewImage"); }

    /**
     * FileSize
     *
     * No description available
     */
    public get fileSize() : VideoFileData["fileSize"] { return this.getProperty("fileSize"); }

}
