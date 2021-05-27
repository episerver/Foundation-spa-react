import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * SubmitButtonElementBlock
 *
 * No Description available.
 *
 * @GUID ea72a208-1185-4141-a8a6-5febd7f5949a
 */
export default interface SubmitButtonElementBlockData extends Taxonomy.IContent {
    /**
     * FinalizeForm
     *
     * No description available
     */
    finalizeForm: ContentDelivery.BooleanProperty

    /**
     * Label
     *
     * No description available
     */
    label: ContentDelivery.StringProperty

    /**
     * Image
     *
     * No description available
     */
    image: ContentDelivery.StringProperty

    /**
     * Description
     *
     * No description available
     */
    description: ContentDelivery.StringProperty

    /**
     * RedirectToPage
     *
     * No description available
     */
    redirectToPage: ContentDelivery.StringProperty

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

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface SubmitButtonElementBlockProps extends ComponentTypes.AbstractComponentProps<SubmitButtonElementBlockData> {}

export class SubmitButtonElementBlockType extends Taxonomy.AbstractIContent<SubmitButtonElementBlockData> implements SubmitButtonElementBlockData {
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
    public get finalizeForm() : SubmitButtonElementBlockData["finalizeForm"] { return this.getProperty("finalizeForm"); }

    /**
     * Label
     *
     * No description available
     */
    public get label() : SubmitButtonElementBlockData["label"] { return this.getProperty("label"); }

    /**
     * Image
     *
     * No description available
     */
    public get image() : SubmitButtonElementBlockData["image"] { return this.getProperty("image"); }

    /**
     * Description
     *
     * No description available
     */
    public get description() : SubmitButtonElementBlockData["description"] { return this.getProperty("description"); }

    /**
     * RedirectToPage
     *
     * No description available
     */
    public get redirectToPage() : SubmitButtonElementBlockData["redirectToPage"] { return this.getProperty("redirectToPage"); }

    /**
     * SatisfiedAction
     *
     * No description available
     */
    public get satisfiedAction() : SubmitButtonElementBlockData["satisfiedAction"] { return this.getProperty("satisfiedAction"); }

    /**
     * ConditionCombination
     *
     * No description available
     */
    public get conditionCombination() : SubmitButtonElementBlockData["conditionCombination"] { return this.getProperty("conditionCombination"); }

    /**
     * Conditions
     *
     * No description available
     */
    public get conditions() : SubmitButtonElementBlockData["conditions"] { return this.getProperty("conditions"); }

}
