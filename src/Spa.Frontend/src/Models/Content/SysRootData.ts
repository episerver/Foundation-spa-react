import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * SysRoot
 *
 * Used as root/welcome page
 *
 * @GUID 3fa7d9e7-877b-11d3-827c-00a024cacfcb
 */
export default interface SysRootData extends Taxonomy.IContent {
}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface SysRootProps extends ComponentTypes.AbstractComponentProps<SysRootData> {}

export class SysRootType extends Taxonomy.AbstractIContent<SysRootData> implements SysRootData {
    protected _typeName : string = "SysRoot";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
    }

}
