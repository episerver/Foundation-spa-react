import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'episerver/Property'
import IContent, { BaseIContent } from 'episerver/Models/IContent'
import ContentLink from 'episerver/Models/ContentLink'
import { ComponentProps } from 'episerver/EpiComponent'

/**
 * Standard Page
 *
 * Allows for creation of rich standard pages
 *
 * @GUID c0a25bb7-199c-457d-98c6-b0179c7acae8
 */
export default interface StandardPageData extends IContent {
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
     * Title color
     *
     * No description available
     */
    titleColor: StringProperty

    /**
     * Background color
     *
     * No description available
     */
    backgroundColor: StringProperty

    /**
     * Title opacity (0 to 1)
     *
     * No description available
     */
    backgroundOpacity: NumberProperty

    /**
     * Background image
     *
     * No description available
     */
    backgroundImage: ContentReferenceProperty

    /**
     * Background video
     *
     * No description available
     */
    backgroundVideo: ContentReferenceProperty

    /**
     * Top padding mode
     *
     * Sets how much padding should be at the top of the standard content
     */
    topPaddingMode: StringProperty

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
export interface StandardPageProps extends ComponentProps<StandardPageData> {}

export class StandardPageType extends BaseIContent<StandardPageData> implements StandardPageData {
    protected _typeName : string = "StandardPage";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'categories': 'ContentReferenceList',
        'teaserRatio': 'LongString',
        'mainBody': 'XhtmlString',
        'metaTitle': 'LongString',
        'excludeFromSearch': 'Boolean',
        'pageImage': 'ContentReference',
        'cssFiles': 'LinkCollection',
        'scriptFiles': 'LinkCollection',
        'mainContentArea': 'ContentArea',
        'keywords': 'LongString',
        'hideSiteHeader': 'Boolean',
        'teaserVideo': 'ContentReference',
        'css': 'LongString',
        'scripts': 'LongString',
        'titleColor': 'LongString',
        'backgroundColor': 'LongString',
        'backgroundOpacity': 'FloatNumber',
        'backgroundImage': 'ContentReference',
        'backgroundVideo': 'ContentReference',
        'topPaddingMode': 'LongString',
        'pageDescription': 'LongString',
        'hideSiteFooter': 'Boolean',
        'teaserText': 'LongString',
        'metaContentType': 'LongString',
        'industry': 'LongString',
        'authorMetaData': 'LongString',
        'disableIndexing': 'Boolean',
        'highlight': 'Boolean',
        'teaserTextAlignment': 'LongString',
        'teaserColorTheme': 'LongString',
        'teaserButtonText': 'LongString',
        'teaserButtonStyle': 'LongString',
        'applyHoverEffect': 'Boolean',
        'padding': 'LongString',
        'margin': 'LongString',
    }

    /**
     * Categories
     *
     * Categories associated with this content.
     */
    public categories: Property<Array<ContentLink>>;

    /**
     * Teaser ratio (width-height)
     *
     * No description available
     */
    public teaserRatio: StringProperty;

    /**
     * Main body
     *
     * No description available
     */
    public mainBody: StringProperty;

    /**
     * Title
     *
     * No description available
     */
    public metaTitle: StringProperty;

    /**
     * Exclude from results
     *
     * This will determine whether or not to show on search
     */
    public excludeFromSearch: BooleanProperty;

    /**
     * Image
     *
     * No description available
     */
    public pageImage: ContentReferenceProperty;

    /**
     * CSS files
     *
     * No description available
     */
    public cssFiles: LinkListProperty;

    /**
     * Script files
     *
     * No description available
     */
    public scriptFiles: LinkListProperty;

    /**
     * Main content area
     *
     * No description available
     */
    public mainContentArea: ContentAreaProperty;

    /**
     * Keywords
     *
     * No description available
     */
    public keywords: StringProperty;

    /**
     * Hide site header
     *
     * No description available
     */
    public hideSiteHeader: BooleanProperty;

    /**
     * Video
     *
     * No description available
     */
    public teaserVideo: ContentReferenceProperty;

    /**
     * CSS
     *
     * No description available
     */
    public css: StringProperty;

    /**
     * Scripts
     *
     * No description available
     */
    public scripts: StringProperty;

    /**
     * Title color
     *
     * No description available
     */
    public titleColor: StringProperty;

    /**
     * Background color
     *
     * No description available
     */
    public backgroundColor: StringProperty;

    /**
     * Title opacity (0 to 1)
     *
     * No description available
     */
    public backgroundOpacity: NumberProperty;

    /**
     * Background image
     *
     * No description available
     */
    public backgroundImage: ContentReferenceProperty;

    /**
     * Background video
     *
     * No description available
     */
    public backgroundVideo: ContentReferenceProperty;

    /**
     * Top padding mode
     *
     * Sets how much padding should be at the top of the standard content
     */
    public topPaddingMode: StringProperty;

    /**
     * Page description
     *
     * No description available
     */
    public pageDescription: StringProperty;

    /**
     * Hide site footer
     *
     * No description available
     */
    public hideSiteFooter: BooleanProperty;

    /**
     * Text
     *
     * No description available
     */
    public teaserText: StringProperty;

    /**
     * Content type
     *
     * No description available
     */
    public metaContentType: StringProperty;

    /**
     * Industry
     *
     * No description available
     */
    public industry: StringProperty;

    /**
     * Author
     *
     * No description available
     */
    public authorMetaData: StringProperty;

    /**
     * Disable indexing
     *
     * No description available
     */
    public disableIndexing: BooleanProperty;

    /**
     * Highlight in page list
     *
     * No description available
     */
    public highlight: BooleanProperty;

    /**
     * Text alignment
     *
     * No description available
     */
    public teaserTextAlignment: StringProperty;

    /**
     * Color theme
     *
     * No description available
     */
    public teaserColorTheme: StringProperty;

    /**
     * Button label
     *
     * No description available
     */
    public teaserButtonText: StringProperty;

    /**
     * Button theme
     *
     * No description available
     */
    public teaserButtonStyle: StringProperty;

    /**
     * Display hover effect
     *
     * No description available
     */
    public applyHoverEffect: BooleanProperty;

    /**
     * Padding
     *
     * No description available
     */
    public padding: StringProperty;

    /**
     * Margin
     *
     * No description available
     */
    public margin: StringProperty;

}
