import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Folder Page
 *
 * A page which allows you to structure pages.
 *
 * @GUID 1bc8e78b-40cc-4efc-a561-a0bba89b51ac
 */
export default interface FolderPageData extends Taxonomy.IContent {
}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface FolderPageProps extends ComponentTypes.AbstractComponentProps<FolderPageData> {}

export class FolderPageType extends Taxonomy.AbstractIContent<FolderPageData> implements FolderPageData {
    protected _typeName : string = "FolderPage";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
    }

}
