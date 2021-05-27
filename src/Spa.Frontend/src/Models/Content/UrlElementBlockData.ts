import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * UrlElementBlock
 *
 * No Description available.
 *
 * @GUID dcfc84ca-2f9d-4b51-a792-eaaf7fb8ffea
 */
export default interface UrlElementBlockData extends Taxonomy.IContent {
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
export interface UrlElementBlockProps extends ComponentTypes.AbstractComponentProps<UrlElementBlockData> {}

export class UrlElementBlockType extends Taxonomy.AbstractIContent<UrlElementBlockData> implements UrlElementBlockData {
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
    public get label() : UrlElementBlockData["label"] { return this.getProperty("label"); }

    /**
     * Description
     *
     * No description available
     */
    public get description() : UrlElementBlockData["description"] { return this.getProperty("description"); }

    /**
     * Validators
     *
     * No description available
     */
    public get validators() : UrlElementBlockData["validators"] { return this.getProperty("validators"); }

    /**
     * PlaceHolder
     *
     * No description available
     */
    public get placeHolder() : UrlElementBlockData["placeHolder"] { return this.getProperty("placeHolder"); }

    /**
     * PredefinedValue
     *
     * No description available
     */
    public get predefinedValue() : UrlElementBlockData["predefinedValue"] { return this.getProperty("predefinedValue"); }

    /**
     * SatisfiedAction
     *
     * No description available
     */
    public get satisfiedAction() : UrlElementBlockData["satisfiedAction"] { return this.getProperty("satisfiedAction"); }

    /**
     * External system field mapping
     *
     * No description available
     */
    public get forms_ExternalSystemsFieldMappings() : UrlElementBlockData["forms_ExternalSystemsFieldMappings"] { return this.getProperty("forms_ExternalSystemsFieldMappings"); }

    /**
     * ConditionCombination
     *
     * No description available
     */
    public get conditionCombination() : UrlElementBlockData["conditionCombination"] { return this.getProperty("conditionCombination"); }

    /**
     * Conditions
     *
     * No description available
     */
    public get conditions() : UrlElementBlockData["conditions"] { return this.getProperty("conditions"); }

    /**
     * ValidatorMessages
     *
     * No description available
     */
    public get validatorMessages() : UrlElementBlockData["validatorMessages"] { return this.getProperty("validatorMessages"); }

}
