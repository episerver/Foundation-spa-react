import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * SysRecycleBin
 *
 * Used as recycle bin for the website
 *
 * @GUID 4eea90cd-4210-4115-a399-6d6915554e10
 */
export default interface SysRecycleBinData extends Taxonomy.IContent {
}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface SysRecycleBinProps extends ComponentTypes.AbstractComponentProps<SysRecycleBinData> {}

export class SysRecycleBinType extends Taxonomy.AbstractIContent<SysRecycleBinData> implements SysRecycleBinData {
    protected _typeName : string = "SysRecycleBin";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
    }

}
