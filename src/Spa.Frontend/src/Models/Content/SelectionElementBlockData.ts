import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * SelectionElementBlock
 *
 * No Description available.
 *
 * @GUID 21299360-fedd-4978-afcd-ae76991ba63b
 */
export default interface SelectionElementBlockData extends Taxonomy.IContent {
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
export interface SelectionElementBlockProps extends ComponentTypes.AbstractComponentProps<SelectionElementBlockData> {}

export class SelectionElementBlockType extends Taxonomy.AbstractIContent<SelectionElementBlockData> implements SelectionElementBlockData {
    protected _typeName : string = "SelectionElementBlock";
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
    public get label() : SelectionElementBlockData["label"] { return this.getProperty("label"); }

    /**
     * Description
     *
     * No description available
     */
    public get description() : SelectionElementBlockData["description"] { return this.getProperty("description"); }

    /**
     * Validators
     *
     * No description available
     */
    public get validators() : SelectionElementBlockData["validators"] { return this.getProperty("validators"); }

    /**
     * AllowMultiSelect
     *
     * No description available
     */
    public get allowMultiSelect() : SelectionElementBlockData["allowMultiSelect"] { return this.getProperty("allowMultiSelect"); }

    /**
     * Feed
     *
     * No description available
     */
    public get feed() : SelectionElementBlockData["feed"] { return this.getProperty("feed"); }

    /**
     * Items
     *
     * No description available
     */
    public get items() : SelectionElementBlockData["items"] { return this.getProperty("items"); }

    /**
     * PlaceHolder
     *
     * No description available
     */
    public get placeHolder() : SelectionElementBlockData["placeHolder"] { return this.getProperty("placeHolder"); }

    /**
     * SatisfiedAction
     *
     * No description available
     */
    public get satisfiedAction() : SelectionElementBlockData["satisfiedAction"] { return this.getProperty("satisfiedAction"); }

    /**
     * External system field mapping
     *
     * No description available
     */
    public get forms_ExternalSystemsFieldMappings() : SelectionElementBlockData["forms_ExternalSystemsFieldMappings"] { return this.getProperty("forms_ExternalSystemsFieldMappings"); }

    /**
     * ConditionCombination
     *
     * No description available
     */
    public get conditionCombination() : SelectionElementBlockData["conditionCombination"] { return this.getProperty("conditionCombination"); }

    /**
     * Conditions
     *
     * No description available
     */
    public get conditions() : SelectionElementBlockData["conditions"] { return this.getProperty("conditions"); }

    /**
     * ValidatorMessages
     *
     * No description available
     */
    public get validatorMessages() : SelectionElementBlockData["validatorMessages"] { return this.getProperty("validatorMessages"); }

}
