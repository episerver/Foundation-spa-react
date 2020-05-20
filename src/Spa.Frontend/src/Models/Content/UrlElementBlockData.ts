import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'episerver/Property'
import IContent, { BaseIContent } from 'episerver/Models/IContent'
import ContentLink from 'episerver/Models/ContentLink'
import { ComponentProps } from 'episerver/EpiComponent'

/**
 * UrlElementBlock
 *
 * No Description available.
 *
 * @GUID dcfc84ca-2f9d-4b51-a792-eaaf7fb8ffea
 */
export default interface UrlElementBlockData extends IContent {
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
     * Validators
     *
     * No description available
     */
    validators: StringProperty

    /**
     * PlaceHolder
     *
     * No description available
     */
    placeHolder: StringProperty

    /**
     * PredefinedValue
     *
     * No description available
     */
    predefinedValue: StringProperty

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
export interface UrlElementBlockProps extends ComponentProps<UrlElementBlockData> {}

export class UrlElementBlockType extends BaseIContent<UrlElementBlockData> implements UrlElementBlockData {
    protected _typeName : string = "UrlElementBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'label': 'LongString',
        'description': 'LongString',
        'validators': 'LongString',
        'placeHolder': 'LongString',
        'predefinedValue': 'LongString',
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
     * Validators
     *
     * No description available
     */
    public validators: StringProperty;

    /**
     * PlaceHolder
     *
     * No description available
     */
    public placeHolder: StringProperty;

    /**
     * PredefinedValue
     *
     * No description available
     */
    public predefinedValue: StringProperty;

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
