import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Scripts Injection Settings
 *
 * Scripts Injection Settings
 *
 * @GUID 0156b963-88a9-450b-867c-e5c5e7be29fd
 */
export default interface ScriptInjectionSettingsData extends Taxonomy.IContent {
    /**
     * Header Scripts (Scripts will inject at the bottom of header)
     *
     * Scripts will inject at the bottom of header
     */
    headerScripts: ContentDelivery.Property<any> // Original type: ScriptInjectionProperty

    /**
     * Footer Scripts (Scripts will inject at the bottom of footer)
     *
     * Scripts will inject at the bottom of footer
     */
    footerScripts: ContentDelivery.Property<any> // Original type: ScriptInjectionProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface ScriptInjectionSettingsProps extends ComponentTypes.AbstractComponentProps<ScriptInjectionSettingsData> {}

export class ScriptInjectionSettingsType extends Taxonomy.AbstractIContent<ScriptInjectionSettingsData> implements ScriptInjectionSettingsData {
    protected _typeName : string = "ScriptInjectionSettings";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'headerScripts': 'ScriptInjectionProperty',
        'footerScripts': 'ScriptInjectionProperty',
    }

    /**
     * Header Scripts (Scripts will inject at the bottom of header)
     *
     * Scripts will inject at the bottom of header
     */
    public get headerScripts() : ScriptInjectionSettingsData["headerScripts"] { return this.getProperty("headerScripts"); }

    /**
     * Footer Scripts (Scripts will inject at the bottom of footer)
     *
     * Scripts will inject at the bottom of footer
     */
    public get footerScripts() : ScriptInjectionSettingsData["footerScripts"] { return this.getProperty("footerScripts"); }

}
