import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from '@episerver/spa-core/Property'
import IContent, { BaseIContent } from '@episerver/spa-core/Models/IContent'
import ContentLink from '@episerver/spa-core/Models/ContentLink'
import { ComponentProps } from '@episerver/spa-core/EpiComponent'

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

export class VirtualTemplateContentType extends BaseIContent<VirtualTemplateContentData> implements VirtualTemplateContentData {
    protected _typeName : string = "VirtualTemplateContent";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'virtualPath': 'LongString',
        'templateContents': 'LongString',
    }

    /**
     * VirtualPath
     *
     * No description available
     */
    public virtualPath: StringProperty;

    /**
     * TemplateContents
     *
     * No description available
     */
    public templateContents: StringProperty;

}
