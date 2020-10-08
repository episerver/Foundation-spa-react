import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * RecaptchaElementBlock
 *
 * No Description available.
 *
 * @GUID 2d7e4a18-8f8b-4c98-9e81-d97524c62561
 */
export default interface RecaptchaElementBlockData extends Taxonomy.IContent {
    /**
     * Validators
     *
     * No description available
     */
    validators: ContentDelivery.StringProperty

    /**
     * SiteKey
     *
     * No description available
     */
    siteKey: ContentDelivery.StringProperty

    /**
     * SecretKey
     *
     * No description available
     */
    secretKey: ContentDelivery.StringProperty

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
export interface RecaptchaElementBlockProps extends ComponentTypes.AbstractComponentProps<RecaptchaElementBlockData> {}

export class RecaptchaElementBlockType extends Taxonomy.AbstractIContent<RecaptchaElementBlockData> implements RecaptchaElementBlockData {
    protected _typeName : string = "RecaptchaElementBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'validators': 'LongString',
        'siteKey': 'LongString',
        'secretKey': 'LongString',
        'validatorMessages': 'Validator with message collection',
    }

    /**
     * Validators
     *
     * No description available
     */
    public get validators() : RecaptchaElementBlockData["validators"] { return this.getProperty("validators"); }

    /**
     * SiteKey
     *
     * No description available
     */
    public get siteKey() : RecaptchaElementBlockData["siteKey"] { return this.getProperty("siteKey"); }

    /**
     * SecretKey
     *
     * No description available
     */
    public get secretKey() : RecaptchaElementBlockData["secretKey"] { return this.getProperty("secretKey"); }

    /**
     * ValidatorMessages
     *
     * No description available
     */
    public get validatorMessages() : RecaptchaElementBlockData["validatorMessages"] { return this.getProperty("validatorMessages"); }

}
