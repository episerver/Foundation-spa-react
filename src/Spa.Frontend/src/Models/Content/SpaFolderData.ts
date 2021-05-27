import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * SpaFolder
 *
 * No Description available.
 *
 * @GUID 3ce3288f-ebf0-4130-addb-37683742230e
 */
export default interface SpaFolderData extends Taxonomy.IContent {
}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface SpaFolderProps extends ComponentTypes.AbstractComponentProps<SpaFolderData> {}

export class SpaFolderType extends Taxonomy.AbstractIContent<SpaFolderData> implements SpaFolderData {
    protected _typeName : string = "SpaFolder";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
    }

}
