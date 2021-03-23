import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Collection Settings
 *
 * Selection options settings
 *
 * @GUID 4356a392-ed29-4895-9e65-bf44fa3db5ca
 */
export default interface CollectionSettingsData extends Taxonomy.IContent {
    /**
     * Background colors
     *
     * No description available
     */
    backgroundColor: ContentDelivery.Property<any> // Original type: ColorPropertyList

    /**
     * Heading colors
     *
     * No description available
     */
    headingColor: ContentDelivery.Property<any> // Original type: ColorPropertyList

    /**
     * Text colors
     *
     * No description available
     */
    textColor: ContentDelivery.Property<any> // Original type: ColorPropertyList

    /**
     * Block opacity background colors
     *
     * No description available
     */
    opacityBackgrounColor: ContentDelivery.Property<any> // Original type: ColorPropertyList

    /**
     * Button background colors
     *
     * No description available
     */
    buttonBackgroundColor: ContentDelivery.Property<any> // Original type: ColorPropertyList

    /**
     * Button text colors
     *
     * No description available
     */
    buttonTextColor: ContentDelivery.Property<any> // Original type: ColorPropertyList

    /**
     * Banner background color
     *
     * No description available
     */
    bannerBackgroundColor: ContentDelivery.StringProperty

    /**
     * Banner text color
     *
     * No description available
     */
    bannerTextColor: ContentDelivery.StringProperty

    /**
     * Link color
     *
     * No description available
     */
    linkColor: ContentDelivery.StringProperty

    /**
     * Sectors
     *
     * No description available
     */
    sectors: ContentDelivery.Property<any> // Original type: SelectionItemProperty

    /**
     * Locations
     *
     * No description available
     */
    locations: ContentDelivery.Property<any> // Original type: SelectionItemProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface CollectionSettingsProps extends ComponentTypes.AbstractComponentProps<CollectionSettingsData> {}

export class CollectionSettingsType extends Taxonomy.AbstractIContent<CollectionSettingsData> implements CollectionSettingsData {
    protected _typeName : string = "CollectionSettings";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'backgroundColor': 'ColorPropertyList',
        'headingColor': 'ColorPropertyList',
        'textColor': 'ColorPropertyList',
        'opacityBackgrounColor': 'ColorPropertyList',
        'buttonBackgroundColor': 'ColorPropertyList',
        'buttonTextColor': 'ColorPropertyList',
        'bannerBackgroundColor': 'LongString',
        'bannerTextColor': 'LongString',
        'linkColor': 'LongString',
        'sectors': 'SelectionItemProperty',
        'locations': 'SelectionItemProperty',
    }

    /**
     * Background colors
     *
     * No description available
     */
    public get backgroundColor() : CollectionSettingsData["backgroundColor"] { return this.getProperty("backgroundColor"); }

    /**
     * Heading colors
     *
     * No description available
     */
    public get headingColor() : CollectionSettingsData["headingColor"] { return this.getProperty("headingColor"); }

    /**
     * Text colors
     *
     * No description available
     */
    public get textColor() : CollectionSettingsData["textColor"] { return this.getProperty("textColor"); }

    /**
     * Block opacity background colors
     *
     * No description available
     */
    public get opacityBackgrounColor() : CollectionSettingsData["opacityBackgrounColor"] { return this.getProperty("opacityBackgrounColor"); }

    /**
     * Button background colors
     *
     * No description available
     */
    public get buttonBackgroundColor() : CollectionSettingsData["buttonBackgroundColor"] { return this.getProperty("buttonBackgroundColor"); }

    /**
     * Button text colors
     *
     * No description available
     */
    public get buttonTextColor() : CollectionSettingsData["buttonTextColor"] { return this.getProperty("buttonTextColor"); }

    /**
     * Banner background color
     *
     * No description available
     */
    public get bannerBackgroundColor() : CollectionSettingsData["bannerBackgroundColor"] { return this.getProperty("bannerBackgroundColor"); }

    /**
     * Banner text color
     *
     * No description available
     */
    public get bannerTextColor() : CollectionSettingsData["bannerTextColor"] { return this.getProperty("bannerTextColor"); }

    /**
     * Link color
     *
     * No description available
     */
    public get linkColor() : CollectionSettingsData["linkColor"] { return this.getProperty("linkColor"); }

    /**
     * Sectors
     *
     * No description available
     */
    public get sectors() : CollectionSettingsData["sectors"] { return this.getProperty("sectors"); }

    /**
     * Locations
     *
     * No description available
     */
    public get locations() : CollectionSettingsData["locations"] { return this.getProperty("locations"); }

}
