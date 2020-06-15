import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from '@episerver/spa-core/Property'
import IContent, { BaseIContent } from '@episerver/spa-core/Models/IContent'
import ContentLink from '@episerver/spa-core/Models/ContentLink'
import { ComponentProps } from '@episerver/spa-core/EpiComponent'

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

export class CaptchaElementBlockType extends BaseIContent<CaptchaElementBlockData> implements CaptchaElementBlockData {
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
    public label: StringProperty;

    /**
     * Description
     *
     * No description available
     */
    public description: StringProperty;

    /**
     * Validators
     *
     * No description available
     */
    public validators: StringProperty;

    /**
     * ImageWidth
     *
     * No description available
     */
    public imageWidth: NumberProperty;

    /**
     * ImageHeight
     *
     * No description available
     */
    public imageHeight: NumberProperty;

    /**
     * TextLength
     *
     * No description available
     */
    public textLength: NumberProperty;

    /**
     * ValidatorMessages
     *
     * No description available
     */
    public validatorMessages: Property<any> // Original type: Validator with message collection;

}
