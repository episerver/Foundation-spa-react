import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'episerver/Property'
import IContent, { BaseIContent } from 'episerver/Models/IContent'
import ContentLink from 'episerver/Models/ContentLink'
import { ComponentProps } from 'episerver/EpiComponent'

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

export class CookieDropBlockType extends BaseIContent<CookieDropBlockData> implements CookieDropBlockData {
    protected _typeName : string = "CookieDropBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'cookieName': 'LongString',
        'cookieValue': 'LongString',
        'hideEditModeMessage': 'Boolean',
    }

    /**
     * Cookie Name
     *
     * The name of the cookie to drop on the page
     */
    public cookieName: StringProperty;

    /**
     * Cookie Value
     *
     * The value to set for the cookie
     */
    public cookieValue: StringProperty;

    /**
     * Hide edit mode message
     *
     * If checked will hide the yellow message shown in on page edit mode
     */
    public hideEditModeMessage: BooleanProperty;

}
