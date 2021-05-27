import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * PdfFile
 *
 * Using to preview pdf files in system
 *
 * @GUID 0a89e464-56d4-449f-aea8-2bf774ab8790
 */
export default interface PdfFileData extends Taxonomy.IContent {
}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface PdfFileProps extends ComponentTypes.AbstractComponentProps<PdfFileData> {}

export class PdfFileType extends Taxonomy.AbstractIContent<PdfFileData> implements PdfFileData {
    protected _typeName : string = "PdfFile";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
    }

}
