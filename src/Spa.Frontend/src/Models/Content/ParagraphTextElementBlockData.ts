import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from '@episerver/spa-core/Property'
import IContent, { BaseIContent } from '@episerver/spa-core/Models/IContent'
import ContentLink from '@episerver/spa-core/Models/ContentLink'
import { ComponentProps } from '@episerver/spa-core/EpiComponent'

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

export class ParagraphTextElementBlockType extends BaseIContent<ParagraphTextElementBlockData> implements ParagraphTextElementBlockData {
    protected _typeName : string = "ParagraphTextElementBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'paragraphText': 'XhtmlString',
        'satisfiedAction': 'LongString',
        'conditionCombination': 'Number',
        'conditions': 'Dependency conditions collection',
        'formSubmissionId': 'LongString',
    }

    /**
     * ParagraphText
     *
     * No description available
     */
    public paragraphText: StringProperty;

    /**
     * SatisfiedAction
     *
     * No description available
     */
    public satisfiedAction: StringProperty;

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
     * FormSubmissionId
     *
     * No description available
     */
    public formSubmissionId: StringProperty;

}
