import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

/**
 * Virtual template
 *
 * Saved the definition of the template into the content repository
 *
 * @GUID 7d4648cd-043d-4c57-815c-418cd885a5cf
 */
export default interface VirtualTemplateContentData extends IContent {
    /**
     * VirtualPath
     *
     * No description available
     */
    virtualPath: StringProperty

    /**
     * TemplateContents
     *
     * No description available
     */
    templateContents: StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface VirtualTemplateContentProps extends ComponentProps<VirtualTemplateContentData> {}
