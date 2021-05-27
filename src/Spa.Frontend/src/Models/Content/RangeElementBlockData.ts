import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * RangeElementBlock
 *
 * No Description available.
 *
 * @GUID 86bf688b-e61b-4e0a-94ca-715587125494
 */
export default interface RangeElementBlockData extends Taxonomy.IContent {
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
     * Min
     *
     * No description available
     */
    min: ContentDelivery.NumberProperty

    /**
     * Max
     *
     * No description available
     */
    max: ContentDelivery.NumberProperty

    /**
     * Step
     *
     * No description available
     */
    step: ContentDelivery.NumberProperty

    /**
     * PredefinedValue
     *
     * No description available
     */
    predefinedValue: ContentDelivery.StringProperty

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
export interface RangeElementBlockProps extends ComponentTypes.AbstractComponentProps<RangeElementBlockData> {}

export class RangeElementBlockType extends Taxonomy.AbstractIContent<RangeElementBlockData> implements RangeElementBlockData {
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
    public get label() : RangeElementBlockData["label"] { return this.getProperty("label"); }

    /**
     * Description
     *
     * No description available
     */
    public get description() : RangeElementBlockData["description"] { return this.getProperty("description"); }

    /**
     * Min
     *
     * No description available
     */
    public get min() : RangeElementBlockData["min"] { return this.getProperty("min"); }

    /**
     * Max
     *
     * No description available
     */
    public get max() : RangeElementBlockData["max"] { return this.getProperty("max"); }

    /**
     * Step
     *
     * No description available
     */
    public get step() : RangeElementBlockData["step"] { return this.getProperty("step"); }

    /**
     * PredefinedValue
     *
     * No description available
     */
    public get predefinedValue() : RangeElementBlockData["predefinedValue"] { return this.getProperty("predefinedValue"); }

    /**
     * SatisfiedAction
     *
     * No description available
     */
    public get satisfiedAction() : RangeElementBlockData["satisfiedAction"] { return this.getProperty("satisfiedAction"); }

    /**
     * External system field mapping
     *
     * No description available
     */
    public get forms_ExternalSystemsFieldMappings() : RangeElementBlockData["forms_ExternalSystemsFieldMappings"] { return this.getProperty("forms_ExternalSystemsFieldMappings"); }

    /**
     * ConditionCombination
     *
     * No description available
     */
    public get conditionCombination() : RangeElementBlockData["conditionCombination"] { return this.getProperty("conditionCombination"); }

    /**
     * Conditions
     *
     * No description available
     */
    public get conditions() : RangeElementBlockData["conditions"] { return this.getProperty("conditions"); }

    /**
     * ValidatorMessages
     *
     * No description available
     */
    public get validatorMessages() : RangeElementBlockData["validatorMessages"] { return this.getProperty("validatorMessages"); }

}
