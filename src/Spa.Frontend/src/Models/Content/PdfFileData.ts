import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from '@episerver/spa-core/Property'
import IContent, { BaseIContent } from '@episerver/spa-core/Models/IContent'
import ContentLink from '@episerver/spa-core/Models/ContentLink'
import { ComponentProps } from '@episerver/spa-core/EpiComponent'

/**
 * PdfFile
 *
 * Using to preview pdf files in system
 *
 * @GUID 0a89e464-56d4-449f-aea8-2bf774ab8790
 */
export default interface PdfFileData extends IContent {
}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface PdfFileProps extends ComponentProps<PdfFileData> {}

export class PdfFileType extends BaseIContent<PdfFileData> implements PdfFileData {
    protected _typeName : string = "PdfFile";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
    }

}
