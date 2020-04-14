import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

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
