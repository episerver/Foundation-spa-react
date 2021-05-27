import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Layout Settings
 *
 * Header settings, footer settings, menu settings
 *
 * @GUID f7366060-c801-494c-99b8-b761ac3447c3
 */
export default interface LayoutSettingsData extends Taxonomy.IContent {
    /**
     * Introduction
     *
     * No description available
     */
    introduction: ContentDelivery.StringProperty

    /**
     * Main menu
     *
     * No description available
     */
    mainMenu: ContentDelivery.ContentAreaProperty

    /**
     * Site logo
     *
     * No description available
     */
    siteLogo: ContentDelivery.ContentReferenceProperty

    /**
     * Logo height (pixels)
     *
     * No description available
     */
    logoHeight: ContentDelivery.NumberProperty

    /**
     * Header Background Color
     *
     * No description available
     */
    headerBackgroundColor: ContentDelivery.StringProperty

    /**
     * Company header
     *
     * No description available
     */
    companyHeader: ContentDelivery.StringProperty

    /**
     * Banner text
     *
     * No description available
     */
    bannerText: ContentDelivery.StringProperty

    /**
     * Company name
     *
     * No description available
     */
    companyName: ContentDelivery.StringProperty

    /**
     * Comapny address
     *
     * No description available
     */
    companyAddress: ContentDelivery.StringProperty

    /**
     * Menu style
     *
     * No description available
     */
    headerMenuStyle: ContentDelivery.StringProperty

    /**
     * Large header menu
     *
     * No description available
     */
    largeHeaderMenu: ContentDelivery.BooleanProperty

    /**
     * Company phone
     *
     * No description available
     */
    companyPhone: ContentDelivery.StringProperty

    /**
     * My account menu
     *
     * No description available
     */
    myAccountCmsMenu: ContentDelivery.LinkListProperty

    /**
     * Company email
     *
     * No description available
     */
    companyEmail: ContentDelivery.StringProperty

    /**
     * Sticky header
     *
     * No description available
     */
    stickyTopHeader: ContentDelivery.BooleanProperty

    /**
     * Links header
     *
     * No description available
     */
    linksHeader: ContentDelivery.StringProperty

    /**
     * Links
     *
     * No description available
     */
    links: ContentDelivery.LinkListProperty

    /**
     * Social header
     *
     * No description available
     */
    socialHeader: ContentDelivery.StringProperty

    /**
     * Social links
     *
     * No description available
     */
    socialLinks: ContentDelivery.LinkListProperty

    /**
     * Content area
     *
     * No description available
     */
    contentArea: ContentDelivery.ContentAreaProperty

    /**
     * Copyright
     *
     * No description available
     */
    footerCopyrightText: ContentDelivery.StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface LayoutSettingsProps extends ComponentTypes.AbstractComponentProps<LayoutSettingsData> {}

export class LayoutSettingsType extends Taxonomy.AbstractIContent<LayoutSettingsData> implements LayoutSettingsData {
    protected _typeName : string = "LayoutSettings";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'introduction': 'LongString',
        'mainMenu': 'ContentArea',
        'siteLogo': 'ContentReference',
        'logoHeight': 'Number',
        'headerBackgroundColor': 'LongString',
        'companyHeader': 'LongString',
        'bannerText': 'XhtmlString',
        'companyName': 'LongString',
        'companyAddress': 'LongString',
        'headerMenuStyle': 'LongString',
        'largeHeaderMenu': 'Boolean',
        'companyPhone': 'LongString',
        'myAccountCmsMenu': 'LinkCollection',
        'companyEmail': 'LongString',
        'stickyTopHeader': 'Boolean',
        'linksHeader': 'LongString',
        'links': 'LinkCollection',
        'socialHeader': 'LongString',
        'socialLinks': 'LinkCollection',
        'contentArea': 'ContentArea',
        'footerCopyrightText': 'LongString',
    }

    /**
     * Introduction
     *
     * No description available
     */
    public get introduction() : LayoutSettingsData["introduction"] { return this.getProperty("introduction"); }

    /**
     * Main menu
     *
     * No description available
     */
    public get mainMenu() : LayoutSettingsData["mainMenu"] { return this.getProperty("mainMenu"); }

    /**
     * Site logo
     *
     * No description available
     */
    public get siteLogo() : LayoutSettingsData["siteLogo"] { return this.getProperty("siteLogo"); }

    /**
     * Logo height (pixels)
     *
     * No description available
     */
    public get logoHeight() : LayoutSettingsData["logoHeight"] { return this.getProperty("logoHeight"); }

    /**
     * Header Background Color
     *
     * No description available
     */
    public get headerBackgroundColor() : LayoutSettingsData["headerBackgroundColor"] { return this.getProperty("headerBackgroundColor"); }

    /**
     * Company header
     *
     * No description available
     */
    public get companyHeader() : LayoutSettingsData["companyHeader"] { return this.getProperty("companyHeader"); }

    /**
     * Banner text
     *
     * No description available
     */
    public get bannerText() : LayoutSettingsData["bannerText"] { return this.getProperty("bannerText"); }

    /**
     * Company name
     *
     * No description available
     */
    public get companyName() : LayoutSettingsData["companyName"] { return this.getProperty("companyName"); }

    /**
     * Comapny address
     *
     * No description available
     */
    public get companyAddress() : LayoutSettingsData["companyAddress"] { return this.getProperty("companyAddress"); }

    /**
     * Menu style
     *
     * No description available
     */
    public get headerMenuStyle() : LayoutSettingsData["headerMenuStyle"] { return this.getProperty("headerMenuStyle"); }

    /**
     * Large header menu
     *
     * No description available
     */
    public get largeHeaderMenu() : LayoutSettingsData["largeHeaderMenu"] { return this.getProperty("largeHeaderMenu"); }

    /**
     * Company phone
     *
     * No description available
     */
    public get companyPhone() : LayoutSettingsData["companyPhone"] { return this.getProperty("companyPhone"); }

    /**
     * My account menu
     *
     * No description available
     */
    public get myAccountCmsMenu() : LayoutSettingsData["myAccountCmsMenu"] { return this.getProperty("myAccountCmsMenu"); }

    /**
     * Company email
     *
     * No description available
     */
    public get companyEmail() : LayoutSettingsData["companyEmail"] { return this.getProperty("companyEmail"); }

    /**
     * Sticky header
     *
     * No description available
     */
    public get stickyTopHeader() : LayoutSettingsData["stickyTopHeader"] { return this.getProperty("stickyTopHeader"); }

    /**
     * Links header
     *
     * No description available
     */
    public get linksHeader() : LayoutSettingsData["linksHeader"] { return this.getProperty("linksHeader"); }

    /**
     * Links
     *
     * No description available
     */
    public get links() : LayoutSettingsData["links"] { return this.getProperty("links"); }

    /**
     * Social header
     *
     * No description available
     */
    public get socialHeader() : LayoutSettingsData["socialHeader"] { return this.getProperty("socialHeader"); }

    /**
     * Social links
     *
     * No description available
     */
    public get socialLinks() : LayoutSettingsData["socialLinks"] { return this.getProperty("socialLinks"); }

    /**
     * Content area
     *
     * No description available
     */
    public get contentArea() : LayoutSettingsData["contentArea"] { return this.getProperty("contentArea"); }

    /**
     * Copyright
     *
     * No description available
     */
    public get footerCopyrightText() : LayoutSettingsData["footerCopyrightText"] { return this.getProperty("footerCopyrightText"); }

}
