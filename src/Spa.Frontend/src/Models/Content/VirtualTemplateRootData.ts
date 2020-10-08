import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * VirtualTemplateRoot
 *
 * No Description available.
 *
 * @GUID 2c25988a-ab55-49db-a248-ede870db2d9d
 */
export default interface VirtualTemplateRootData extends Taxonomy.IContent {
}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface VirtualTemplateRootProps extends ComponentTypes.AbstractComponentProps<VirtualTemplateRootData> {}

export class VirtualTemplateRootType extends Taxonomy.AbstractIContent<VirtualTemplateRootData> implements VirtualTemplateRootData {
    protected _typeName : string = "VirtualTemplateRoot";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
    }

}
