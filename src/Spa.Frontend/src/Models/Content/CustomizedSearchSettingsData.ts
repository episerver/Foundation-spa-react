import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * CustomizedSearchSettings
 *
 * No Description available.
 *
 * @GUID df11dc77-d4ea-4383-be7c-fcd13ac5beba
 */
export default interface CustomizedSearchSettingsData extends Taxonomy.IContent {
    /**
     * SearchPhrase
     *
     * No description available
     */
    searchPhrase: ContentDelivery.StringProperty

    /**
     * UseAndBetweenWords
     *
     * No description available
     */
    useAndBetweenWords: ContentDelivery.BooleanProperty

    /**
     * NumberOfHits
     *
     * No description available
     */
    numberOfHits: ContentDelivery.NumberProperty

    /**
     * IncludeDescription
     *
     * No description available
     */
    includeDescription: ContentDelivery.BooleanProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface CustomizedSearchSettingsProps extends ComponentTypes.AbstractComponentProps<CustomizedSearchSettingsData> {}

export class CustomizedSearchSettingsType extends Taxonomy.AbstractIContent<CustomizedSearchSettingsData> implements CustomizedSearchSettingsData {
    protected _typeName : string = "CustomizedSearchSettings";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'searchPhrase': 'LongString',
        'useAndBetweenWords': 'Boolean',
        'numberOfHits': 'Number',
        'includeDescription': 'Boolean',
    }

    /**
     * SearchPhrase
     *
     * No description available
     */
    public get searchPhrase() : CustomizedSearchSettingsData["searchPhrase"] { return this.getProperty("searchPhrase"); }

    /**
     * UseAndBetweenWords
     *
     * No description available
     */
    public get useAndBetweenWords() : CustomizedSearchSettingsData["useAndBetweenWords"] { return this.getProperty("useAndBetweenWords"); }

    /**
     * NumberOfHits
     *
     * No description available
     */
    public get numberOfHits() : CustomizedSearchSettingsData["numberOfHits"] { return this.getProperty("numberOfHits"); }

    /**
     * IncludeDescription
     *
     * No description available
     */
    public get includeDescription() : CustomizedSearchSettingsData["includeDescription"] { return this.getProperty("includeDescription"); }

}
