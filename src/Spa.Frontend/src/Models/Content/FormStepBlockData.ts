import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * FormStepBlock
 *
 * No Description available.
 *
 * @GUID 4daf691c-1dc9-4182-b04e-f0ed5d449bb9
 */
export default interface FormStepBlockData extends Taxonomy.IContent {
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
     * AttachedContentLink
     *
     * No description available
     */
    attachedContentLink: ContentDelivery.StringProperty

    /**
     * DependField
     *
     * No description available
     */
    dependField: ContentDelivery.ContentReferenceProperty

    /**
     * DependCondition
     *
     * No description available
     */
    dependCondition: ContentDelivery.NumberProperty

    /**
     * DependValue
     *
     * No description available
     */
    dependValue: ContentDelivery.StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface FormStepBlockProps extends ComponentTypes.AbstractComponentProps<FormStepBlockData> {}

export class FormStepBlockType extends Taxonomy.AbstractIContent<FormStepBlockData> implements FormStepBlockData {
    protected _typeName : string = "FormStepBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'label': 'LongString',
        'description': 'LongString',
        'attachedContentLink': 'Url',
        'dependField': 'ContentReference',
        'dependCondition': 'Number',
        'dependValue': 'LongString',
    }

    /**
     * Label
     *
     * No description available
     */
    public get label() : FormStepBlockData["label"] { return this.getProperty("label"); }

    /**
     * Description
     *
     * No description available
     */
    public get description() : FormStepBlockData["description"] { return this.getProperty("description"); }

    /**
     * AttachedContentLink
     *
     * No description available
     */
    public get attachedContentLink() : FormStepBlockData["attachedContentLink"] { return this.getProperty("attachedContentLink"); }

    /**
     * DependField
     *
     * No description available
     */
    public get dependField() : FormStepBlockData["dependField"] { return this.getProperty("dependField"); }

    /**
     * DependCondition
     *
     * No description available
     */
    public get dependCondition() : FormStepBlockData["dependCondition"] { return this.getProperty("dependCondition"); }

    /**
     * DependValue
     *
     * No description available
     */
    public get dependValue() : FormStepBlockData["dependValue"] { return this.getProperty("dependValue"); }

}
