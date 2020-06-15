import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from '@episerver/spa-core/Property'
import IContent, { BaseIContent } from '@episerver/spa-core/Models/IContent'
import ContentLink from '@episerver/spa-core/Models/ContentLink'
import { ComponentProps } from '@episerver/spa-core/EpiComponent'

/**
 * SysContentFolder
 *
 * Used as content folder
 *
 * @GUID 52f8d1e9-6d87-4db6-a465-41890289fb78
 */
export default interface SysContentFolderData extends IContent {
}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface SysContentFolderProps extends ComponentProps<SysContentFolderData> {}

export class SysContentFolderType extends BaseIContent<SysContentFolderData> implements SysContentFolderData {
    protected _typeName : string = "SysContentFolder";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
    }

}
