import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'episerver/Property'
import IContent, { BaseIContent } from 'episerver/Models/IContent'
import ContentLink from 'episerver/Models/ContentLink'
import { ComponentProps } from 'episerver/EpiComponent'

/**
 * RecaptchaElementBlock
 *
 * No Description available.
 *
 * @GUID 2d7e4a18-8f8b-4c98-9e81-d97524c62561
 */
export default interface RecaptchaElementBlockData extends IContent {
    /**
     * Validators
     *
     * No description available
     */
    validators: StringProperty

    /**
     * SiteKey
     *
     * No description available
     */
    siteKey: StringProperty

    /**
     * SecretKey
     *
     * No description available
     */
    secretKey: StringProperty

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
export interface RecaptchaElementBlockProps extends ComponentProps<RecaptchaElementBlockData> {}

export class RecaptchaElementBlockType extends BaseIContent<RecaptchaElementBlockData> implements RecaptchaElementBlockData {
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
    public validators: StringProperty;

    /**
     * SiteKey
     *
     * No description available
     */
    public siteKey: StringProperty;

    /**
     * SecretKey
     *
     * No description available
     */
    public secretKey: StringProperty;

    /**
     * ValidatorMessages
     *
     * No description available
     */
    public validatorMessages: Property<any> // Original type: Validator with message collection;

}
