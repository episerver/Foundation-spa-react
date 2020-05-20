import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'episerver/Property'
import IContent, { BaseIContent } from 'episerver/Models/IContent'
import ContentLink from 'episerver/Models/ContentLink'
import { ComponentProps } from 'episerver/EpiComponent'

/**
 * FileUploadElementBlock
 *
 * No Description available.
 *
 * @GUID b2401dfd-e792-4583-a74b-f053ac54a9a6
 */
export default interface FileUploadElementBlockData extends IContent {
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
     * FileSize
     *
     * No description available
     */
    fileSize: NumberProperty

    /**
     * FileTypes
     *
     * No description available
     */
    fileTypes: StringProperty

    /**
     * Validators
     *
     * No description available
     */
    validators: StringProperty

    /**
     * AllowMultiple
     *
     * No description available
     */
    allowMultiple: BooleanProperty

    /**
     * /episerver/forms/contentediting/fielddependency/satisfiedaction
     *
     * No description available
     */
    satisfiedAction: StringProperty

    /**
     * /episerver/forms/contentediting/fielddependency/conditioncombination
     *
     * No description available
     */
    conditionCombination: NumberProperty

    /**
     * /episerver/forms/contentediting/fielddependency/fielddependencies
     *
     * No description available
     */
    conditions: Property<any> // Original type: Dependency conditions collection

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
export interface FileUploadElementBlockProps extends ComponentProps<FileUploadElementBlockData> {}

export class FileUploadElementBlockType extends BaseIContent<FileUploadElementBlockData> implements FileUploadElementBlockData {
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
    public label: StringProperty;

    /**
     * Description
     *
     * No description available
     */
    public description: StringProperty;

    /**
     * FileSize
     *
     * No description available
     */
    public fileSize: NumberProperty;

    /**
     * FileTypes
     *
     * No description available
     */
    public fileTypes: StringProperty;

    /**
     * Validators
     *
     * No description available
     */
    public validators: StringProperty;

    /**
     * AllowMultiple
     *
     * No description available
     */
    public allowMultiple: BooleanProperty;

    /**
     * /episerver/forms/contentediting/fielddependency/satisfiedaction
     *
     * No description available
     */
    public satisfiedAction: StringProperty;

    /**
     * /episerver/forms/contentediting/fielddependency/conditioncombination
     *
     * No description available
     */
    public conditionCombination: NumberProperty;

    /**
     * /episerver/forms/contentediting/fielddependency/fielddependencies
     *
     * No description available
     */
    public conditions: Property<any> // Original type: Dependency conditions collection;

    /**
     * ValidatorMessages
     *
     * No description available
     */
    public validatorMessages: Property<any> // Original type: Validator with message collection;

}
