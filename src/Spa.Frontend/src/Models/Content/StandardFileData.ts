import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'episerver/Property'
import IContent, { BaseIContent } from 'episerver/Models/IContent'
import ContentLink from 'episerver/Models/ContentLink'
import { ComponentProps } from 'episerver/EpiComponent'

/**
 * Standard File
 *
 * Used for standard file types such as Word, Excel, PowerPoint or text documents.
 *
 * @GUID 646ece50-3ce7-4f8b-ba33-9924c9adc9c6
 */
export default interface StandardFileData extends IContent {
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
export interface StandardFileProps extends ComponentProps<StandardFileData> {}

export class StandardFileType extends BaseIContent<StandardFileData> implements StandardFileData {
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
    public fileSize: StringProperty;

}
