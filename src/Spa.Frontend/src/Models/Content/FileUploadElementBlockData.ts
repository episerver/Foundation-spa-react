import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

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
