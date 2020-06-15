import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from '@episerver/spa-core/Property'
import IContent, { BaseIContent } from '@episerver/spa-core/Models/IContent'
import ContentLink from '@episerver/spa-core/Models/ContentLink'
import { ComponentProps } from '@episerver/spa-core/EpiComponent'

/**
 * ImageChoiceElementBlock
 *
 * No Description available.
 *
 * @GUID cb3d3dda-316b-4044-9521-6b05d332722d
 */
export default interface ImageChoiceElementBlockData extends IContent {
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
     * Validators
     *
     * No description available
     */
    validators: StringProperty

    /**
     * ShowSelectionInputControl
     *
     * No description available
     */
    showSelectionInputControl: BooleanProperty

    /**
     * AllowMultiSelect
     *
     * No description available
     */
    allowMultiSelect: BooleanProperty

    /**
     * Items
     *
     * No description available
     */
    items: LinkListProperty

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
export interface ImageChoiceElementBlockProps extends ComponentProps<ImageChoiceElementBlockData> {}

export class ImageChoiceElementBlockType extends BaseIContent<ImageChoiceElementBlockData> implements ImageChoiceElementBlockData {
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
    public label: StringProperty;

    /**
     * Description
     *
     * No description available
     */
    public description: StringProperty;

    /**
     * Validators
     *
     * No description available
     */
    public validators: StringProperty;

    /**
     * ShowSelectionInputControl
     *
     * No description available
     */
    public showSelectionInputControl: BooleanProperty;

    /**
     * AllowMultiSelect
     *
     * No description available
     */
    public allowMultiSelect: BooleanProperty;

    /**
     * Items
     *
     * No description available
     */
    public items: LinkListProperty;

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
