import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * FileUploadElementBlock
 *
 * No Description available.
 *
 * @GUID b2401dfd-e792-4583-a74b-f053ac54a9a6
 */
export default interface FileUploadElementBlockData extends Taxonomy.IContent {
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
     * FileSize
     *
     * No description available
     */
    fileSize: ContentDelivery.NumberProperty

    /**
     * FileTypes
     *
     * No description available
     */
    fileTypes: ContentDelivery.StringProperty

    /**
     * Validators
     *
     * No description available
     */
    validators: ContentDelivery.StringProperty

    /**
     * AllowMultiple
     *
     * No description available
     */
    allowMultiple: ContentDelivery.BooleanProperty

    /**
     * /episerver/forms/contentediting/fielddependency/satisfiedaction
     *
     * No description available
     */
    satisfiedAction: ContentDelivery.StringProperty

    /**
     * /episerver/forms/contentediting/fielddependency/conditioncombination
     *
     * No description available
     */
    conditionCombination: ContentDelivery.NumberProperty

    /**
     * /episerver/forms/contentediting/fielddependency/fielddependencies
     *
     * No description available
     */
    conditions: ContentDelivery.Property<any> // Original type: Dependency conditions collection

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
export interface FileUploadElementBlockProps extends ComponentTypes.AbstractComponentProps<FileUploadElementBlockData> {}

export class FileUploadElementBlockType extends Taxonomy.AbstractIContent<FileUploadElementBlockData> implements FileUploadElementBlockData {
    protected _typeName : string = "FileUploadElementBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'label': 'LongString',
        'description': 'LongString',
        'fileSize': 'Number',
        'fileTypes': 'LongString',
        'validators': 'LongString',
        'allowMultiple': 'Boolean',
        'satisfiedAction': 'LongString',
        'conditionCombination': 'Number',
        'conditions': 'Dependency conditions collection',
        'validatorMessages': 'Validator with message collection',
    }

    /**
     * Label
     *
     * No description available
     */
    public get label() : FileUploadElementBlockData["label"] { return this.getProperty("label"); }

    /**
     * Description
     *
     * No description available
     */
    public get description() : FileUploadElementBlockData["description"] { return this.getProperty("description"); }

    /**
     * FileSize
     *
     * No description available
     */
    public get fileSize() : FileUploadElementBlockData["fileSize"] { return this.getProperty("fileSize"); }

    /**
     * FileTypes
     *
     * No description available
     */
    public get fileTypes() : FileUploadElementBlockData["fileTypes"] { return this.getProperty("fileTypes"); }

    /**
     * Validators
     *
     * No description available
     */
    public get validators() : FileUploadElementBlockData["validators"] { return this.getProperty("validators"); }

    /**
     * AllowMultiple
     *
     * No description available
     */
    public get allowMultiple() : FileUploadElementBlockData["allowMultiple"] { return this.getProperty("allowMultiple"); }

    /**
     * /episerver/forms/contentediting/fielddependency/satisfiedaction
     *
     * No description available
     */
    public get satisfiedAction() : FileUploadElementBlockData["satisfiedAction"] { return this.getProperty("satisfiedAction"); }

    /**
     * /episerver/forms/contentediting/fielddependency/conditioncombination
     *
     * No description available
     */
    public get conditionCombination() : FileUploadElementBlockData["conditionCombination"] { return this.getProperty("conditionCombination"); }

    /**
     * /episerver/forms/contentediting/fielddependency/fielddependencies
     *
     * No description available
     */
    public get conditions() : FileUploadElementBlockData["conditions"] { return this.getProperty("conditions"); }

    /**
     * ValidatorMessages
     *
     * No description available
     */
    public get validatorMessages() : FileUploadElementBlockData["validatorMessages"] { return this.getProperty("validatorMessages"); }

}
