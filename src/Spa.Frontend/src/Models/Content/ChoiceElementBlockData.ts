import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * ChoiceElementBlock
 *
 * No Description available.
 *
 * @GUID 104bba6b-d3de-4806-abe3-02b2cba730ee
 */
export default interface ChoiceElementBlockData extends Taxonomy.IContent {
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
     * Validators
     *
     * No description available
     */
    validators: ContentDelivery.StringProperty

    /**
     * AllowMultiSelect
     *
     * No description available
     */
    allowMultiSelect: ContentDelivery.BooleanProperty

    /**
     * Feed
     *
     * No description available
     */
    feed: ContentDelivery.StringProperty

    /**
     * Items
     *
     * No description available
     */
    items: ContentDelivery.Property<any> // Original type: OptionList

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
export interface ChoiceElementBlockProps extends ComponentTypes.AbstractComponentProps<ChoiceElementBlockData> {}

export class ChoiceElementBlockType extends Taxonomy.AbstractIContent<ChoiceElementBlockData> implements ChoiceElementBlockData {
    protected _typeName : string = "ChoiceElementBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'label': 'LongString',
        'description': 'LongString',
        'validators': 'LongString',
        'allowMultiSelect': 'Boolean',
        'feed': 'LongString',
        'items': 'OptionList',
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
    public get label() : ChoiceElementBlockData["label"] { return this.getProperty("label"); }

    /**
     * Description
     *
     * No description available
     */
    public get description() : ChoiceElementBlockData["description"] { return this.getProperty("description"); }

    /**
     * Validators
     *
     * No description available
     */
    public get validators() : ChoiceElementBlockData["validators"] { return this.getProperty("validators"); }

    /**
     * AllowMultiSelect
     *
     * No description available
     */
    public get allowMultiSelect() : ChoiceElementBlockData["allowMultiSelect"] { return this.getProperty("allowMultiSelect"); }

    /**
     * Feed
     *
     * No description available
     */
    public get feed() : ChoiceElementBlockData["feed"] { return this.getProperty("feed"); }

    /**
     * Items
     *
     * No description available
     */
    public get items() : ChoiceElementBlockData["items"] { return this.getProperty("items"); }

    /**
     * SatisfiedAction
     *
     * No description available
     */
    public get satisfiedAction() : ChoiceElementBlockData["satisfiedAction"] { return this.getProperty("satisfiedAction"); }

    /**
     * External system field mapping
     *
     * No description available
     */
    public get forms_ExternalSystemsFieldMappings() : ChoiceElementBlockData["forms_ExternalSystemsFieldMappings"] { return this.getProperty("forms_ExternalSystemsFieldMappings"); }

    /**
     * ConditionCombination
     *
     * No description available
     */
    public get conditionCombination() : ChoiceElementBlockData["conditionCombination"] { return this.getProperty("conditionCombination"); }

    /**
     * Conditions
     *
     * No description available
     */
    public get conditions() : ChoiceElementBlockData["conditions"] { return this.getProperty("conditions"); }

    /**
     * ValidatorMessages
     *
     * No description available
     */
    public get validatorMessages() : ChoiceElementBlockData["validatorMessages"] { return this.getProperty("validatorMessages"); }

}
