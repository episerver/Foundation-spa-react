import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

/**
 * Bookmarks Page
 *
 * This page displays list the different content that has been bookmarked belonging to an user
 *
 * @GUID 40e76908-6aa2-4cb7-8239-607d941df3a6
 */
export default interface BookmarksPageData extends IContent {
    /**
     * Categories
     *
     * Categories associated with this content.
     */
    categories: Property<Array<ContentLink>>

    /**
     * Teaser ratio (width-height)
     *
     * No description available
     */
    teaserRatio: StringProperty

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
export interface BookmarksPageProps extends ComponentProps<BookmarksPageData> {}