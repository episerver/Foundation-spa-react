import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Label Settings
 *
 * No Description available.
 *
 * @GUID c17375a6-4a01-402b-8c7f-18257e944527
 */
export default interface LabelSettingsData extends Taxonomy.IContent {
    /**
     * My account
     *
     * No description available
     */
    myAccountLabel: ContentDelivery.StringProperty

    /**
     * Search
     *
     * No description available
     */
    searchLabel: ContentDelivery.StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface LabelSettingsProps extends ComponentTypes.AbstractComponentProps<LabelSettingsData> {}

export class LabelSettingsType extends Taxonomy.AbstractIContent<LabelSettingsData> implements LabelSettingsData {
    protected _typeName : string = "LabelSettings";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'myAccountLabel': 'LongString',
        'searchLabel': 'LongString',
    }

    /**
     * My account
     *
     * No description available
     */
    public get myAccountLabel() : LabelSettingsData["myAccountLabel"] { return this.getProperty("myAccountLabel"); }

    /**
     * Search
     *
     * No description available
     */
    public get searchLabel() : LabelSettingsData["searchLabel"] { return this.getProperty("searchLabel"); }

}
