import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Pdf File
 *
 * No Description available.
 *
 * @GUID ee7e1eb6-2b6d-4cc9-8ed1-56ec0cbaa40b
 */
export default interface FoundationPdfFileData extends Taxonomy.IContent {
    /**
     * Height
     *
     * The height of PDF preview embed (px)
     */
    height: ContentDelivery.NumberProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface FoundationPdfFileProps extends ComponentTypes.AbstractComponentProps<FoundationPdfFileData> {}

export class FoundationPdfFileType extends Taxonomy.AbstractIContent<FoundationPdfFileData> implements FoundationPdfFileData {
    protected _typeName : string = "FoundationPdfFile";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'height': 'FloatNumber',
    }

    /**
     * Height
     *
     * The height of PDF preview embed (px)
     */
    public get height() : FoundationPdfFileData["height"] { return this.getProperty("height"); }

}
