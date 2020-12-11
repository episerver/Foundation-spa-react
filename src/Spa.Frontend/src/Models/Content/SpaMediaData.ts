import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Spa Media Container
 *
 * Storage container for single-page application deployment & delivery.
 *
 * @GUID 3ce3288f-ebf0-4130-addb-37683742230d
 */
export default interface SpaMediaData extends Taxonomy.IContent {
}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface SpaMediaProps extends ComponentTypes.AbstractComponentProps<SpaMediaData> {}

export class SpaMediaType extends Taxonomy.AbstractIContent<SpaMediaData> implements SpaMediaData {
    protected _typeName : string = "SpaMedia";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
    }

}
