import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

/**
 * SelectionElementBlock
 *
 * No Description available.
 *
 * @GUID 21299360-fedd-4978-afcd-ae76991ba63b
 */
export default interface SelectionElementBlockData extends IContent {
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
     * PlaceHolder
     *
     * No description available
     */
    placeHolder: StringProperty

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
export interface SelectionElementBlockProps extends ComponentProps<SelectionElementBlockData> {}
