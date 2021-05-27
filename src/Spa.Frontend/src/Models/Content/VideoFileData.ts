import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Video File
 *
 * Used for video file types such as mp4, flv, webm
 *
 * @GUID 8a9d9d4b-cd4b-40e8-a777-414cfbda7770
 */
export default interface VideoFileData extends Taxonomy.IContent {
    /**
     * Preview image
     *
     * No description available
     */
    previewImage: ContentDelivery.ContentReferenceProperty

    /**
     * Copyright
     *
     * No description available
     */
    copyright: ContentDelivery.StringProperty

    /**
     * Display controls
     *
     * No description available
     */
    displayControls: ContentDelivery.BooleanProperty

    /**
     * Autoplay
     *
     * No description available
     */
    autoplay: ContentDelivery.BooleanProperty

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
        'previewImage': 'ContentReference',
        'copyright': 'LongString',
        'displayControls': 'Boolean',
        'autoplay': 'Boolean',
    }

    /**
     * Preview image
     *
     * No description available
     */
    public get previewImage() : VideoFileData["previewImage"] { return this.getProperty("previewImage"); }

    /**
     * Copyright
     *
     * No description available
     */
    public get copyright() : VideoFileData["copyright"] { return this.getProperty("copyright"); }

    /**
     * Display controls
     *
     * No description available
     */
    public get displayControls() : VideoFileData["displayControls"] { return this.getProperty("displayControls"); }

    /**
     * Autoplay
     *
     * No description available
     */
    public get autoplay() : VideoFileData["autoplay"] { return this.getProperty("autoplay"); }

}
