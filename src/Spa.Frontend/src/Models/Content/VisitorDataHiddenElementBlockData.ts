import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'episerver/Property'
import IContent, { BaseIContent } from 'episerver/Models/IContent'
import ContentLink from 'episerver/Models/ContentLink'
import { ComponentProps } from 'episerver/EpiComponent'

/**
 * VisitorDataHiddenElementBlock
 *
 * No Description available.
 *
 * @GUID d08021d2-f73e-4359-9603-3c66d7eb97c6
 */
export default interface VisitorDataHiddenElementBlockData extends IContent {
    /**
     * VisitorDataSources
     *
     * No description available
     */
    visitorDataSources: StringProperty

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
export interface VisitorDataHiddenElementBlockProps extends ComponentProps<VisitorDataHiddenElementBlockData> {}

export class VisitorDataHiddenElementBlockType extends BaseIContent<VisitorDataHiddenElementBlockData> implements VisitorDataHiddenElementBlockData {
    protected _typeName : string = "VisitorDataHiddenElementBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'visitorDataSources': 'LongString',
        'forms_ExternalSystemsFieldMappings': 'Property Field Mapping Collection',
        'validatorMessages': 'Validator with message collection',
    }

    /**
     * VisitorDataSources
     *
     * No description available
     */
    public visitorDataSources: StringProperty;

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
