import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Site Structure Settings Page
 *
 * Site structure settings
 *
 * @GUID bf69f959-c91b-46cb-9829-2ecf9d11e13b
 */
export default interface ReferencePageSettingsData extends Taxonomy.IContent {
    /**
     * Search page
     *
     * No description available
     */
    searchPage: ContentDelivery.ContentReferenceProperty

    /**
     * Reset password
     *
     * No description available
     */
    resetPasswordMail: ContentDelivery.ContentReferenceProperty

    /**
     * Reset password page
     *
     * No description available
     */
    resetPasswordPage: ContentDelivery.ContentReferenceProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface ReferencePageSettingsProps extends ComponentTypes.AbstractComponentProps<ReferencePageSettingsData> {}

export class ReferencePageSettingsType extends Taxonomy.AbstractIContent<ReferencePageSettingsData> implements ReferencePageSettingsData {
    protected _typeName : string = "ReferencePageSettings";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'searchPage': 'ContentReference',
        'resetPasswordMail': 'ContentReference',
        'resetPasswordPage': 'ContentReference',
    }

    /**
     * Search page
     *
     * No description available
     */
    public get searchPage() : ReferencePageSettingsData["searchPage"] { return this.getProperty("searchPage"); }

    /**
     * Reset password
     *
     * No description available
     */
    public get resetPasswordMail() : ReferencePageSettingsData["resetPasswordMail"] { return this.getProperty("resetPasswordMail"); }

    /**
     * Reset password page
     *
     * No description available
     */
    public get resetPasswordPage() : ReferencePageSettingsData["resetPasswordPage"] { return this.getProperty("resetPasswordPage"); }

}
