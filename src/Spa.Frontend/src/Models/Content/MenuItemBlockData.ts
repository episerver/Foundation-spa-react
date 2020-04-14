import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

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
