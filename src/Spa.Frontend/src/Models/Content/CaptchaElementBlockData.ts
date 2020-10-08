import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * CaptchaElementBlock
 *
 * No Description available.
 *
 * @GUID 0cffa8b6-3c20-4b97-914f-75a624b19bff
 */
export default interface CaptchaElementBlockData extends Taxonomy.IContent {
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
     * ImageWidth
     *
     * No description available
     */
    imageWidth: ContentDelivery.NumberProperty

    /**
     * ImageHeight
     *
     * No description available
     */
    imageHeight: ContentDelivery.NumberProperty

    /**
     * TextLength
     *
     * No description available
     */
    textLength: ContentDelivery.NumberProperty

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
export interface CaptchaElementBlockProps extends ComponentTypes.AbstractComponentProps<CaptchaElementBlockData> {}

export class CaptchaElementBlockType extends Taxonomy.AbstractIContent<CaptchaElementBlockData> implements CaptchaElementBlockData {
    protected _typeName : string = "CaptchaElementBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'label': 'LongString',
        'description': 'LongString',
        'validators': 'LongString',
        'imageWidth': 'Number',
        'imageHeight': 'Number',
        'textLength': 'Number',
        'validatorMessages': 'Validator with message collection',
    }

    /**
     * Label
     *
     * No description available
     */
    public get label() : CaptchaElementBlockData["label"] { return this.getProperty("label"); }

    /**
     * Description
     *
     * No description available
     */
    public get description() : CaptchaElementBlockData["description"] { return this.getProperty("description"); }

    /**
     * Validators
     *
     * No description available
     */
    public get validators() : CaptchaElementBlockData["validators"] { return this.getProperty("validators"); }

    /**
     * ImageWidth
     *
     * No description available
     */
    public get imageWidth() : CaptchaElementBlockData["imageWidth"] { return this.getProperty("imageWidth"); }

    /**
     * ImageHeight
     *
     * No description available
     */
    public get imageHeight() : CaptchaElementBlockData["imageHeight"] { return this.getProperty("imageHeight"); }

    /**
     * TextLength
     *
     * No description available
     */
    public get textLength() : CaptchaElementBlockData["textLength"] { return this.getProperty("textLength"); }

    /**
     * ValidatorMessages
     *
     * No description available
     */
    public get validatorMessages() : CaptchaElementBlockData["validatorMessages"] { return this.getProperty("validatorMessages"); }

}
