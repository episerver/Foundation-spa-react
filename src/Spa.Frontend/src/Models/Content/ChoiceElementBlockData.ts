import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'episerver/Property'
import IContent, { BaseIContent } from 'episerver/Models/IContent'
import ContentLink from 'episerver/Models/ContentLink'
import { ComponentProps } from 'episerver/EpiComponent'

/**
 * ChoiceElementBlock
 *
 * No Description available.
 *
 * @GUID 104bba6b-d3de-4806-abe3-02b2cba730ee
 */
export default interface ChoiceElementBlockData extends IContent {
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
     * AllowMultiSelect
     *
     * No description available
     */
    allowMultiSelect: BooleanProperty

    /**
     * Feed
     *
     * No description available
     */
    feed: StringProperty

    /**
     * Items
     *
     * No description available
     */
    items: Property<any> // Original type: OptionList

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
export interface ChoiceElementBlockProps extends ComponentProps<ChoiceElementBlockData> {}

export class ChoiceElementBlockType extends BaseIContent<ChoiceElementBlockData> implements ChoiceElementBlockData {
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
     * AllowMultiSelect
     *
     * No description available
     */
    public allowMultiSelect: BooleanProperty;

    /**
     * Feed
     *
     * No description available
     */
    public feed: StringProperty;

    /**
     * Items
     *
     * No description available
     */
    public items: Property<any> // Original type: OptionList;

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
