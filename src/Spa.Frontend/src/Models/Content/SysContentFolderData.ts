import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * SysContentFolder
 *
 * Used as content folder
 *
 * @GUID 52f8d1e9-6d87-4db6-a465-41890289fb78
 */
export default interface SysContentFolderData extends Taxonomy.IContent {
}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface SysContentFolderProps extends ComponentTypes.AbstractComponentProps<SysContentFolderData> {}

export class SysContentFolderType extends Taxonomy.AbstractIContent<SysContentFolderData> implements SysContentFolderData {
    protected _typeName : string = "SysContentFolder";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
    }

}
