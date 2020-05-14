import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent, { BaseIContent } from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

/**
 * RangeElementBlock
 *
 * No Description available.
 *
 * @GUID 86bf688b-e61b-4e0a-94ca-715587125494
 */
export default interface RangeElementBlockData extends IContent {
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
     * Min
     *
     * No description available
     */
    min: NumberProperty

    /**
     * Max
     *
     * No description available
     */
    max: NumberProperty

    /**
     * Step
     *
     * No description available
     */
    step: NumberProperty

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
export interface RangeElementBlockProps extends ComponentProps<RangeElementBlockData> {}

export class RangeElementBlockType extends BaseIContent<RangeElementBlockData> implements RangeElementBlockData {
    protected _typeName : string = "RangeElementBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'label': 'LongString',
        'description': 'LongString',
        'min': 'Number',
        'max': 'Number',
        'step': 'Number',
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
     * Min
     *
     * No description available
     */
    public min: NumberProperty;

    /**
     * Max
     *
     * No description available
     */
    public max: NumberProperty;

    /**
     * Step
     *
     * No description available
     */
    public step: NumberProperty;

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
