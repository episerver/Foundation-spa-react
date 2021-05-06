import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Search Settings
 *
 * No Description available.
 *
 * @GUID d4171337-70a4-476a-aa3c-0d976ac185e8
 */
export default interface SearchSettingsData extends Taxonomy.IContent {
    /**
     * Search option
     *
     * No description available
     */
    searchOption: ContentDelivery.StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface SearchSettingsProps extends ComponentTypes.AbstractComponentProps<SearchSettingsData> {}

export class SearchSettingsType extends Taxonomy.AbstractIContent<SearchSettingsData> implements SearchSettingsData {
    protected _typeName : string = "SearchSettings";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'searchOption': 'LongString',
    }

    /**
     * Search option
     *
     * No description available
     */
    public get searchOption() : SearchSettingsData["searchOption"] { return this.getProperty("searchOption"); }

}
