import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * SettingsFolder
 *
 * No Description available.
 *
 * @GUID c709627f-ca9f-4c77-b0fb-8563287ebd93
 */
export default interface SettingsFolderData extends Taxonomy.IContent {
}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface SettingsFolderProps extends ComponentTypes.AbstractComponentProps<SettingsFolderData> {}

export class SettingsFolderType extends Taxonomy.AbstractIContent<SettingsFolderData> implements SettingsFolderData {
    protected _typeName : string = "SettingsFolder";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
    }

}
