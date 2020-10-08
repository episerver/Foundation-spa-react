import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * PredefinedHiddenElementBlock
 *
 * No Description available.
 *
 * @GUID d08021d2-ffff-4359-9603-3c66d7eb97c6
 */
export default interface PredefinedHiddenElementBlockData extends Taxonomy.IContent {
    /**
     * PredefinedValue
     *
     * No description available
     */
    predefinedValue: ContentDelivery.StringProperty

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
export interface PredefinedHiddenElementBlockProps extends ComponentTypes.AbstractComponentProps<PredefinedHiddenElementBlockData> {}

export class PredefinedHiddenElementBlockType extends Taxonomy.AbstractIContent<PredefinedHiddenElementBlockData> implements PredefinedHiddenElementBlockData {
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
    public get predefinedValue() : PredefinedHiddenElementBlockData["predefinedValue"] { return this.getProperty("predefinedValue"); }

    /**
     * External system field mapping
     *
     * No description available
     */
    public get forms_ExternalSystemsFieldMappings() : PredefinedHiddenElementBlockData["forms_ExternalSystemsFieldMappings"] { return this.getProperty("forms_ExternalSystemsFieldMappings"); }

    /**
     * ValidatorMessages
     *
     * No description available
     */
    public get validatorMessages() : PredefinedHiddenElementBlockData["validatorMessages"] { return this.getProperty("validatorMessages"); }

}
