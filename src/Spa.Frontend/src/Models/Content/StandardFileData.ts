import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Standard File
 *
 * Used for standard file types such as Word, Excel, PowerPoint or text documents.
 *
 * @GUID 646ece50-3ce7-4f8b-ba33-9924c9adc9c6
 */
export default interface StandardFileData extends Taxonomy.IContent {
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
export interface StandardFileProps extends ComponentTypes.AbstractComponentProps<StandardFileData> {}

export class StandardFileType extends Taxonomy.AbstractIContent<StandardFileData> implements StandardFileData {
    protected _typeName : string = "StandardFile";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'fileSize': 'LongString',
    }

    /**
     * FileSize
     *
     * No description available
     */
    public get fileSize() : StandardFileData["fileSize"] { return this.getProperty("fileSize"); }

}
