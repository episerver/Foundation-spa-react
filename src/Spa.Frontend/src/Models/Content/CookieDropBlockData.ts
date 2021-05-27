import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Cookie Drop Block
 *
 * Used to drop a cookie on a page
 *
 * @GUID 21957414-ab47-4788-b043-9dbe13b7eeb4
 */
export default interface CookieDropBlockData extends Taxonomy.IContent {
    /**
     * Cookie Name
     *
     * The name of the cookie to drop on the page
     */
    cookieName: ContentDelivery.StringProperty

    /**
     * Cookie Value
     *
     * The value to set for the cookie
     */
    cookieValue: ContentDelivery.StringProperty

    /**
     * Hide edit mode message
     *
     * If checked will hide the yellow message shown in on page edit mode
     */
    hideEditModeMessage: ContentDelivery.BooleanProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface CookieDropBlockProps extends ComponentTypes.AbstractComponentProps<CookieDropBlockData> {}

export class CookieDropBlockType extends Taxonomy.AbstractIContent<CookieDropBlockData> implements CookieDropBlockData {
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
    public get cookieName() : CookieDropBlockData["cookieName"] { return this.getProperty("cookieName"); }

    /**
     * Cookie Value
     *
     * The value to set for the cookie
     */
    public get cookieValue() : CookieDropBlockData["cookieValue"] { return this.getProperty("cookieValue"); }

    /**
     * Hide edit mode message
     *
     * If checked will hide the yellow message shown in on page edit mode
     */
    public get hideEditModeMessage() : CookieDropBlockData["hideEditModeMessage"] { return this.getProperty("hideEditModeMessage"); }

}
