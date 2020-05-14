import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent, { BaseIContent } from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

/**
 * SysContentAssetFolder
 *
 * Used as a folder for content assets
 *
 * @GUID e9ab78a3-1bbf-48ef-a8d4-1c1f98e80d91
 */
export default interface SysContentAssetFolderData extends IContent {
}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface SysContentAssetFolderProps extends ComponentProps<SysContentAssetFolderData> {}

export class SysContentAssetFolderType extends BaseIContent<SysContentAssetFolderData> implements SysContentAssetFolderData {
    protected _typeName : string = "SysContentAssetFolder";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
    }

}
