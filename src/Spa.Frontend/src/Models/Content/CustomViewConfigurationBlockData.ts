import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from '@episerver/spa-core/Property'
import IContent, { BaseIContent } from '@episerver/spa-core/Models/IContent'
import ContentLink from '@episerver/spa-core/Models/ContentLink'
import { ComponentProps } from '@episerver/spa-core/EpiComponent'

/**
 * Content Manager View
 *
 * Block used to configure Content Manager views
 *
 * @GUID 8b6435d9-ea76-483b-9062-5b505adcaa9f
 */
export default interface CustomViewConfigurationBlockData extends IContent {
    /**
     * Content root
     *
     * Root ContentLink for view
     */
    root: ContentReferenceProperty

    /**
     * Sort order
     *
     * Sort order in menu
     */
    sortOrder: NumberProperty

    /**
     * Enabled
     *
     * When true, then view is used by views provider
     */
    enabled: BooleanProperty

    /**
     * Newly created content
     *
     * ContentLink to container where contents should be added. It should be subfolder of the Content Root
     */
    newContentRoot: ContentReferenceProperty

    /**
     * Allowed types to add
     *
     * Types that editor can add when using external grid view
     */
    allowedTypesToAddString: StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface CustomViewConfigurationBlockProps extends ComponentProps<CustomViewConfigurationBlockData> {}

export class CustomViewConfigurationBlockType extends BaseIContent<CustomViewConfigurationBlockData> implements CustomViewConfigurationBlockData {
    protected _typeName : string = "CustomViewConfigurationBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'root': 'ContentReference',
        'sortOrder': 'Number',
        'enabled': 'Boolean',
        'newContentRoot': 'ContentReference',
        'allowedTypesToAddString': 'LongString',
    }

    /**
     * Content root
     *
     * Root ContentLink for view
     */
    public root: ContentReferenceProperty;

    /**
     * Sort order
     *
     * Sort order in menu
     */
    public sortOrder: NumberProperty;

    /**
     * Enabled
     *
     * When true, then view is used by views provider
     */
    public enabled: BooleanProperty;

    /**
     * Newly created content
     *
     * ContentLink to container where contents should be added. It should be subfolder of the Content Root
     */
    public newContentRoot: ContentReferenceProperty;

    /**
     * Allowed types to add
     *
     * Types that editor can add when using external grid view
     */
    public allowedTypesToAddString: StringProperty;

}
