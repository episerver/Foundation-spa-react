import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * ImageChoiceElementBlock
 *
 * No Description available.
 *
 * @GUID cb3d3dda-316b-4044-9521-6b05d332722d
 */
export default interface ImageChoiceElementBlockData extends Taxonomy.IContent {
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
     * ShowSelectionInputControl
     *
     * No description available
     */
    showSelectionInputControl: ContentDelivery.BooleanProperty

    /**
     * AllowMultiSelect
     *
     * No description available
     */
    allowMultiSelect: ContentDelivery.BooleanProperty

    /**
     * Items
     *
     * No description available
     */
    items: ContentDelivery.LinkListProperty

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
export interface ImageChoiceElementBlockProps extends ComponentTypes.AbstractComponentProps<ImageChoiceElementBlockData> {}

export class ImageChoiceElementBlockType extends Taxonomy.AbstractIContent<ImageChoiceElementBlockData> implements ImageChoiceElementBlockData {
    protected _typeName : string = "ImageChoiceElementBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'label': 'LongString',
        'description': 'LongString',
        'validators': 'LongString',
        'showSelectionInputControl': 'Boolean',
        'allowMultiSelect': 'Boolean',
        'items': 'LinkCollection',
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
    public get label() : ImageChoiceElementBlockData["label"] { return this.getProperty("label"); }

    /**
     * Description
     *
     * No description available
     */
    public get description() : ImageChoiceElementBlockData["description"] { return this.getProperty("description"); }

    /**
     * Validators
     *
     * No description available
     */
    public get validators() : ImageChoiceElementBlockData["validators"] { return this.getProperty("validators"); }

    /**
     * ShowSelectionInputControl
     *
     * No description available
     */
    public get showSelectionInputControl() : ImageChoiceElementBlockData["showSelectionInputControl"] { return this.getProperty("showSelectionInputControl"); }

    /**
     * AllowMultiSelect
     *
     * No description available
     */
    public get allowMultiSelect() : ImageChoiceElementBlockData["allowMultiSelect"] { return this.getProperty("allowMultiSelect"); }

    /**
     * Items
     *
     * No description available
     */
    public get items() : ImageChoiceElementBlockData["items"] { return this.getProperty("items"); }

    /**
     * SatisfiedAction
     *
     * No description available
     */
    public get satisfiedAction() : ImageChoiceElementBlockData["satisfiedAction"] { return this.getProperty("satisfiedAction"); }

    /**
     * External system field mapping
     *
     * No description available
     */
    public get forms_ExternalSystemsFieldMappings() : ImageChoiceElementBlockData["forms_ExternalSystemsFieldMappings"] { return this.getProperty("forms_ExternalSystemsFieldMappings"); }

    /**
     * ConditionCombination
     *
     * No description available
     */
    public get conditionCombination() : ImageChoiceElementBlockData["conditionCombination"] { return this.getProperty("conditionCombination"); }

    /**
     * Conditions
     *
     * No description available
     */
    public get conditions() : ImageChoiceElementBlockData["conditions"] { return this.getProperty("conditions"); }

    /**
     * ValidatorMessages
     *
     * No description available
     */
    public get validatorMessages() : ImageChoiceElementBlockData["validatorMessages"] { return this.getProperty("validatorMessages"); }

}
