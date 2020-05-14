import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent, { BaseIContent } from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

/**
 * Location Item Page
 *
 * Used to display the details of a location
 *
 * @GUID ac26ee4b-104f-4719-8aab-ad6d3fcb0d75
 */
export default interface LocationItemPageData extends IContent {
    /**
     * Intro text
     *
     * No description available
     */
    mainIntro: StringProperty

    /**
     * Continent
     *
     * No description available
     */
    continent: StringProperty

    /**
     * Categories
     *
     * Categories associated with this content.
     */
    categories: Property<Array<ContentLink>>

    /**
     * Country
     *
     * No description available
     */
    country: StringProperty

    /**
     * Latitude
     *
     * No description available
     */
    latitude: NumberProperty

    /**
     * Longitude
     *
     * No description available
     */
    longitude: NumberProperty

    /**
     * Average temperature
     *
     * No description available
     */
    avgTemp: NumberProperty

    /**
     * Teaser ratio (width-height)
     *
     * No description available
     */
    teaserRatio: StringProperty

    /**
     * Airport initials
     *
     * No description available
     */
    airportInitials: StringProperty

    /**
     * Yearly passengers
     *
     * No description available
     */
    yearlyPassengers: NumberProperty

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
     * Image
     *
     * No description available
     */
    image: ContentReferenceProperty

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
     * Left content area
     *
     * No description available
     */
    leftContentArea: ContentAreaProperty

    /**
     * New location
     *
     * No description available
     */
    new: BooleanProperty

    /**
     * Promoted location
     *
     * Check this, in order to boost this destination and promote it in suggestions
     */
    promoted: BooleanProperty

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
export interface LocationItemPageProps extends ComponentProps<LocationItemPageData> {}

export class LocationItemPageType extends BaseIContent<LocationItemPageData> implements LocationItemPageData {
    protected _typeName : string = "LocationItemPage";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'mainIntro': 'LongString',
        'continent': 'String',
        'categories': 'ContentReferenceList',
        'country': 'String',
        'latitude': 'FloatNumber',
        'longitude': 'FloatNumber',
        'avgTemp': 'FloatNumber',
        'teaserRatio': 'LongString',
        'airportInitials': 'String',
        'yearlyPassengers': 'Number',
        'mainBody': 'XhtmlString',
        'metaTitle': 'LongString',
        'excludeFromSearch': 'Boolean',
        'pageImage': 'ContentReference',
        'cssFiles': 'LinkCollection',
        'scriptFiles': 'LinkCollection',
        'image': 'ContentReference',
        'mainContentArea': 'ContentArea',
        'keywords': 'LongString',
        'hideSiteHeader': 'Boolean',
        'teaserVideo': 'ContentReference',
        'css': 'LongString',
        'scripts': 'LongString',
        'leftContentArea': 'ContentArea',
        'new': 'Boolean',
        'promoted': 'Boolean',
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
     * Intro text
     *
     * No description available
     */
    public mainIntro: StringProperty;

    /**
     * Continent
     *
     * No description available
     */
    public continent: StringProperty;

    /**
     * Categories
     *
     * Categories associated with this content.
     */
    public categories: Property<Array<ContentLink>>;

    /**
     * Country
     *
     * No description available
     */
    public country: StringProperty;

    /**
     * Latitude
     *
     * No description available
     */
    public latitude: NumberProperty;

    /**
     * Longitude
     *
     * No description available
     */
    public longitude: NumberProperty;

    /**
     * Average temperature
     *
     * No description available
     */
    public avgTemp: NumberProperty;

    /**
     * Teaser ratio (width-height)
     *
     * No description available
     */
    public teaserRatio: StringProperty;

    /**
     * Airport initials
     *
     * No description available
     */
    public airportInitials: StringProperty;

    /**
     * Yearly passengers
     *
     * No description available
     */
    public yearlyPassengers: NumberProperty;

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
     * Image
     *
     * No description available
     */
    public image: ContentReferenceProperty;

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
     * Left content area
     *
     * No description available
     */
    public leftContentArea: ContentAreaProperty;

    /**
     * New location
     *
     * No description available
     */
    public new: BooleanProperty;

    /**
     * Promoted location
     *
     * Check this, in order to boost this destination and promote it in suggestions
     */
    public promoted: BooleanProperty;

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
