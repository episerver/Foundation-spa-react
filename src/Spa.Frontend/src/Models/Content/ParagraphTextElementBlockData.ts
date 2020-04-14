import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

/**
 * ParagraphTextElementBlock
 *
 * No Description available.
 *
 * @GUID a917b1ae-738f-416d-b033-7c229559003d
 */
export default interface ParagraphTextElementBlockData extends IContent {
    /**
     * ParagraphText
     *
     * No description available
     */
    paragraphText: StringProperty

    /**
     * SatisfiedAction
     *
     * No description available
     */
    satisfiedAction: StringProperty

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
     * FormSubmissionId
     *
     * No description available
     */
    formSubmissionId: StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface ParagraphTextElementBlockProps extends ComponentProps<ParagraphTextElementBlockData> {}
