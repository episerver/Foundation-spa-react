import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * CustomizedSearchAdvancedSettings
 *
 * No Description available.
 *
 * @GUID 5e333241-f873-4092-9947-8b573ac0ffde
 */
export default interface CustomizedSearchAdvancedSettingsData extends Taxonomy.IContent {
    /**
     * RootContent
     *
     * No description available
     */
    rootContent: ContentDelivery.ContentReferenceProperty

    /**
     * ContentTypes
     *
     * No description available
     */
    contentTypes: ContentDelivery.StringProperty

    /**
     * IncludeBestBets
     *
     * No description available
     */
    includeBestBets: ContentDelivery.BooleanProperty

    /**
     * UseSynonyms
     *
     * No description available
     */
    useSynonyms: ContentDelivery.BooleanProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface CustomizedSearchAdvancedSettingsProps extends ComponentTypes.AbstractComponentProps<CustomizedSearchAdvancedSettingsData> {}

export class CustomizedSearchAdvancedSettingsType extends Taxonomy.AbstractIContent<CustomizedSearchAdvancedSettingsData> implements CustomizedSearchAdvancedSettingsData {
    protected _typeName : string = "CustomizedSearchAdvancedSettings";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'rootContent': 'ContentReference',
        'contentTypes': 'LongString',
        'includeBestBets': 'Boolean',
        'useSynonyms': 'Boolean',
    }

    /**
     * RootContent
     *
     * No description available
     */
    public get rootContent() : CustomizedSearchAdvancedSettingsData["rootContent"] { return this.getProperty("rootContent"); }

    /**
     * ContentTypes
     *
     * No description available
     */
    public get contentTypes() : CustomizedSearchAdvancedSettingsData["contentTypes"] { return this.getProperty("contentTypes"); }

    /**
     * IncludeBestBets
     *
     * No description available
     */
    public get includeBestBets() : CustomizedSearchAdvancedSettingsData["includeBestBets"] { return this.getProperty("includeBestBets"); }

    /**
     * UseSynonyms
     *
     * No description available
     */
    public get useSynonyms() : CustomizedSearchAdvancedSettingsData["useSynonyms"] { return this.getProperty("useSynonyms"); }

}
