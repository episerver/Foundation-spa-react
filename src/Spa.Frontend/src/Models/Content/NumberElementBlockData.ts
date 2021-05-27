import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * NumberElementBlock
 *
 * No Description available.
 *
 * @GUID d2ab34fb-103f-4a0c-9233-1a48e530d9a4
 */
export default interface NumberElementBlockData extends Taxonomy.IContent {
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
     * PlaceHolder
     *
     * No description available
     */
    placeHolder: ContentDelivery.StringProperty

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
export interface NumberElementBlockProps extends ComponentTypes.AbstractComponentProps<NumberElementBlockData> {}

export class NumberElementBlockType extends Taxonomy.AbstractIContent<NumberElementBlockData> implements NumberElementBlockData {
    protected _typeName : string = "NumberElementBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'label': 'LongString',
        'description': 'LongString',
        'validators': 'LongString',
        'placeHolder': 'LongString',
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
    public get label() : NumberElementBlockData["label"] { return this.getProperty("label"); }

    /**
     * Description
     *
     * No description available
     */
    public get description() : NumberElementBlockData["description"] { return this.getProperty("description"); }

    /**
     * Validators
     *
     * No description available
     */
    public get validators() : NumberElementBlockData["validators"] { return this.getProperty("validators"); }

    /**
     * PlaceHolder
     *
     * No description available
     */
    public get placeHolder() : NumberElementBlockData["placeHolder"] { return this.getProperty("placeHolder"); }

    /**
     * SatisfiedAction
     *
     * No description available
     */
    public get satisfiedAction() : NumberElementBlockData["satisfiedAction"] { return this.getProperty("satisfiedAction"); }

    /**
     * External system field mapping
     *
     * No description available
     */
    public get forms_ExternalSystemsFieldMappings() : NumberElementBlockData["forms_ExternalSystemsFieldMappings"] { return this.getProperty("forms_ExternalSystemsFieldMappings"); }

    /**
     * ConditionCombination
     *
     * No description available
     */
    public get conditionCombination() : NumberElementBlockData["conditionCombination"] { return this.getProperty("conditionCombination"); }

    /**
     * Conditions
     *
     * No description available
     */
    public get conditions() : NumberElementBlockData["conditions"] { return this.getProperty("conditions"); }

    /**
     * ValidatorMessages
     *
     * No description available
     */
    public get validatorMessages() : NumberElementBlockData["validatorMessages"] { return this.getProperty("validatorMessages"); }

}
