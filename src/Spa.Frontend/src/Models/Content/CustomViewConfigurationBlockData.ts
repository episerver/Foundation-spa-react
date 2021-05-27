import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Content Manager View
 *
 * Block used to configure Content Manager views
 *
 * @GUID 8b6435d9-ea76-483b-9062-5b505adcaa9f
 */
export default interface CustomViewConfigurationBlockData extends Taxonomy.IContent {
    /**
     * Content root
     *
     * Root ContentLink for view
     */
    root: ContentDelivery.ContentReferenceProperty

    /**
     * Sort order
     *
     * Sort order in menu
     */
    sortOrder: ContentDelivery.NumberProperty

    /**
     * Enabled
     *
     * When true, then view is used by views provider
     */
    enabled: ContentDelivery.BooleanProperty

    /**
     * Newly created content
     *
     * ContentLink to container where contents should be added. It should be subfolder of the Content Root
     */
    newContentRoot: ContentDelivery.ContentReferenceProperty

    /**
     * Allowed types to add
     *
     * Types that editor can add when using external grid view
     */
    allowedTypesToAddString: ContentDelivery.StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface CustomViewConfigurationBlockProps extends ComponentTypes.AbstractComponentProps<CustomViewConfigurationBlockData> {}

export class CustomViewConfigurationBlockType extends Taxonomy.AbstractIContent<CustomViewConfigurationBlockData> implements CustomViewConfigurationBlockData {
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
    public get root() : CustomViewConfigurationBlockData["root"] { return this.getProperty("root"); }

    /**
     * Sort order
     *
     * Sort order in menu
     */
    public get sortOrder() : CustomViewConfigurationBlockData["sortOrder"] { return this.getProperty("sortOrder"); }

    /**
     * Enabled
     *
     * When true, then view is used by views provider
     */
    public get enabled() : CustomViewConfigurationBlockData["enabled"] { return this.getProperty("enabled"); }

    /**
     * Newly created content
     *
     * ContentLink to container where contents should be added. It should be subfolder of the Content Root
     */
    public get newContentRoot() : CustomViewConfigurationBlockData["newContentRoot"] { return this.getProperty("newContentRoot"); }

    /**
     * Allowed types to add
     *
     * Types that editor can add when using external grid view
     */
    public get allowedTypesToAddString() : CustomViewConfigurationBlockData["allowedTypesToAddString"] { return this.getProperty("allowedTypesToAddString"); }

}
