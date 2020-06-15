import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from '@episerver/spa-core/Property'
import IContent, { BaseIContent } from '@episerver/spa-core/Models/IContent'
import ContentLink from '@episerver/spa-core/Models/ContentLink'
import { ComponentProps } from '@episerver/spa-core/EpiComponent'

/**
 * AddressesElementBlock
 *
 * No Description available.
 *
 * @GUID cb332a5d-096d-4228-be9a-b6e16481d8fb
 */
export default interface AddressesElementBlockData extends IContent {
    /**
     * Label
     *
     * No description available
     */
    label: StringProperty

    /**
     * Description
     *
     * No description available
     */
    description: StringProperty

    /**
     * CountryLabel
     *
     * No description available
     */
    countryLabel: StringProperty

    /**
     * PostalLabel
     *
     * No description available
     */
    postalLabel: StringProperty

    /**
     * StateLabel
     *
     * No description available
     */
    stateLabel: StringProperty

    /**
     * CityLabel
     *
     * No description available
     */
    cityLabel: StringProperty

    /**
     * StreetLabel
     *
     * No description available
     */
    streetLabel: StringProperty

    /**
     * AddressLabel
     *
     * No description available
     */
    addressLabel: StringProperty

    /**
     * MapHeight
     *
     * No description available
     */
    mapHeight: NumberProperty

    /**
     * MapWidth
     *
     * No description available
     */
    mapWidth: NumberProperty

    /**
     * Validators
     *
     * No description available
     */
    validators: StringProperty

    /**
     * SatisfiedAction
     *
     * No description available
     */
    satisfiedAction: StringProperty

    /**
     * External system field mapping
     *
     * No description available
     */
    forms_ExternalSystemsFieldMappings: Property<any> // Original type: Property Field Mapping Collection

    /**
     * ConditionCombination
     *
     * No description available
     */
    conditionCombination: NumberProperty

    /**
     * Conditions
     *
     * No description available
     */
    conditions: Property<any> // Original type: Dependency conditions collection

    /**
     * ValidatorMessages
     *
     * No description available
     */
    validatorMessages: Property<any> // Original type: Validator with message collection

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface AddressesElementBlockProps extends ComponentProps<AddressesElementBlockData> {}

export class AddressesElementBlockType extends BaseIContent<AddressesElementBlockData> implements AddressesElementBlockData {
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
    public label: StringProperty;

    /**
     * Description
     *
     * No description available
     */
    public description: StringProperty;

    /**
     * CountryLabel
     *
     * No description available
     */
    public countryLabel: StringProperty;

    /**
     * PostalLabel
     *
     * No description available
     */
    public postalLabel: StringProperty;

    /**
     * StateLabel
     *
     * No description available
     */
    public stateLabel: StringProperty;

    /**
     * CityLabel
     *
     * No description available
     */
    public cityLabel: StringProperty;

    /**
     * StreetLabel
     *
     * No description available
     */
    public streetLabel: StringProperty;

    /**
     * AddressLabel
     *
     * No description available
     */
    public addressLabel: StringProperty;

    /**
     * MapHeight
     *
     * No description available
     */
    public mapHeight: NumberProperty;

    /**
     * MapWidth
     *
     * No description available
     */
    public mapWidth: NumberProperty;

    /**
     * Validators
     *
     * No description available
     */
    public validators: StringProperty;

    /**
     * SatisfiedAction
     *
     * No description available
     */
    public satisfiedAction: StringProperty;

    /**
     * External system field mapping
     *
     * No description available
     */
    public forms_ExternalSystemsFieldMappings: Property<any> // Original type: Property Field Mapping Collection;

    /**
     * ConditionCombination
     *
     * No description available
     */
    public conditionCombination: NumberProperty;

    /**
     * Conditions
     *
     * No description available
     */
    public conditions: Property<any> // Original type: Dependency conditions collection;

    /**
     * ValidatorMessages
     *
     * No description available
     */
    public validatorMessages: Property<any> // Original type: Validator with message collection;

}
