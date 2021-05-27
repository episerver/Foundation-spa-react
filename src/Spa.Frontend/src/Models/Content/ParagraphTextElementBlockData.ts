import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * ParagraphTextElementBlock
 *
 * No Description available.
 *
 * @GUID a917b1ae-738f-416d-b033-7c229559003d
 */
export default interface ParagraphTextElementBlockData extends Taxonomy.IContent {
    /**
     * ParagraphText
     *
     * No description available
     */
    paragraphText: ContentDelivery.StringProperty

    /**
     * SatisfiedAction
     *
     * No description available
     */
    satisfiedAction: ContentDelivery.StringProperty

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
     * /contenttypes/paragraphtextelementblock/placeholdersetting
     *
     * No description available
     */
    disablePlaceholdersReplacement: ContentDelivery.BooleanProperty

    /**
     * FormSubmissionId
     *
     * No description available
     */
    formSubmissionId: ContentDelivery.StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface ParagraphTextElementBlockProps extends ComponentTypes.AbstractComponentProps<ParagraphTextElementBlockData> {}

export class ParagraphTextElementBlockType extends Taxonomy.AbstractIContent<ParagraphTextElementBlockData> implements ParagraphTextElementBlockData {
    protected _typeName : string = "ParagraphTextElementBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'paragraphText': 'XhtmlString',
        'satisfiedAction': 'LongString',
        'conditionCombination': 'Number',
        'conditions': 'Dependency conditions collection',
        'disablePlaceholdersReplacement': 'Boolean',
        'formSubmissionId': 'LongString',
    }

    /**
     * ParagraphText
     *
     * No description available
     */
    public get paragraphText() : ParagraphTextElementBlockData["paragraphText"] { return this.getProperty("paragraphText"); }

    /**
     * SatisfiedAction
     *
     * No description available
     */
    public get satisfiedAction() : ParagraphTextElementBlockData["satisfiedAction"] { return this.getProperty("satisfiedAction"); }

    /**
     * ConditionCombination
     *
     * No description available
     */
    public get conditionCombination() : ParagraphTextElementBlockData["conditionCombination"] { return this.getProperty("conditionCombination"); }

    /**
     * Conditions
     *
     * No description available
     */
    public get conditions() : ParagraphTextElementBlockData["conditions"] { return this.getProperty("conditions"); }

    /**
     * /contenttypes/paragraphtextelementblock/placeholdersetting
     *
     * No description available
     */
    public get disablePlaceholdersReplacement() : ParagraphTextElementBlockData["disablePlaceholdersReplacement"] { return this.getProperty("disablePlaceholdersReplacement"); }

    /**
     * FormSubmissionId
     *
     * No description available
     */
    public get formSubmissionId() : ParagraphTextElementBlockData["formSubmissionId"] { return this.getProperty("formSubmissionId"); }

}
