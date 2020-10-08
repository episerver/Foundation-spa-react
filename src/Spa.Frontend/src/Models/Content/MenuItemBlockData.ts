import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Menu Item Block
 *
 * Used to create a menu item
 *
 * @GUID a6d0242a-3946-4a80-9eec-4d9b2e5fc2d0
 */
export default interface MenuItemBlockData extends Taxonomy.IContent {
    /**
     * Name
     *
     * Name in menu
     */
    name: ContentDelivery.StringProperty

    /**
     * Link
     *
     * Link
     */
    link: ContentDelivery.StringProperty

    /**
     * Menu item image
     *
     * No description available
     */
    menuImage: ContentDelivery.ContentReferenceProperty

    /**
     * Teaser text
     *
     * No description available
     */
    teaserText: ContentDelivery.StringProperty

    /**
     * Label
     *
     * No description available
     */
    buttonText: ContentDelivery.StringProperty

    /**
     * Button link
     *
     * No description available
     */
    buttonLink: ContentDelivery.StringProperty

    /**
     * Child items
     *
     * No description available
     */
    childItems: ContentDelivery.Property<any> // Original type: GroupLinkCollectionProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface MenuItemBlockProps extends ComponentTypes.AbstractComponentProps<MenuItemBlockData> {}

export class MenuItemBlockType extends Taxonomy.AbstractIContent<MenuItemBlockData> implements MenuItemBlockData {
    protected _typeName : string = "MenuItemBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'name': 'LongString',
        'link': 'Url',
        'menuImage': 'ContentReference',
        'teaserText': 'XhtmlString',
        'buttonText': 'LongString',
        'buttonLink': 'Url',
        'childItems': 'GroupLinkCollectionProperty',
    }

    /**
     * Name
     *
     * Name in menu
     */
    public get name() : MenuItemBlockData["name"] { return this.getProperty("name"); }

    /**
     * Link
     *
     * Link
     */
    public get link() : MenuItemBlockData["link"] { return this.getProperty("link"); }

    /**
     * Menu item image
     *
     * No description available
     */
    public get menuImage() : MenuItemBlockData["menuImage"] { return this.getProperty("menuImage"); }

    /**
     * Teaser text
     *
     * No description available
     */
    public get teaserText() : MenuItemBlockData["teaserText"] { return this.getProperty("teaserText"); }

    /**
     * Label
     *
     * No description available
     */
    public get buttonText() : MenuItemBlockData["buttonText"] { return this.getProperty("buttonText"); }

    /**
     * Button link
     *
     * No description available
     */
    public get buttonLink() : MenuItemBlockData["buttonLink"] { return this.getProperty("buttonLink"); }

    /**
     * Child items
     *
     * No description available
     */
    public get childItems() : MenuItemBlockData["childItems"] { return this.getProperty("childItems"); }

}
