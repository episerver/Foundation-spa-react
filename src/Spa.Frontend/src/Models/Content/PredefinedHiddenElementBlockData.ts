import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from '@episerver/spa-core/Property'
import IContent, { BaseIContent } from '@episerver/spa-core/Models/IContent'
import ContentLink from '@episerver/spa-core/Models/ContentLink'
import { ComponentProps } from '@episerver/spa-core/EpiComponent'

/**
 * PredefinedHiddenElementBlock
 *
 * No Description available.
 *
 * @GUID d08021d2-ffff-4359-9603-3c66d7eb97c6
 */
export default interface PredefinedHiddenElementBlockData extends IContent {
    /**
     * PredefinedValue
     *
     * No description available
     */
    predefinedValue: StringProperty

    /**
     * External system field mapping
     *
     * No description available
     */
    forms_ExternalSystemsFieldMappings: Property<any> // Original type: Property Field Mapping Collection

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
export interface PredefinedHiddenElementBlockProps extends ComponentProps<PredefinedHiddenElementBlockData> {}

export class PredefinedHiddenElementBlockType extends BaseIContent<PredefinedHiddenElementBlockData> implements PredefinedHiddenElementBlockData {
    protected _typeName : string = "PredefinedHiddenElementBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'predefinedValue': 'LongString',
        'forms_ExternalSystemsFieldMappings': 'Property Field Mapping Collection',
        'validatorMessages': 'Validator with message collection',
    }

    /**
     * PredefinedValue
     *
     * No description available
     */
    public predefinedValue: StringProperty;

    /**
     * External system field mapping
     *
     * No description available
     */
    public forms_ExternalSystemsFieldMappings: Property<any> // Original type: Property Field Mapping Collection;

    /**
     * ValidatorMessages
     *
     * No description available
     */
    public validatorMessages: Property<any> // Original type: Validator with message collection;

}
