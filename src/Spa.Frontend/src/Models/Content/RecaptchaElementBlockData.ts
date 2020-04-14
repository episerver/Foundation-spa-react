import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

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
