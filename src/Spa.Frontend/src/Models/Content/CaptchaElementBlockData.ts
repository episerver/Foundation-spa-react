import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

/**
 * CaptchaElementBlock
 *
 * No Description available.
 *
 * @GUID 0cffa8b6-3c20-4b97-914f-75a624b19bff
 */
export default interface CaptchaElementBlockData extends IContent {
    /**
     * Label
     *
     * No description available
     */
    label: StringProperty

    /**
     * Description
     *
     * No description available
     */
    description: StringProperty

    /**
     * Validators
     *
     * No description available
     */
    validators: StringProperty

    /**
     * ImageWidth
     *
     * No description available
     */
    imageWidth: NumberProperty

    /**
     * ImageHeight
     *
     * No description available
     */
    imageHeight: NumberProperty

    /**
     * TextLength
     *
     * No description available
     */
    textLength: NumberProperty

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
export interface CaptchaElementBlockProps extends ComponentProps<CaptchaElementBlockData> {}
