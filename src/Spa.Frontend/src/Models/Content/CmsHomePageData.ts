import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

/**
 * Cms Home Page
 *
 * Used for home page of all sites
 *
 * @GUID 452d1812-7385-42c3-8073-c1b7481e7b20
 */
export default interface CmsHomePageData extends IContent {
    /**
     * Main menu
     *
     * No description available
     */
    mainMenu: ContentAreaProperty

    /**
     * Introduction
     *
     * No description available
     */
    introduction: StringProperty

    /**
     * Site logo
     *
     * No description available
     */
    siteLogo: ContentReferenceProperty

    /**
     * Search page
     *
     * No description available
     */
    searchPage: ContentReferenceProperty

    /**
     * Categories
     *
     * Categories associated with this content.
     */
    categories: Property<Array<ContentLink>>

    /**
     * Banner text
     *
     * No description available
     */
    bannerText: StringProperty

    /**
     * Company header
     *
     * No description available
     */
    companyHeader: StringProperty

    /**
     * Company name
     *
     * No description available
     */
    companyName: StringProperty

    /**
     * Comapny address
     *
     * No description available
     */
    companyAddress: StringProperty

    /**
     * Reset password
     *
     * No description available
     */
    resetPasswordMail: ContentReferenceProperty

    /**
     * Menu style
     *
     * No description available
     */
    headerMenuStyle: StringProperty

    /**
     * My account menu (CMS)
     *
     * This menu will show if show commerce components in header is false
     */
    myAccountCmsMenu: LinkListProperty

    /**
     * Company phone
     *
     * No description available
     */
    companyPhone: StringProperty

    /**
     * Reset password page
     *
     * No description available
     */
    resetPasswordPage: ContentReferenceProperty

    /**
     * Company email
     *
     * No description available
     */
    companyEmail: StringProperty

    /**
     * Teaser ratio (width-height)
     *
     * No description available
     */
    teaserRatio: StringProperty

    /**
     * Links header
     *
     * No description available
     */
    linksHeader: StringProperty

    /**
     * Links
     *
     * No description available
     */
    links: LinkListProperty

    /**
     * Social header
     *
     * No description available
     */
    socialHeader: StringProperty

    /**
     * Social links
     *
     * No description available
     */
    socialLinks: LinkListProperty

    /**
     * Content area
     *
     * No description available
     */
    contentArea: ContentAreaProperty

    /**
     * Main body
     *
     * No description available
     */
    mainBody: StringProperty

    /**
     * Title
     *
     * No description available
     */
    metaTitle: StringProperty

    /**
     * Exclude from results
     *
     * This will determine whether or not to show on search
     */
    excludeFromSearch: BooleanProperty

    /**
     * Image
     *
     * No description available
     */
    pageImage: ContentReferenceProperty

    /**
     * CSS files
     *
     * No description available
     */
    cssFiles: LinkListProperty

    /**
     * Script files
     *
     * No description available
     */
    scriptFiles: LinkListProperty

    /**
     * Copyright
     *
     * No description available
     */
    footerCopyrightText: StringProperty

    /**
     * Top content area
     *
     * No description available
     */
    topContentArea: ContentAreaProperty

    /**
     * Content Manager
     *
     * No description available
     */
    contentManager: ContentAreaProperty

    /**
     * Main content area
     *
     * No description available
     */
    mainContentArea: ContentAreaProperty

    /**
     * Keywords
     *
     * No description available
     */
    keywords: StringProperty

    /**
     * Hide site header
     *
     * No description available
     */
    hideSiteHeader: BooleanProperty

    /**
     * Video
     *
     * No description available
     */
    teaserVideo: ContentReferenceProperty

    /**
     * CSS
     *
     * No description available
     */
    css: StringProperty

    /**
     * Scripts
     *
     * No description available
     */
    scripts: StringProperty

    /**
     * Bottom content area
     *
     * No description available
     */
    bottomContentArea: ContentAreaProperty

    /**
     * Page description
     *
     * No description available
     */
    pageDescription: StringProperty

    /**
     * Hide site footer
     *
     * No description available
     */
    hideSiteFooter: BooleanProperty

    /**
     * Text
     *
     * No description available
     */
    teaserText: StringProperty

    /**
     * Content type
     *
     * No description available
     */
    metaContentType: StringProperty

    /**
     * Industry
     *
     * No description available
     */
    industry: StringProperty

    /**
     * Author
     *
     * No description available
     */
    authorMetaData: StringProperty

    /**
     * Disable indexing
     *
     * No description available
     */
    disableIndexing: BooleanProperty

    /**
     * Highlight in page list
     *
     * No description available
     */
    highlight: BooleanProperty

    /**
     * Text alignment
     *
     * No description available
     */
    teaserTextAlignment: StringProperty

    /**
     * Color theme
     *
     * No description available
     */
    teaserColorTheme: StringProperty

    /**
     * Button label
     *
     * No description available
     */
    teaserButtonText: StringProperty

    /**
     * Button theme
     *
     * No description available
     */
    teaserButtonStyle: StringProperty

    /**
     * Display hover effect
     *
     * No description available
     */
    applyHoverEffect: BooleanProperty

    /**
     * Padding
     *
     * No description available
     */
    padding: StringProperty

    /**
     * Margin
     *
     * No description available
     */
    margin: StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface CmsHomePageProps extends ComponentProps<CmsHomePageData> {}
