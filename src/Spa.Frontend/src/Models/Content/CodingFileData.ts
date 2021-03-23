import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Coding File
 *
 * Used for coding file types such as Css, Javascript.
 *
 * @GUID cbbfab00-eac0-40ab-b9bf-2966b901841e
 */
export default interface CodingFileData extends Taxonomy.IContent {
    /**
     * Description
     *
     * No description available
     */
    description: ContentDelivery.StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface CodingFileProps extends ComponentTypes.AbstractComponentProps<CodingFileData> {}

export class CodingFileType extends Taxonomy.AbstractIContent<CodingFileData> implements CodingFileData {
    protected _typeName : string = "CodingFile";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'description': 'LongString',
    }

    /**
     * Description
     *
     * No description available
     */
    public get description() : CodingFileData["description"] { return this.getProperty("description"); }

}
