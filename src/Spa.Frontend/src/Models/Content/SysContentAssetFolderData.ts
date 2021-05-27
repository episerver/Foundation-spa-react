import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * SysContentAssetFolder
 *
 * Used as a folder for content assets
 *
 * @GUID e9ab78a3-1bbf-48ef-a8d4-1c1f98e80d91
 */
export default interface SysContentAssetFolderData extends Taxonomy.IContent {
}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface SysContentAssetFolderProps extends ComponentTypes.AbstractComponentProps<SysContentAssetFolderData> {}

export class SysContentAssetFolderType extends Taxonomy.AbstractIContent<SysContentAssetFolderData> implements SysContentAssetFolderData {
    protected _typeName : string = "SysContentAssetFolder";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
    }

}
