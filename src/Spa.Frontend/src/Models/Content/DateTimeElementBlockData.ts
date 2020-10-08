import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * DateTimeElementBlock
 *
 * No Description available.
 *
 * @GUID 3cc0755e-e50b-4af4-92df-c0f7625d526f
 */
export default interface DateTimeElementBlockData extends Taxonomy.IContent {
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
export interface DateTimeElementBlockProps extends ComponentTypes.AbstractComponentProps<DateTimeElementBlockData> {}

export class DateTimeElementBlockType extends Taxonomy.AbstractIContent<DateTimeElementBlockData> implements DateTimeElementBlockData {
    protected _typeName : string = "DateTimeElementBlock";
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
    public get label() : DateTimeElementBlockData["label"] { return this.getProperty("label"); }

    /**
     * Description
     *
     * No description available
     */
    public get description() : DateTimeElementBlockData["description"] { return this.getProperty("description"); }

    /**
     * PickerType
     *
     * No description available
     */
    public get pickerType() : DateTimeElementBlockData["pickerType"] { return this.getProperty("pickerType"); }

    /**
     * Validators
     *
     * No description available
     */
    public get validators() : DateTimeElementBlockData["validators"] { return this.getProperty("validators"); }

    /**
     * PlaceHolder
     *
     * No description available
     */
    public get placeHolder() : DateTimeElementBlockData["placeHolder"] { return this.getProperty("placeHolder"); }

    /**
     * PredefinedValue
     *
     * No description available
     */
    public get predefinedValue() : DateTimeElementBlockData["predefinedValue"] { return this.getProperty("predefinedValue"); }

    /**
     * SatisfiedAction
     *
     * No description available
     */
    public get satisfiedAction() : DateTimeElementBlockData["satisfiedAction"] { return this.getProperty("satisfiedAction"); }

    /**
     * External system field mapping
     *
     * No description available
     */
    public get forms_ExternalSystemsFieldMappings() : DateTimeElementBlockData["forms_ExternalSystemsFieldMappings"] { return this.getProperty("forms_ExternalSystemsFieldMappings"); }

    /**
     * ConditionCombination
     *
     * No description available
     */
    public get conditionCombination() : DateTimeElementBlockData["conditionCombination"] { return this.getProperty("conditionCombination"); }

    /**
     * Conditions
     *
     * No description available
     */
    public get conditions() : DateTimeElementBlockData["conditions"] { return this.getProperty("conditions"); }

    /**
     * ValidatorMessages
     *
     * No description available
     */
    public get validatorMessages() : DateTimeElementBlockData["validatorMessages"] { return this.getProperty("validatorMessages"); }

}
