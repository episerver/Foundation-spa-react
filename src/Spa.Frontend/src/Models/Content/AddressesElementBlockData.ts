import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * AddressesElementBlock
 *
 * No Description available.
 *
 * @GUID cb332a5d-096d-4228-be9a-b6e16481d8fb
 */
export default interface AddressesElementBlockData extends Taxonomy.IContent {
    /**
     * Label
     *
     * No description available
     */
    label: ContentDelivery.StringProperty

    /**
     * Description
     *
     * No description available
     */
    description: ContentDelivery.StringProperty

    /**
     * CountryLabel
     *
     * No description available
     */
    countryLabel: ContentDelivery.StringProperty

    /**
     * PostalLabel
     *
     * No description available
     */
    postalLabel: ContentDelivery.StringProperty

    /**
     * StateLabel
     *
     * No description available
     */
    stateLabel: ContentDelivery.StringProperty

    /**
     * CityLabel
     *
     * No description available
     */
    cityLabel: ContentDelivery.StringProperty

    /**
     * StreetLabel
     *
     * No description available
     */
    streetLabel: ContentDelivery.StringProperty

    /**
     * AddressLabel
     *
     * No description available
     */
    addressLabel: ContentDelivery.StringProperty

    /**
     * MapHeight
     *
     * No description available
     */
    mapHeight: ContentDelivery.NumberProperty

    /**
     * MapWidth
     *
     * No description available
     */
    mapWidth: ContentDelivery.NumberProperty

    /**
     * Validators
     *
     * No description available
     */
    validators: ContentDelivery.StringProperty

    /**
     * SatisfiedAction
     *
     * No description available
     */
    satisfiedAction: ContentDelivery.StringProperty

    /**
     * External system field mapping
     *
     * No description available
     */
    forms_ExternalSystemsFieldMappings: ContentDelivery.Property<any> // Original type: Property Field Mapping Collection

    /**
     * ConditionCombination
     *
     * No description available
     */
    conditionCombination: ContentDelivery.NumberProperty

    /**
     * Conditions
     *
     * No description available
     */
    conditions: ContentDelivery.Property<any> // Original type: Dependency conditions collection

    /**
     * ValidatorMessages
     *
     * No description available
     */
    validatorMessages: ContentDelivery.Property<any> // Original type: Validator with message collection

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface AddressesElementBlockProps extends ComponentTypes.AbstractComponentProps<AddressesElementBlockData> {}

export class AddressesElementBlockType extends Taxonomy.AbstractIContent<AddressesElementBlockData> implements AddressesElementBlockData {
    protected _typeName : string = "AddressesElementBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'label': 'LongString',
        'description': 'LongString',
        'countryLabel': 'LongString',
        'postalLabel': 'LongString',
        'stateLabel': 'LongString',
        'cityLabel': 'LongString',
        'streetLabel': 'LongString',
        'addressLabel': 'LongString',
        'mapHeight': 'Number',
        'mapWidth': 'Number',
        'validators': 'LongString',
        'satisfiedAction': 'LongString',
        'forms_ExternalSystemsFieldMappings': 'Property Field Mapping Collection',
        'conditionCombination': 'Number',
        'conditions': 'Dependency conditions collection',
        'validatorMessages': 'Validator with message collection',
    }

    /**
     * Label
     *
     * No description available
     */
    public get label() : AddressesElementBlockData["label"] { return this.getProperty("label"); }

    /**
     * Description
     *
     * No description available
     */
    public get description() : AddressesElementBlockData["description"] { return this.getProperty("description"); }

    /**
     * CountryLabel
     *
     * No description available
     */
    public get countryLabel() : AddressesElementBlockData["countryLabel"] { return this.getProperty("countryLabel"); }

    /**
     * PostalLabel
     *
     * No description available
     */
    public get postalLabel() : AddressesElementBlockData["postalLabel"] { return this.getProperty("postalLabel"); }

    /**
     * StateLabel
     *
     * No description available
     */
    public get stateLabel() : AddressesElementBlockData["stateLabel"] { return this.getProperty("stateLabel"); }

    /**
     * CityLabel
     *
     * No description available
     */
    public get cityLabel() : AddressesElementBlockData["cityLabel"] { return this.getProperty("cityLabel"); }

    /**
     * StreetLabel
     *
     * No description available
     */
    public get streetLabel() : AddressesElementBlockData["streetLabel"] { return this.getProperty("streetLabel"); }

    /**
     * AddressLabel
     *
     * No description available
     */
    public get addressLabel() : AddressesElementBlockData["addressLabel"] { return this.getProperty("addressLabel"); }

    /**
     * MapHeight
     *
     * No description available
     */
    public get mapHeight() : AddressesElementBlockData["mapHeight"] { return this.getProperty("mapHeight"); }

    /**
     * MapWidth
     *
     * No description available
     */
    public get mapWidth() : AddressesElementBlockData["mapWidth"] { return this.getProperty("mapWidth"); }

    /**
     * Validators
     *
     * No description available
     */
    public get validators() : AddressesElementBlockData["validators"] { return this.getProperty("validators"); }

    /**
     * SatisfiedAction
     *
     * No description available
     */
    public get satisfiedAction() : AddressesElementBlockData["satisfiedAction"] { return this.getProperty("satisfiedAction"); }

    /**
     * External system field mapping
     *
     * No description available
     */
    public get forms_ExternalSystemsFieldMappings() : AddressesElementBlockData["forms_ExternalSystemsFieldMappings"] { return this.getProperty("forms_ExternalSystemsFieldMappings"); }

    /**
     * ConditionCombination
     *
     * No description available
     */
    public get conditionCombination() : AddressesElementBlockData["conditionCombination"] { return this.getProperty("conditionCombination"); }

    /**
     * Conditions
     *
     * No description available
     */
    public get conditions() : AddressesElementBlockData["conditions"] { return this.getProperty("conditions"); }

    /**
     * ValidatorMessages
     *
     * No description available
     */
    public get validatorMessages() : AddressesElementBlockData["validatorMessages"] { return this.getProperty("validatorMessages"); }

}
