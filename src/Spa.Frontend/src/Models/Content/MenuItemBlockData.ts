import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from '@episerver/spa-core/Property'
import IContent, { BaseIContent } from '@episerver/spa-core/Models/IContent'
import ContentLink from '@episerver/spa-core/Models/ContentLink'
import { ComponentProps } from '@episerver/spa-core/EpiComponent'

/**
 * Menu Item Block
 *
 * Used to create a menu item
 *
 * @GUID a6d0242a-3946-4a80-9eec-4d9b2e5fc2d0
 */
export default interface MenuItemBlockData extends IContent {
    /**
     * Name
     *
     * Name in menu
     */
    name: StringProperty

    /**
     * Link
     *
     * Link
     */
    link: StringProperty

    /**
     * Menu item image
     *
     * No description available
     */
    menuImage: ContentReferenceProperty

    /**
     * Teaser text
     *
     * No description available
     */
    teaserText: StringProperty

    /**
     * Label
     *
     * No description available
     */
    buttonText: StringProperty

    /**
     * Button link
     *
     * No description available
     */
    buttonLink: StringProperty

    /**
     * Child items
     *
     * No description available
     */
    childItems: Property<any> // Original type: GroupLinkCollectionProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface MenuItemBlockProps extends ComponentProps<MenuItemBlockData> {}

export class MenuItemBlockType extends BaseIContent<MenuItemBlockData> implements MenuItemBlockData {
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
    public name: StringProperty;

    /**
     * Link
     *
     * Link
     */
    public link: StringProperty;

    /**
     * Menu item image
     *
     * No description available
     */
    public menuImage: ContentReferenceProperty;

    /**
     * Teaser text
     *
     * No description available
     */
    public teaserText: StringProperty;

    /**
     * Label
     *
     * No description available
     */
    public buttonText: StringProperty;

    /**
     * Button link
     *
     * No description available
     */
    public buttonLink: StringProperty;

    /**
     * Child items
     *
     * No description available
     */
    public childItems: Property<any> // Original type: GroupLinkCollectionProperty;

}
