import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent, { BaseIContent } from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

/**
 * SubmitButtonElementBlock
 *
 * No Description available.
 *
 * @GUID ea72a208-1185-4141-a8a6-5febd7f5949a
 */
export default interface SubmitButtonElementBlockData extends IContent {
    /**
     * FinalizeForm
     *
     * No description available
     */
    finalizeForm: BooleanProperty

    /**
     * Label
     *
     * No description available
     */
    label: StringProperty

    /**
     * Image
     *
     * No description available
     */
    image: StringProperty

    /**
     * Description
     *
     * No description available
     */
    description: StringProperty

    /**
     * RedirectToPage
     *
     * No description available
     */
    redirectToPage: StringProperty

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

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface SubmitButtonElementBlockProps extends ComponentProps<SubmitButtonElementBlockData> {}

export class SubmitButtonElementBlockType extends BaseIContent<SubmitButtonElementBlockData> implements SubmitButtonElementBlockData {
    protected _typeName : string = "SubmitButtonElementBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'finalizeForm': 'Boolean',
        'label': 'LongString',
        'image': 'Url',
        'description': 'LongString',
        'redirectToPage': 'Url',
        'satisfiedAction': 'LongString',
        'conditionCombination': 'Number',
        'conditions': 'Dependency conditions collection',
    }

    /**
     * FinalizeForm
     *
     * No description available
     */
    public finalizeForm: BooleanProperty;

    /**
     * Label
     *
     * No description available
     */
    public label: StringProperty;

    /**
     * Image
     *
     * No description available
     */
    public image: StringProperty;

    /**
     * Description
     *
     * No description available
     */
    public description: StringProperty;

    /**
     * RedirectToPage
     *
     * No description available
     */
    public redirectToPage: StringProperty;

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

}
