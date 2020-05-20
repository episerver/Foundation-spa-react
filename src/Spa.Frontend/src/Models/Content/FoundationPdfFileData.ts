import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'episerver/Property'
import IContent, { BaseIContent } from 'episerver/Models/IContent'
import ContentLink from 'episerver/Models/ContentLink'
import { ComponentProps } from 'episerver/EpiComponent'

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

export class FoundationPdfFileType extends BaseIContent<FoundationPdfFileData> implements FoundationPdfFileData {
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
    public height: NumberProperty;

}
