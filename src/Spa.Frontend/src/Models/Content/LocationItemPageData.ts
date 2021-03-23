import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Location Item Page
 *
 * Used to display the details of a location
 *
 * @GUID ac26ee4b-104f-4719-8aab-ad6d3fcb0d75
 */
export default interface LocationItemPageData extends Taxonomy.IContent {
    /**
     * Intro text
     *
     * No description available
     */
    mainIntro: ContentDelivery.StringProperty

    /**
     * Continent
     *
     * No description available
     */
    continent: ContentDelivery.StringProperty

    /**
     * Categories
     *
     * Categories associated with this content.
     */
    categories: ContentDelivery.ContentReferenceListProperty

    /**
     * Country
     *
     * No description available
     */
    country: ContentDelivery.StringProperty

    /**
     * Latitude
     *
     * No description available
     */
    latitude: ContentDelivery.NumberProperty

    /**
     * Longitude
     *
     * No description available
     */
    longitude: ContentDelivery.NumberProperty

    /**
     * Average temperature
     *
     * No description available
     */
    avgTemp: ContentDelivery.NumberProperty

    /**
     * Teaser ratio (width-height)
     *
     * No description available
     */
    teaserRatio: ContentDelivery.StringProperty

    /**
     * Airport initials
     *
     * No description available
     */
    airportInitials: ContentDelivery.StringProperty

    /**
     * Yearly passengers
     *
     * No description available
     */
    yearlyPassengers: ContentDelivery.NumberProperty

    /**
     * Main body
     *
     * No description available
     */
    mainBody: ContentDelivery.StringProperty

    /**
     * Title
     *
     * No description available
     */
    metaTitle: ContentDelivery.StringProperty

    /**
     * Exclude from results
     *
     * This will determine whether or not to show on search
     */
    excludeFromSearch: ContentDelivery.BooleanProperty

    /**
     * Image
     *
     * No description available
     */
    pageImage: ContentDelivery.ContentReferenceProperty

    /**
     * CSS files
     *
     * No description available
     */
    cssFiles: ContentDelivery.LinkListProperty

    /**
     * Script files
     *
     * No description available
     */
    scriptFiles: ContentDelivery.LinkListProperty

    /**
     * Image
     *
     * No description available
     */
    image: ContentDelivery.ContentReferenceProperty

    /**
     * Main content area
     *
     * No description available
     */
    mainContentArea: ContentDelivery.ContentAreaProperty

    /**
     * Keywords
     *
     * No description available
     */
    keywords: ContentDelivery.StringProperty

    /**
     * Hide site header
     *
     * No description available
     */
    hideSiteHeader: ContentDelivery.BooleanProperty

    /**
     * Video
     *
     * No description available
     */
    teaserVideo: ContentDelivery.ContentReferenceProperty

    /**
     * CSS
     *
     * No description available
     */
    css: ContentDelivery.StringProperty

    /**
     * Scripts
     *
     * No description available
     */
    scripts: ContentDelivery.StringProperty

    /**
     * Left content area
     *
     * No description available
     */
    leftContentArea: ContentDelivery.ContentAreaProperty

    /**
     * New location
     *
     * No description available
     */
    new: ContentDelivery.BooleanProperty

    /**
     * Promoted location
     *
     * Check this, in order to boost this destination and promote it in suggestions
     */
    promoted: ContentDelivery.BooleanProperty

    /**
     * Page description
     *
     * No description available
     */
    pageDescription: ContentDelivery.StringProperty

    /**
     * Hide site footer
     *
     * No description available
     */
    hideSiteFooter: ContentDelivery.BooleanProperty

    /**
     * Text
     *
     * No description available
     */
    teaserText: ContentDelivery.StringProperty

    /**
     * Content type
     *
     * No description available
     */
    metaContentType: ContentDelivery.StringProperty

    /**
     * Industry
     *
     * No description available
     */
    industry: ContentDelivery.StringProperty

    /**
     * Author
     *
     * No description available
     */
    authorMetaData: ContentDelivery.StringProperty

    /**
     * Disable indexing
     *
     * No description available
     */
    disableIndexing: ContentDelivery.BooleanProperty

    /**
     * Highlight in page list
     *
     * No description available
     */
    highlight: ContentDelivery.BooleanProperty

    /**
     * Text alignment
     *
     * No description available
     */
    teaserTextAlignment: ContentDelivery.StringProperty

    /**
     * Color theme
     *
     * No description available
     */
    teaserColorTheme: ContentDelivery.StringProperty

    /**
     * Button label
     *
     * No description available
     */
    teaserButtonText: ContentDelivery.StringProperty

    /**
     * Button theme
     *
     * No description available
     */
    teaserButtonStyle: ContentDelivery.StringProperty

    /**
     * Button color
     *
     * No description available
     */
    teaserButtonColor: ContentDelivery.StringProperty

    /**
     * Button text color
     *
     * No description available
     */
    teaserButtonTextColor: ContentDelivery.StringProperty

    /**
     * Display hover effect
     *
     * No description available
     */
    applyHoverEffect: ContentDelivery.BooleanProperty

    /**
     * Padding
     *
     * No description available
     */
    padding: ContentDelivery.StringProperty

    /**
     * Margin
     *
     * No description available
     */
    margin: ContentDelivery.StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface LocationItemPageProps extends ComponentTypes.AbstractComponentProps<LocationItemPageData> {}

export class LocationItemPageType extends Taxonomy.AbstractIContent<LocationItemPageData> implements LocationItemPageData {
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
        'teaserButtonColor': 'LongString',
        'teaserButtonTextColor': 'LongString',
        'applyHoverEffect': 'Boolean',
        'padding': 'LongString',
        'margin': 'LongString',
    }

    /**
     * Intro text
     *
     * No description available
     */
    public get mainIntro() : LocationItemPageData["mainIntro"] { return this.getProperty("mainIntro"); }

    /**
     * Continent
     *
     * No description available
     */
    public get continent() : LocationItemPageData["continent"] { return this.getProperty("continent"); }

    /**
     * Categories
     *
     * Categories associated with this content.
     */
    public get categories() : LocationItemPageData["categories"] { return this.getProperty("categories"); }

    /**
     * Country
     *
     * No description available
     */
    public get country() : LocationItemPageData["country"] { return this.getProperty("country"); }

    /**
     * Latitude
     *
     * No description available
     */
    public get latitude() : LocationItemPageData["latitude"] { return this.getProperty("latitude"); }

    /**
     * Longitude
     *
     * No description available
     */
    public get longitude() : LocationItemPageData["longitude"] { return this.getProperty("longitude"); }

    /**
     * Average temperature
     *
     * No description available
     */
    public get avgTemp() : LocationItemPageData["avgTemp"] { return this.getProperty("avgTemp"); }

    /**
     * Teaser ratio (width-height)
     *
     * No description available
     */
    public get teaserRatio() : LocationItemPageData["teaserRatio"] { return this.getProperty("teaserRatio"); }

    /**
     * Airport initials
     *
     * No description available
     */
    public get airportInitials() : LocationItemPageData["airportInitials"] { return this.getProperty("airportInitials"); }

    /**
     * Yearly passengers
     *
     * No description available
     */
    public get yearlyPassengers() : LocationItemPageData["yearlyPassengers"] { return this.getProperty("yearlyPassengers"); }

    /**
     * Main body
     *
     * No description available
     */
    public get mainBody() : LocationItemPageData["mainBody"] { return this.getProperty("mainBody"); }

    /**
     * Title
     *
     * No description available
     */
    public get metaTitle() : LocationItemPageData["metaTitle"] { return this.getProperty("metaTitle"); }

    /**
     * Exclude from results
     *
     * This will determine whether or not to show on search
     */
    public get excludeFromSearch() : LocationItemPageData["excludeFromSearch"] { return this.getProperty("excludeFromSearch"); }

    /**
     * Image
     *
     * No description available
     */
    public get pageImage() : LocationItemPageData["pageImage"] { return this.getProperty("pageImage"); }

    /**
     * CSS files
     *
     * No description available
     */
    public get cssFiles() : LocationItemPageData["cssFiles"] { return this.getProperty("cssFiles"); }

    /**
     * Script files
     *
     * No description available
     */
    public get scriptFiles() : LocationItemPageData["scriptFiles"] { return this.getProperty("scriptFiles"); }

    /**
     * Image
     *
     * No description available
     */
    public get image() : LocationItemPageData["image"] { return this.getProperty("image"); }

    /**
     * Main content area
     *
     * No description available
     */
    public get mainContentArea() : LocationItemPageData["mainContentArea"] { return this.getProperty("mainContentArea"); }

    /**
     * Keywords
     *
     * No description available
     */
    public get keywords() : LocationItemPageData["keywords"] { return this.getProperty("keywords"); }

    /**
     * Hide site header
     *
     * No description available
     */
    public get hideSiteHeader() : LocationItemPageData["hideSiteHeader"] { return this.getProperty("hideSiteHeader"); }

    /**
     * Video
     *
     * No description available
     */
    public get teaserVideo() : LocationItemPageData["teaserVideo"] { return this.getProperty("teaserVideo"); }

    /**
     * CSS
     *
     * No description available
     */
    public get css() : LocationItemPageData["css"] { return this.getProperty("css"); }

    /**
     * Scripts
     *
     * No description available
     */
    public get scripts() : LocationItemPageData["scripts"] { return this.getProperty("scripts"); }

    /**
     * Left content area
     *
     * No description available
     */
    public get leftContentArea() : LocationItemPageData["leftContentArea"] { return this.getProperty("leftContentArea"); }

    /**
     * New location
     *
     * No description available
     */
    public get new() : LocationItemPageData["new"] { return this.getProperty("new"); }

    /**
     * Promoted location
     *
     * Check this, in order to boost this destination and promote it in suggestions
     */
    public get promoted() : LocationItemPageData["promoted"] { return this.getProperty("promoted"); }

    /**
     * Page description
     *
     * No description available
     */
    public get pageDescription() : LocationItemPageData["pageDescription"] { return this.getProperty("pageDescription"); }

    /**
     * Hide site footer
     *
     * No description available
     */
    public get hideSiteFooter() : LocationItemPageData["hideSiteFooter"] { return this.getProperty("hideSiteFooter"); }

    /**
     * Text
     *
     * No description available
     */
    public get teaserText() : LocationItemPageData["teaserText"] { return this.getProperty("teaserText"); }

    /**
     * Content type
     *
     * No description available
     */
    public get metaContentType() : LocationItemPageData["metaContentType"] { return this.getProperty("metaContentType"); }

    /**
     * Industry
     *
     * No description available
     */
    public get industry() : LocationItemPageData["industry"] { return this.getProperty("industry"); }

    /**
     * Author
     *
     * No description available
     */
    public get authorMetaData() : LocationItemPageData["authorMetaData"] { return this.getProperty("authorMetaData"); }

    /**
     * Disable indexing
     *
     * No description available
     */
    public get disableIndexing() : LocationItemPageData["disableIndexing"] { return this.getProperty("disableIndexing"); }

    /**
     * Highlight in page list
     *
     * No description available
     */
    public get highlight() : LocationItemPageData["highlight"] { return this.getProperty("highlight"); }

    /**
     * Text alignment
     *
     * No description available
     */
    public get teaserTextAlignment() : LocationItemPageData["teaserTextAlignment"] { return this.getProperty("teaserTextAlignment"); }

    /**
     * Color theme
     *
     * No description available
     */
    public get teaserColorTheme() : LocationItemPageData["teaserColorTheme"] { return this.getProperty("teaserColorTheme"); }

    /**
     * Button label
     *
     * No description available
     */
    public get teaserButtonText() : LocationItemPageData["teaserButtonText"] { return this.getProperty("teaserButtonText"); }

    /**
     * Button theme
     *
     * No description available
     */
    public get teaserButtonStyle() : LocationItemPageData["teaserButtonStyle"] { return this.getProperty("teaserButtonStyle"); }

    /**
     * Button color
     *
     * No description available
     */
    public get teaserButtonColor() : LocationItemPageData["teaserButtonColor"] { return this.getProperty("teaserButtonColor"); }

    /**
     * Button text color
     *
     * No description available
     */
    public get teaserButtonTextColor() : LocationItemPageData["teaserButtonTextColor"] { return this.getProperty("teaserButtonTextColor"); }

    /**
     * Display hover effect
     *
     * No description available
     */
    public get applyHoverEffect() : LocationItemPageData["applyHoverEffect"] { return this.getProperty("applyHoverEffect"); }

    /**
     * Padding
     *
     * No description available
     */
    public get padding() : LocationItemPageData["padding"] { return this.getProperty("padding"); }

    /**
     * Margin
     *
     * No description available
     */
    public get margin() : LocationItemPageData["margin"] { return this.getProperty("margin"); }

}
