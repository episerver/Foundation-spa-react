import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

/**
 * Cookie Drop Block
 *
 * Used to drop a cookie on a page
 *
 * @GUID 21957414-ab47-4788-b043-9dbe13b7eeb4
 */
export default interface CookieDropBlockData extends IContent {
    /**
     * Cookie Name
     *
     * The name of the cookie to drop on the page
     */
    cookieName: StringProperty

    /**
     * Cookie Value
     *
     * The value to set for the cookie
     */
    cookieValue: StringProperty

    /**
     * Hide edit mode message
     *
     * If checked will hide the yellow message shown in on page edit mode
     */
    hideEditModeMessage: BooleanProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface CookieDropBlockProps extends ComponentProps<CookieDropBlockData> {}
