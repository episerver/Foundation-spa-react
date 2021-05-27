import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * VisitorDataHiddenElementBlock
 *
 * No Description available.
 *
 * @GUID d08021d2-f73e-4359-9603-3c66d7eb97c6
 */
export default interface VisitorDataHiddenElementBlockData extends Taxonomy.IContent {
    /**
     * VisitorDataSources
     *
     * No description available
     */
    visitorDataSources: ContentDelivery.StringProperty

    /**
     * External system field mapping
     *
     * No description available
     */
    forms_ExternalSystemsFieldMappings: ContentDelivery.Property<any> // Original type: Property Field Mapping Collection

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
export interface VisitorDataHiddenElementBlockProps extends ComponentTypes.AbstractComponentProps<VisitorDataHiddenElementBlockData> {}

export class VisitorDataHiddenElementBlockType extends Taxonomy.AbstractIContent<VisitorDataHiddenElementBlockData> implements VisitorDataHiddenElementBlockData {
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
    public get visitorDataSources() : VisitorDataHiddenElementBlockData["visitorDataSources"] { return this.getProperty("visitorDataSources"); }

    /**
     * External system field mapping
     *
     * No description available
     */
    public get forms_ExternalSystemsFieldMappings() : VisitorDataHiddenElementBlockData["forms_ExternalSystemsFieldMappings"] { return this.getProperty("forms_ExternalSystemsFieldMappings"); }

    /**
     * ValidatorMessages
     *
     * No description available
     */
    public get validatorMessages() : VisitorDataHiddenElementBlockData["validatorMessages"] { return this.getProperty("validatorMessages"); }

}
