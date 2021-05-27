import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * TextareaElementBlock
 *
 * No Description available.
 *
 * @GUID e7f31175-2f9c-4733-8180-8b6512a64a3a
 */
export default interface TextareaElementBlockData extends Taxonomy.IContent {
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
export interface TextareaElementBlockProps extends ComponentTypes.AbstractComponentProps<TextareaElementBlockData> {}

export class TextareaElementBlockType extends Taxonomy.AbstractIContent<TextareaElementBlockData> implements TextareaElementBlockData {
    protected _typeName : string = "TextareaElementBlock";
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
    public get label() : TextareaElementBlockData["label"] { return this.getProperty("label"); }

    /**
     * Description
     *
     * No description available
     */
    public get description() : TextareaElementBlockData["description"] { return this.getProperty("description"); }

    /**
     * Validators
     *
     * No description available
     */
    public get validators() : TextareaElementBlockData["validators"] { return this.getProperty("validators"); }

    /**
     * PlaceHolder
     *
     * No description available
     */
    public get placeHolder() : TextareaElementBlockData["placeHolder"] { return this.getProperty("placeHolder"); }

    /**
     * SatisfiedAction
     *
     * No description available
     */
    public get satisfiedAction() : TextareaElementBlockData["satisfiedAction"] { return this.getProperty("satisfiedAction"); }

    /**
     * External system field mapping
     *
     * No description available
     */
    public get forms_ExternalSystemsFieldMappings() : TextareaElementBlockData["forms_ExternalSystemsFieldMappings"] { return this.getProperty("forms_ExternalSystemsFieldMappings"); }

    /**
     * ConditionCombination
     *
     * No description available
     */
    public get conditionCombination() : TextareaElementBlockData["conditionCombination"] { return this.getProperty("conditionCombination"); }

    /**
     * Conditions
     *
     * No description available
     */
    public get conditions() : TextareaElementBlockData["conditions"] { return this.getProperty("conditions"); }

    /**
     * ValidatorMessages
     *
     * No description available
     */
    public get validatorMessages() : TextareaElementBlockData["validatorMessages"] { return this.getProperty("validatorMessages"); }

}
