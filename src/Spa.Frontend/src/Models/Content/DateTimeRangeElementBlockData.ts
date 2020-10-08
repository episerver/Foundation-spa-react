import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * DateTimeRangeElementBlock
 *
 * No Description available.
 *
 * @GUID a4ee6053-3932-4300-8b3b-7babf9aec512
 */
export default interface DateTimeRangeElementBlockData extends Taxonomy.IContent {
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
     * PickerType
     *
     * No description available
     */
    pickerType: ContentDelivery.NumberProperty

    /**
     * Validators
     *
     * No description available
     */
    validators: ContentDelivery.StringProperty

    /**
     * PlaceHolder
     *
     * No description available
     */
    placeHolder: ContentDelivery.StringProperty

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
export interface DateTimeRangeElementBlockProps extends ComponentTypes.AbstractComponentProps<DateTimeRangeElementBlockData> {}

export class DateTimeRangeElementBlockType extends Taxonomy.AbstractIContent<DateTimeRangeElementBlockData> implements DateTimeRangeElementBlockData {
    protected _typeName : string = "DateTimeRangeElementBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'label': 'LongString',
        'description': 'LongString',
        'pickerType': 'Number',
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
    public get label() : DateTimeRangeElementBlockData["label"] { return this.getProperty("label"); }

    /**
     * Description
     *
     * No description available
     */
    public get description() : DateTimeRangeElementBlockData["description"] { return this.getProperty("description"); }

    /**
     * PickerType
     *
     * No description available
     */
    public get pickerType() : DateTimeRangeElementBlockData["pickerType"] { return this.getProperty("pickerType"); }

    /**
     * Validators
     *
     * No description available
     */
    public get validators() : DateTimeRangeElementBlockData["validators"] { return this.getProperty("validators"); }

    /**
     * PlaceHolder
     *
     * No description available
     */
    public get placeHolder() : DateTimeRangeElementBlockData["placeHolder"] { return this.getProperty("placeHolder"); }

    /**
     * PredefinedValue
     *
     * No description available
     */
    public get predefinedValue() : DateTimeRangeElementBlockData["predefinedValue"] { return this.getProperty("predefinedValue"); }

    /**
     * SatisfiedAction
     *
     * No description available
     */
    public get satisfiedAction() : DateTimeRangeElementBlockData["satisfiedAction"] { return this.getProperty("satisfiedAction"); }

    /**
     * External system field mapping
     *
     * No description available
     */
    public get forms_ExternalSystemsFieldMappings() : DateTimeRangeElementBlockData["forms_ExternalSystemsFieldMappings"] { return this.getProperty("forms_ExternalSystemsFieldMappings"); }

    /**
     * ConditionCombination
     *
     * No description available
     */
    public get conditionCombination() : DateTimeRangeElementBlockData["conditionCombination"] { return this.getProperty("conditionCombination"); }

    /**
     * Conditions
     *
     * No description available
     */
    public get conditions() : DateTimeRangeElementBlockData["conditions"] { return this.getProperty("conditions"); }

    /**
     * ValidatorMessages
     *
     * No description available
     */
    public get validatorMessages() : DateTimeRangeElementBlockData["validatorMessages"] { return this.getProperty("validatorMessages"); }

}
