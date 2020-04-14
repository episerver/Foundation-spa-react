import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

/**
 * FormStepBlock
 *
 * No Description available.
 *
 * @GUID 4daf691c-1dc9-4182-b04e-f0ed5d449bb9
 */
export default interface FormStepBlockData extends IContent {
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
     * AttachedContentLink
     *
     * No description available
     */
    attachedContentLink: StringProperty

    /**
     * DependField
     *
     * No description available
     */
    dependField: ContentReferenceProperty

    /**
     * DependCondition
     *
     * No description available
     */
    dependCondition: NumberProperty

    /**
     * DependValue
     *
     * No description available
     */
    dependValue: StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface FormStepBlockProps extends ComponentProps<FormStepBlockData> {}
