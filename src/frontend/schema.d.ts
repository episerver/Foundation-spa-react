/**
 * This is an automatically generated schema file based upon the Content Types
 * within the referenced Optimizely Content Cloud instance.
 * 
 * DO NOT MODIFY MANUALLY - THE FILE WILL BE OVERWRITTEN
 **/
import type { IContent, PropertyLongString, PropertyBoolean, PropertyContentReferenceList, PropertyXhtmlString, PropertyFloatNumber, PropertyNumber, PropertyInt, PropertyContentReference, PropertyPageReference, PropertyContentArea, PropertyLink, PropertyLinkCollection, PropertyBlock } from '@optimizely/cms/models'


/**
 * Content Manager View
 * Block used to configure Content Manager views
 *
 * @ContentBase Block
 * @ContentGuid 8b6435d9-ea76-483b-9062-5b505adcaa9f
 */
export type CustomViewConfigurationBlock = IContent & {
    /**
     * Content root
     * Root ContentLink for view
     * 
     * @translatable    false
     */
    root: PropertyContentReference

    /**
     * Sort order
     * Sort order in menu
     * 
     * @translatable    false
     */
    sortOrder: PropertyNumber

    /**
     * Enabled
     * When true, then view is used by views provider
     * 
     * @translatable    false
     */
    enabled: PropertyBoolean

    /**
     * Newly created content
     * ContentLink to container where contents should be added. It should be subfolder of the Content Root
     * 
     * @translatable    false
     */
    newContentRoot: PropertyContentReference

    /**
     * Allowed types to add
     * Types that editor can add when using external grid view
     * 
     * @translatable    false
     */
    allowedTypesToAddString: PropertyLongString
}

/**
 * Twitter Feed Block
 * Display content from a Twitter feed
 *
 * @ContentBase Block
 * @ContentGuid 8ed98895-c4a5-4d4d-8abf-43853bd46bc8
 */
export type TwitterBlock = IContent & {
    /**
     * Categories
     * Categories associated with this content
     * 
     * @translatable    false
     */
    categories: PropertyContentReferenceList

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString

    /**
     * Background color
     * 
     * 
     * @translatable    false
     */
    backgroundColor: PropertyLongString

    /**
     * Block opacity (0 to 1)
     * 
     * 
     * @translatable    false
     */
    blockOpacity: PropertyFloatNumber

    /**
     * Account name
     * 
     * 
     * @translatable    false
     */
    accountName: PropertyLongString

    /**
     * Number of items
     * 
     * 
     * @translatable    false
     */
    numberOfItems: PropertyNumber
}

/**
 * Video Block
 * Video Block
 *
 * @ContentBase Block
 * @ContentGuid 03d454f9-3be8-4421-9a5d-cbbe8e38443d
 */
export type VideoBlock = IContent & {
    /**
     * Categories
     * Categories associated with this content
     * 
     * @translatable    false
     */
    categories: PropertyContentReferenceList

    /**
     * Video
     * 
     * 
     * @translatable    true
     */
    video: PropertyContentReference

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString

    /**
     * Background color
     * 
     * 
     * @translatable    false
     */
    backgroundColor: PropertyLongString

    /**
     * Block opacity (0 to 1)
     * 
     * 
     * @translatable    false
     */
    blockOpacity: PropertyFloatNumber
}

/**
 * Vimeo Video
 * Display Vimeo video
 *
 * @ContentBase Block
 * @ContentGuid a8172c33-e087-4e68-980e-a79b0e093675
 */
export type VimeoBlock = IContent & {
    /**
     * Categories
     * Categories associated with this content
     * 
     * @translatable    false
     */
    categories: PropertyContentReferenceList

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString

    /**
     * Background color
     * 
     * 
     * @translatable    false
     */
    backgroundColor: PropertyLongString

    /**
     * Block opacity (0 to 1)
     * 
     * 
     * @translatable    false
     */
    blockOpacity: PropertyFloatNumber

    /**
     * Vimeo link
     * URL link to Vimeo video
     * 
     * @translatable    false
     */
    vimeoVideoLink: PropertyLongString

    /**
     * Cover image
     * 
     * 
     * @translatable    false
     */
    coverImage: PropertyContentReference

    /**
     * Heading
     * 
     * 
     * @translatable    true
     */
    heading: PropertyLongString

    /**
     * MainBody
     * Descriptive text for the video
     * 
     * @translatable    true
     */
    mainBody: PropertyXhtmlString
}

/**
 * YouTube Block
 * Display YouTube video
 *
 * @ContentBase Block
 * @ContentGuid 67429e0d-9365-407c-8a49-69489382bbdc
 */
export type YouTubeBlock = IContent & {
    /**
     * Categories
     * Categories associated with this content
     * 
     * @translatable    false
     */
    categories: PropertyContentReferenceList

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString

    /**
     * Background color
     * 
     * 
     * @translatable    false
     */
    backgroundColor: PropertyLongString

    /**
     * Block opacity (0 to 1)
     * 
     * 
     * @translatable    false
     */
    blockOpacity: PropertyFloatNumber

    /**
     * YouTube link
     * URL link to YouTube video
     * 
     * @translatable    false
     */
    youTubeLink: PropertyLongString

    /**
     * Heading
     * 
     * 
     * @translatable    true
     */
    heading: PropertyLongString

    /**
     * Main body
     * Descriptive text for the video
     * 
     * @translatable    true
     */
    mainBody: PropertyXhtmlString
}

/**
 * Calendar Block
 * A block that lists a bunch of calendar events
 *
 * @ContentBase Block
 * @ContentGuid d5148c01-dfb0-4e57-8399-6ceebf48f38e
 */
export type CalendarBlock = IContent & {
    /**
     * Categories
     * Categories associated with this content
     * 
     * @translatable    false
     */
    categories: PropertyContentReferenceList

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString

    /**
     * Background color
     * 
     * 
     * @translatable    false
     */
    backgroundColor: PropertyLongString

    /**
     * Block opacity (0 to 1)
     * 
     * 
     * @translatable    false
     */
    blockOpacity: PropertyFloatNumber

    /**
     * View as
     * 
     * 
     * @translatable    true
     */
    viewMode: PropertyLongString

    /**
     * Events root
     * 
     * 
     * @translatable    false
     */
    eventsRoot: PropertyPageReference

    /**
     * Number of events
     * 
     * 
     * @translatable    false
     */
    count: PropertyNumber

    /**
     * Filter by category
     * 
     * 
     * @translatable    false
     */
    categoryFilter: PropertyCategory

    /**
     * Include all levels
     * 
     * 
     * @translatable    false
     */
    recursive: PropertyBoolean
}

/**
 * Filter Temperatures Block
 * Temperature slider for locations
 *
 * @ContentBase Block
 * @ContentGuid 28629b4b-9475-4c44-9c15-31961391f166
 */
export type FilterTemperaturesBlock = IContent & {
    /**
     * Categories
     * Categories associated with this content
     * 
     * @translatable    false
     */
    categories: PropertyContentReferenceList

    /**
     * Filter title
     * 
     * 
     * @translatable    true
     */
    filterTitle: PropertyLongString

    /**
     * All condition text
     * 
     * 
     * @translatable    true
     */
    allConditionText: PropertyLongString

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString

    /**
     * Background color
     * 
     * 
     * @translatable    false
     */
    backgroundColor: PropertyLongString

    /**
     * Block opacity (0 to 1)
     * 
     * 
     * @translatable    false
     */
    blockOpacity: PropertyFloatNumber
}

/**
 * Filter Distances Block
 * Distance facets for locations
 *
 * @ContentBase Block
 * @ContentGuid eab40a8c-9006-4766-a87e-1dec153e735f
 */
export type FilterDistancesBlock = IContent & {
    /**
     * Categories
     * Categories associated with this content
     * 
     * @translatable    false
     */
    categories: PropertyContentReferenceList

    /**
     * Filter title
     * 
     * 
     * @translatable    true
     */
    filterTitle: PropertyLongString

    /**
     * All condition text
     * 
     * 
     * @translatable    true
     */
    allConditionText: PropertyLongString

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString

    /**
     * Background color
     * 
     * 
     * @translatable    false
     */
    backgroundColor: PropertyLongString

    /**
     * Block opacity (0 to 1)
     * 
     * 
     * @translatable    false
     */
    blockOpacity: PropertyFloatNumber
}

/**
 * Text Block
 * Simple Rich Text Block
 *
 * @ContentBase Block
 * @ContentGuid 32782b29-278b-410a-a402-9ff46faf32b9
 */
export type TextBlock = IContent & {
    /**
     * Categories
     * Categories associated with this content
     * 
     * @translatable    false
     */
    categories: PropertyContentReferenceList

    /**
     * Main body
     * 
     * 
     * @translatable    true
     */
    mainBody: PropertyXhtmlString

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString

    /**
     * Background color
     * 
     * 
     * @translatable    false
     */
    backgroundColor: PropertyLongString

    /**
     * Block opacity (0 to 1)
     * 
     * 
     * @translatable    false
     */
    blockOpacity: PropertyFloatNumber
}

/**
 * Filter Continents Block
 * Continent facets for locations
 *
 * @ContentBase Block
 * @ContentGuid 9103a763-4c9c-431e-bc11-f2794c3b4b80
 */
export type FilterContinentsBlock = IContent & {
    /**
     * Categories
     * Categories associated with this content
     * 
     * @translatable    false
     */
    categories: PropertyContentReferenceList

    /**
     * Filter title
     * 
     * 
     * @translatable    true
     */
    filterTitle: PropertyLongString

    /**
     * All condition text
     * 
     * 
     * @translatable    true
     */
    allConditionText: PropertyLongString

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString

    /**
     * Background color
     * 
     * 
     * @translatable    false
     */
    backgroundColor: PropertyLongString

    /**
     * Block opacity (0 to 1)
     * 
     * 
     * @translatable    false
     */
    blockOpacity: PropertyFloatNumber
}

/**
 * Cms Home Page
 * Used for home page of all sites
 *
 * @ContentBase Page
 * @ContentGuid 452d1812-7385-42c3-8073-c1b7481e7b20
 */
export type HomePage = IContent & {
    /**
     * Categories
     * Categories associated with this content.
     * 
     * @translatable    false
     */
    categories: PropertyContentReferenceList

    /**
     * Teaser ratio (width-height)
     * 
     * 
     * @translatable    true
     */
    teaserRatio: PropertyLongString

    /**
     * Main body
     * 
     * 
     * @translatable    true
     */
    mainBody: PropertyXhtmlString

    /**
     * Title
     * 
     * 
     * @translatable    true
     */
    metaTitle: PropertyLongString

    /**
     * Exclude from results
     * This will determine whether or not to show on search
     * 
     * @translatable    true
     */
    excludeFromSearch: PropertyBoolean

    /**
     * Image
     * 
     * 
     * @translatable    false
     */
    pageImage: PropertyContentReference

    /**
     * CSS files
     * 
     * 
     * @translatable    false
     */
    cssFiles: PropertyLinkCollection

    /**
     * Top content area
     * 
     * 
     * @translatable    true
     */
    topContentArea: PropertyContentArea

    /**
     * Main content area
     * 
     * 
     * @translatable    true
     */
    mainContentArea: PropertyContentArea

    /**
     * Keywords
     * 
     * 
     * @translatable    true
     */
    keywords: PropertyLongString

    /**
     * Hide site header
     * 
     * 
     * @translatable    true
     */
    hideSiteHeader: PropertyBoolean

    /**
     * Video
     * 
     * 
     * @translatable    true
     */
    teaserVideo: PropertyContentReference

    /**
     * CSS
     * 
     * 
     * @translatable    false
     */
    css: PropertyLongString

    /**
     * Bottom content area
     * 
     * 
     * @translatable    true
     */
    bottomContentArea: PropertyContentArea

    /**
     * Page description
     * 
     * 
     * @translatable    true
     */
    pageDescription: PropertyLongString

    /**
     * Hide site footer
     * 
     * 
     * @translatable    true
     */
    hideSiteFooter: PropertyBoolean

    /**
     * Text
     * 
     * 
     * @translatable    true
     */
    teaserText: PropertyLongString

    /**
     * Content type
     * 
     * 
     * @translatable    true
     */
    metaContentType: PropertyLongString

    /**
     * Industry
     * 
     * 
     * @translatable    true
     */
    industry: PropertyLongString

    /**
     * Author
     * 
     * 
     * @translatable    true
     */
    authorMetaData: PropertyLongString

    /**
     * Disable indexing
     * 
     * 
     * @translatable    true
     */
    disableIndexing: PropertyBoolean

    /**
     * Highlight in page list
     * 
     * 
     * @translatable    true
     */
    highlight: PropertyBoolean

    /**
     * Text alignment
     * 
     * 
     * @translatable    true
     */
    teaserTextAlignment: PropertyLongString

    /**
     * Color theme
     * 
     * 
     * @translatable    true
     */
    teaserColorTheme: PropertyLongString

    /**
     * Button label
     * 
     * 
     * @translatable    true
     */
    teaserButtonText: PropertyLongString

    /**
     * Button theme
     * 
     * 
     * @translatable    true
     */
    teaserButtonStyle: PropertyLongString

    /**
     * Button color
     * 
     * 
     * @translatable    true
     */
    teaserButtonColor: PropertyLongString

    /**
     * Button text color
     * 
     * 
     * @translatable    true
     */
    teaserButtonTextColor: PropertyLongString

    /**
     * Display hover effect
     * 
     * 
     * @translatable    true
     */
    applyHoverEffect: PropertyBoolean

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString
}

/**
 * Vector Image File
 * Used for svg image file type
 *
 * @ContentBase Image
 * @ContentGuid 3bedeaa0-67ba-4f6a-a420-dabf6ad6890b
 */
export type VectorImageMediaData = IContent & {
    /**
     * Large thumbnail
     * 
     * 
     * @translatable    false
     */
    largeThumbnail: PropertyBlob

    /**
     * Image alignment
     * 
     * 
     * @translatable    false
     */
    imageAlignment: PropertyLongString

    /**
     * File size
     * 
     * 
     * @translatable    false
     */
    fileSize: PropertyLongString

    /**
     * Padding top
     * 
     * 
     * @translatable    false
     */
    paddingTop: PropertyNumber

    /**
     * Padding right
     * 
     * 
     * @translatable    false
     */
    paddingRight: PropertyNumber

    /**
     * Padding bottom
     * 
     * 
     * @translatable    false
     */
    paddingBottom: PropertyNumber

    /**
     * Padding left
     * 
     * 
     * @translatable    false
     */
    paddingLeft: PropertyNumber

    /**
     * Accent color
     * 
     * 
     * @translatable    false
     */
    accentColor: PropertyLongString

    /**
     * Caption
     * 
     * 
     * @translatable    false
     */
    caption: PropertyLongString

    /**
     * Clip art type
     * 
     * 
     * @translatable    false
     */
    clipArtType: PropertyLongString

    /**
     * Dominant color background
     * 
     * 
     * @translatable    false
     */
    dominantColorBackground: PropertyLongString

    /**
     * Dominant color foreground
     * 
     * 
     * @translatable    false
     */
    dominantColorForeground: PropertyLongString

    /**
     * Dominant colors
     * 
     * 
     * @translatable    false
     */
    dominantColors: PropertyStringList

    /**
     * Image categories
     * 
     * 
     * @translatable    false
     */
    imageCategories: PropertyStringList

    /**
     * Is adult content
     * 
     * 
     * @translatable    false
     */
    isAdultContent: PropertyBoolean

    /**
     * Is black & white image
     * 
     * 
     * @translatable    false
     */
    isBwImg: PropertyBoolean

    /**
     * Is racy content
     * 
     * 
     * @translatable    false
     */
    isRacyContent: PropertyBoolean

    /**
     * Line drawing type
     * 
     * 
     * @translatable    false
     */
    lineDrawingType: PropertyLongString

    /**
     * Tags
     * 
     * 
     * @translatable    false
     */
    tags: PropertyStringList

    /**
     * Title
     * 
     * 
     * @translatable    true
     */
    title: PropertyLongString

    /**
     * Description
     * Description of the image
     * 
     * @translatable    true
     */
    description: PropertyLongString

    /**
     * Alternate text
     * 
     * 
     * @translatable    true
     */
    altText: PropertyLongString

    /**
     * Credits text
     * 
     * 
     * @translatable    true
     */
    creditsText: PropertyLongString

    /**
     * Credits link
     * 
     * 
     * @translatable    true
     */
    creditsLink: PropertyUrl

    /**
     * Link
     * Link to content
     * 
     * @translatable    true
     */
    link: PropertyContentReference

    /**
     * Copyright
     * 
     * 
     * @translatable    true
     */
    copyright: PropertyLongString
}

/**
 * Standard File
 * Used for standard file types such as Word, Excel, PowerPoint or text documents.
 *
 * @ContentBase Media
 * @ContentGuid 646ece50-3ce7-4f8b-ba33-9924c9adc9c6
 */
export type StandardFile = IContent & {
    /**
     * FileSize
     * 
     * 
     * @translatable    false
     */
    fileSize: PropertyLongString
}

/**
 * Image File
 * Used for image file types such as jpg, jpeg, jpe, ico, gif, bmp, png
 *
 * @ContentBase Image
 * @ContentGuid 20644be7-3ca1-4f84-b893-ee021b73ce6c
 */
export type ImageMediaData = IContent & {
    /**
     * Large thumbnail
     * 
     * 
     * @translatable    false
     */
    largeThumbnail: PropertyBlob

    /**
     * Image alignment
     * 
     * 
     * @translatable    false
     */
    imageAlignment: PropertyLongString

    /**
     * File size
     * 
     * 
     * @translatable    false
     */
    fileSize: PropertyLongString

    /**
     * Padding top
     * 
     * 
     * @translatable    false
     */
    paddingTop: PropertyNumber

    /**
     * Padding right
     * 
     * 
     * @translatable    false
     */
    paddingRight: PropertyNumber

    /**
     * Padding bottom
     * 
     * 
     * @translatable    false
     */
    paddingBottom: PropertyNumber

    /**
     * Padding left
     * 
     * 
     * @translatable    false
     */
    paddingLeft: PropertyNumber

    /**
     * Accent color
     * 
     * 
     * @translatable    false
     */
    accentColor: PropertyLongString

    /**
     * Caption
     * 
     * 
     * @translatable    false
     */
    caption: PropertyLongString

    /**
     * Clip art type
     * 
     * 
     * @translatable    false
     */
    clipArtType: PropertyLongString

    /**
     * Dominant color background
     * 
     * 
     * @translatable    false
     */
    dominantColorBackground: PropertyLongString

    /**
     * Dominant color foreground
     * 
     * 
     * @translatable    false
     */
    dominantColorForeground: PropertyLongString

    /**
     * Dominant colors
     * 
     * 
     * @translatable    false
     */
    dominantColors: PropertyStringList

    /**
     * Image categories
     * 
     * 
     * @translatable    false
     */
    imageCategories: PropertyStringList

    /**
     * Is adult content
     * 
     * 
     * @translatable    false
     */
    isAdultContent: PropertyBoolean

    /**
     * Is black & white image
     * 
     * 
     * @translatable    false
     */
    isBwImg: PropertyBoolean

    /**
     * Is racy content
     * 
     * 
     * @translatable    false
     */
    isRacyContent: PropertyBoolean

    /**
     * Line drawing type
     * 
     * 
     * @translatable    false
     */
    lineDrawingType: PropertyLongString

    /**
     * Tags
     * 
     * 
     * @translatable    false
     */
    tags: PropertyStringList

    /**
     * Title
     * 
     * 
     * @translatable    true
     */
    title: PropertyLongString

    /**
     * Description
     * Description of the image
     * 
     * @translatable    true
     */
    description: PropertyLongString

    /**
     * Alternate text
     * 
     * 
     * @translatable    true
     */
    altText: PropertyLongString

    /**
     * Credits text
     * 
     * 
     * @translatable    true
     */
    creditsText: PropertyLongString

    /**
     * Credits link
     * 
     * 
     * @translatable    true
     */
    creditsLink: PropertyUrl

    /**
     * Link
     * Link to content
     * 
     * @translatable    true
     */
    link: PropertyContentReference

    /**
     * Copyright
     * 
     * 
     * @translatable    true
     */
    copyright: PropertyLongString
}

/**
 * Coding File
 * Used for coding file types such as Css, Javascript.
 *
 * @ContentBase Media
 * @ContentGuid cbbfab00-eac0-40ab-b9bf-2966b901841e
 */
export type CodingFile = IContent & {
    /**
     * Description
     * 
     * 
     * @translatable    true
     */
    description: PropertyLongString
}

/**
 * Bookmarks Page
 * This page displays list the different content that has been bookmarked belonging to an user
 *
 * @ContentBase Page
 * @ContentGuid 40e76908-6aa2-4cb7-8239-607d941df3a6
 */
export type BookmarksPage = IContent & {
    /**
     * Categories
     * Categories associated with this content.
     * 
     * @translatable    false
     */
    categories: PropertyContentReferenceList

    /**
     * Teaser ratio (width-height)
     * 
     * 
     * @translatable    true
     */
    teaserRatio: PropertyLongString

    /**
     * Main body
     * 
     * 
     * @translatable    true
     */
    mainBody: PropertyXhtmlString

    /**
     * Title
     * 
     * 
     * @translatable    true
     */
    metaTitle: PropertyLongString

    /**
     * Exclude from results
     * This will determine whether or not to show on search
     * 
     * @translatable    true
     */
    excludeFromSearch: PropertyBoolean

    /**
     * Image
     * 
     * 
     * @translatable    false
     */
    pageImage: PropertyContentReference

    /**
     * CSS files
     * 
     * 
     * @translatable    false
     */
    cssFiles: PropertyLinkCollection

    /**
     * Main content area
     * 
     * 
     * @translatable    true
     */
    mainContentArea: PropertyContentArea

    /**
     * Keywords
     * 
     * 
     * @translatable    true
     */
    keywords: PropertyLongString

    /**
     * Hide site header
     * 
     * 
     * @translatable    true
     */
    hideSiteHeader: PropertyBoolean

    /**
     * Video
     * 
     * 
     * @translatable    true
     */
    teaserVideo: PropertyContentReference

    /**
     * CSS
     * 
     * 
     * @translatable    false
     */
    css: PropertyLongString

    /**
     * Page description
     * 
     * 
     * @translatable    true
     */
    pageDescription: PropertyLongString

    /**
     * Hide site footer
     * 
     * 
     * @translatable    true
     */
    hideSiteFooter: PropertyBoolean

    /**
     * Text
     * 
     * 
     * @translatable    true
     */
    teaserText: PropertyLongString

    /**
     * Content type
     * 
     * 
     * @translatable    true
     */
    metaContentType: PropertyLongString

    /**
     * Industry
     * 
     * 
     * @translatable    true
     */
    industry: PropertyLongString

    /**
     * Author
     * 
     * 
     * @translatable    true
     */
    authorMetaData: PropertyLongString

    /**
     * Disable indexing
     * 
     * 
     * @translatable    true
     */
    disableIndexing: PropertyBoolean

    /**
     * Highlight in page list
     * 
     * 
     * @translatable    true
     */
    highlight: PropertyBoolean

    /**
     * Text alignment
     * 
     * 
     * @translatable    true
     */
    teaserTextAlignment: PropertyLongString

    /**
     * Color theme
     * 
     * 
     * @translatable    true
     */
    teaserColorTheme: PropertyLongString

    /**
     * Button label
     * 
     * 
     * @translatable    true
     */
    teaserButtonText: PropertyLongString

    /**
     * Button theme
     * 
     * 
     * @translatable    true
     */
    teaserButtonStyle: PropertyLongString

    /**
     * Button color
     * 
     * 
     * @translatable    true
     */
    teaserButtonColor: PropertyLongString

    /**
     * Button text color
     * 
     * 
     * @translatable    true
     */
    teaserButtonTextColor: PropertyLongString

    /**
     * Display hover effect
     * 
     * 
     * @translatable    true
     */
    applyHoverEffect: PropertyBoolean

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString
}

/**
 * Profile Page
 * Page to show and manage profile information
 *
 * @ContentBase Page
 * @ContentGuid c03371fb-fc21-4a6e-8f79-68c400519145
 */
export type ProfilePage = IContent & {
    /**
     * Categories
     * Categories associated with this content.
     * 
     * @translatable    false
     */
    categories: PropertyContentReferenceList

    /**
     * Teaser ratio (width-height)
     * 
     * 
     * @translatable    true
     */
    teaserRatio: PropertyLongString

    /**
     * Main body
     * 
     * 
     * @translatable    true
     */
    mainBody: PropertyXhtmlString

    /**
     * Title
     * 
     * 
     * @translatable    true
     */
    metaTitle: PropertyLongString

    /**
     * Exclude from results
     * This will determine whether or not to show on search
     * 
     * @translatable    true
     */
    excludeFromSearch: PropertyBoolean

    /**
     * Image
     * 
     * 
     * @translatable    false
     */
    pageImage: PropertyContentReference

    /**
     * CSS files
     * 
     * 
     * @translatable    false
     */
    cssFiles: PropertyLinkCollection

    /**
     * Main content area
     * 
     * 
     * @translatable    true
     */
    mainContentArea: PropertyContentArea

    /**
     * Keywords
     * 
     * 
     * @translatable    true
     */
    keywords: PropertyLongString

    /**
     * Hide site header
     * 
     * 
     * @translatable    true
     */
    hideSiteHeader: PropertyBoolean

    /**
     * Video
     * 
     * 
     * @translatable    true
     */
    teaserVideo: PropertyContentReference

    /**
     * CSS
     * 
     * 
     * @translatable    false
     */
    css: PropertyLongString

    /**
     * Page description
     * 
     * 
     * @translatable    true
     */
    pageDescription: PropertyLongString

    /**
     * Hide site footer
     * 
     * 
     * @translatable    true
     */
    hideSiteFooter: PropertyBoolean

    /**
     * Text
     * 
     * 
     * @translatable    true
     */
    teaserText: PropertyLongString

    /**
     * Content type
     * 
     * 
     * @translatable    true
     */
    metaContentType: PropertyLongString

    /**
     * Industry
     * 
     * 
     * @translatable    true
     */
    industry: PropertyLongString

    /**
     * Author
     * 
     * 
     * @translatable    true
     */
    authorMetaData: PropertyLongString

    /**
     * Disable indexing
     * 
     * 
     * @translatable    true
     */
    disableIndexing: PropertyBoolean

    /**
     * Highlight in page list
     * 
     * 
     * @translatable    true
     */
    highlight: PropertyBoolean

    /**
     * Text alignment
     * 
     * 
     * @translatable    true
     */
    teaserTextAlignment: PropertyLongString

    /**
     * Color theme
     * 
     * 
     * @translatable    true
     */
    teaserColorTheme: PropertyLongString

    /**
     * Button label
     * 
     * 
     * @translatable    true
     */
    teaserButtonText: PropertyLongString

    /**
     * Button theme
     * 
     * 
     * @translatable    true
     */
    teaserButtonStyle: PropertyLongString

    /**
     * Button color
     * 
     * 
     * @translatable    true
     */
    teaserButtonColor: PropertyLongString

    /**
     * Button text color
     * 
     * 
     * @translatable    true
     */
    teaserButtonTextColor: PropertyLongString

    /**
     * Display hover effect
     * 
     * 
     * @translatable    true
     */
    applyHoverEffect: PropertyBoolean

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString
}

/**
 * Single Column Landing Page
 * Default standard page that has top content area, main body, and main content area
 *
 * @ContentBase Page
 * @ContentGuid dbed4258-8213-48db-a11f-99c034172a54
 */
export type LandingPage = IContent & {
    /**
     * Categories
     * Categories associated with this content.
     * 
     * @translatable    false
     */
    categories: PropertyContentReferenceList

    /**
     * Teaser ratio (width-height)
     * 
     * 
     * @translatable    true
     */
    teaserRatio: PropertyLongString

    /**
     * Top content area
     * 
     * 
     * @translatable    false
     */
    topContentArea: PropertyContentArea

    /**
     * Main body
     * 
     * 
     * @translatable    true
     */
    mainBody: PropertyXhtmlString

    /**
     * Title
     * 
     * 
     * @translatable    true
     */
    metaTitle: PropertyLongString

    /**
     * Exclude from results
     * This will determine whether or not to show on search
     * 
     * @translatable    true
     */
    excludeFromSearch: PropertyBoolean

    /**
     * Image
     * 
     * 
     * @translatable    false
     */
    pageImage: PropertyContentReference

    /**
     * CSS files
     * 
     * 
     * @translatable    false
     */
    cssFiles: PropertyLinkCollection

    /**
     * Script Files
     * 
     * 
     * @translatable    false
     */
    scriptFiles: PropertyLinkCollection

    /**
     * Main content area
     * 
     * 
     * @translatable    true
     */
    mainContentArea: PropertyContentArea

    /**
     * Keywords
     * 
     * 
     * @translatable    true
     */
    keywords: PropertyLongString

    /**
     * Hide site header
     * 
     * 
     * @translatable    true
     */
    hideSiteHeader: PropertyBoolean

    /**
     * Video
     * 
     * 
     * @translatable    true
     */
    teaserVideo: PropertyContentReference

    /**
     * CSS
     * 
     * 
     * @translatable    false
     */
    css: PropertyLongString

    /**
     * Scripts
     * 
     * 
     * @translatable    false
     */
    scripts: PropertyLongString

    /**
     * Page description
     * 
     * 
     * @translatable    true
     */
    pageDescription: PropertyLongString

    /**
     * Hide site footer
     * 
     * 
     * @translatable    true
     */
    hideSiteFooter: PropertyBoolean

    /**
     * Text
     * 
     * 
     * @translatable    true
     */
    teaserText: PropertyLongString

    /**
     * Content type
     * 
     * 
     * @translatable    true
     */
    metaContentType: PropertyLongString

    /**
     * Industry
     * 
     * 
     * @translatable    true
     */
    industry: PropertyLongString

    /**
     * Author
     * 
     * 
     * @translatable    true
     */
    authorMetaData: PropertyLongString

    /**
     * Disable indexing
     * 
     * 
     * @translatable    true
     */
    disableIndexing: PropertyBoolean

    /**
     * Highlight in page list
     * 
     * 
     * @translatable    true
     */
    highlight: PropertyBoolean

    /**
     * Text alignment
     * 
     * 
     * @translatable    true
     */
    teaserTextAlignment: PropertyLongString

    /**
     * Color theme
     * 
     * 
     * @translatable    true
     */
    teaserColorTheme: PropertyLongString

    /**
     * Button label
     * 
     * 
     * @translatable    true
     */
    teaserButtonText: PropertyLongString

    /**
     * Button theme
     * 
     * 
     * @translatable    true
     */
    teaserButtonStyle: PropertyLongString

    /**
     * Button color
     * 
     * 
     * @translatable    true
     */
    teaserButtonColor: PropertyLongString

    /**
     * Button text color
     * 
     * 
     * @translatable    true
     */
    teaserButtonTextColor: PropertyLongString

    /**
     * Display hover effect
     * 
     * 
     * @translatable    true
     */
    applyHoverEffect: PropertyBoolean

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString
}

/**
 * Reset Password Page
 * Page for allowing users to reset their passwords. The page must also be set in the StartPage's ResetPasswordPage property.
 *
 * @ContentBase Page
 * @ContentGuid 05834347-8f4f-48ec-a74c-c46278654a92
 */
export type ResetPasswordPage = IContent & {
    /**
     * Categories
     * Categories associated with this content.
     * 
     * @translatable    false
     */
    categories: PropertyContentReferenceList

    /**
     * Teaser ratio (width-height)
     * 
     * 
     * @translatable    true
     */
    teaserRatio: PropertyLongString

    /**
     * Main body
     * 
     * 
     * @translatable    true
     */
    mainBody: PropertyXhtmlString

    /**
     * Title
     * 
     * 
     * @translatable    true
     */
    metaTitle: PropertyLongString

    /**
     * Exclude from results
     * This will determine whether or not to show on search
     * 
     * @translatable    true
     */
    excludeFromSearch: PropertyBoolean

    /**
     * Image
     * 
     * 
     * @translatable    false
     */
    pageImage: PropertyContentReference

    /**
     * CSS files
     * 
     * 
     * @translatable    false
     */
    cssFiles: PropertyLinkCollection

    /**
     * Main content area
     * 
     * 
     * @translatable    true
     */
    mainContentArea: PropertyContentArea

    /**
     * Keywords
     * 
     * 
     * @translatable    true
     */
    keywords: PropertyLongString

    /**
     * Hide site header
     * 
     * 
     * @translatable    true
     */
    hideSiteHeader: PropertyBoolean

    /**
     * Video
     * 
     * 
     * @translatable    true
     */
    teaserVideo: PropertyContentReference

    /**
     * CSS
     * 
     * 
     * @translatable    false
     */
    css: PropertyLongString

    /**
     * Page description
     * 
     * 
     * @translatable    true
     */
    pageDescription: PropertyLongString

    /**
     * Hide site footer
     * 
     * 
     * @translatable    true
     */
    hideSiteFooter: PropertyBoolean

    /**
     * Text
     * 
     * 
     * @translatable    true
     */
    teaserText: PropertyLongString

    /**
     * Content type
     * 
     * 
     * @translatable    true
     */
    metaContentType: PropertyLongString

    /**
     * Industry
     * 
     * 
     * @translatable    true
     */
    industry: PropertyLongString

    /**
     * Author
     * 
     * 
     * @translatable    true
     */
    authorMetaData: PropertyLongString

    /**
     * Disable indexing
     * 
     * 
     * @translatable    true
     */
    disableIndexing: PropertyBoolean

    /**
     * Highlight in page list
     * 
     * 
     * @translatable    true
     */
    highlight: PropertyBoolean

    /**
     * Text alignment
     * 
     * 
     * @translatable    true
     */
    teaserTextAlignment: PropertyLongString

    /**
     * Color theme
     * 
     * 
     * @translatable    true
     */
    teaserColorTheme: PropertyLongString

    /**
     * Button label
     * 
     * 
     * @translatable    true
     */
    teaserButtonText: PropertyLongString

    /**
     * Button theme
     * 
     * 
     * @translatable    true
     */
    teaserButtonStyle: PropertyLongString

    /**
     * Button color
     * 
     * 
     * @translatable    true
     */
    teaserButtonColor: PropertyLongString

    /**
     * Button text color
     * 
     * 
     * @translatable    true
     */
    teaserButtonTextColor: PropertyLongString

    /**
     * Display hover effect
     * 
     * 
     * @translatable    true
     */
    applyHoverEffect: PropertyBoolean

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString
}

/**
 * Teaser Block
 * Image block with overlay for text
 *
 * @ContentBase Block
 * @ContentGuid eb67a99a-e239-41b8-9c59-20eaa5936047
 */
export type TeaserBlock = IContent & {
    /**
     * Categories
     * Categories associated with this content
     * 
     * @translatable    false
     */
    categories: PropertyContentReferenceList

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString

    /**
     * Background color
     * 
     * 
     * @translatable    false
     */
    backgroundColor: PropertyLongString

    /**
     * Block opacity (0 to 1)
     * 
     * 
     * @translatable    false
     */
    blockOpacity: PropertyFloatNumber

    /**
     * Heading text
     * 
     * 
     * @translatable    true
     */
    heading: PropertyLongString

    /**
     * Heading size
     * 
     * 
     * @translatable    false
     */
    headingSize: PropertyNumber

    /**
     * Heading style
     * 
     * 
     * @translatable    false
     */
    headingStyle: PropertyLongString

    /**
     * Heading color
     * 
     * 
     * @translatable    false
     */
    headingColor: PropertyLongString

    /**
     * Description
     * 
     * 
     * @translatable    true
     */
    description: PropertyLongString

    /**
     * Link
     * 
     * 
     * @translatable    false
     */
    link: PropertyPageReference

    /**
     * Text
     * 
     * 
     * @translatable    true
     */
    text: PropertyXhtmlString

    /**
     * Image
     * 
     * 
     * @translatable    true
     */
    image: PropertyContentReference

    /**
     * Image size (%)
     * 
     * 
     * @translatable    false
     */
    imageSize: PropertyNumber

    /**
     * Second Image
     * 
     * 
     * @translatable    true
     */
    secondImage: PropertyContentReference

    /**
     * Image size (%)
     * 
     * 
     * @translatable    false
     */
    secondImageSize: PropertyNumber

    /**
     * Text color
     * 
     * 
     * @translatable    false
     */
    textColor: PropertyLongString

    /**
     * Height
     * 
     * 
     * @translatable    false
     */
    height: PropertyLongString
}

/**
 * Navigation Block
 * Render normal left/right navigation structures
 *
 * @ContentBase Block
 * @ContentGuid 7c53f707-c932-4fdd-a654-37ff2a1258eb
 */
export type NavigationBlock = IContent & {
    /**
     * Categories
     * Categories associated with this content
     * 
     * @translatable    false
     */
    categories: PropertyContentReferenceList

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString

    /**
     * Background color
     * 
     * 
     * @translatable    false
     */
    backgroundColor: PropertyLongString

    /**
     * Block opacity (0 to 1)
     * 
     * 
     * @translatable    false
     */
    blockOpacity: PropertyFloatNumber

    /**
     * Heading
     * 
     * 
     * @translatable    false
     */
    heading: PropertyLongString

    /**
     * Root page
     * 
     * 
     * @translatable    false
     */
    rootPage: PropertyPageReference
}

/**
 * Hero Block
 * Image block with overlay for text
 *
 * @ContentBase Block
 * @ContentGuid 8bdfac81-3dbd-43b9-a092-522bd67ee8b3
 */
export type HeroBlock = IContent & {
    /**
     * Categories
     * Categories associated with this content
     * 
     * @translatable    false
     */
    categories: PropertyContentReferenceList

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString

    /**
     * Background color
     * 
     * 
     * @translatable    false
     */
    backgroundColor: PropertyLongString

    /**
     * Block opacity (0 to 1)
     * 
     * 
     * @translatable    false
     */
    blockOpacity: PropertyFloatNumber

    /**
     * Block ratio (width:height)
     * 
     * 
     * @translatable    false
     */
    blockRatio: PropertyLongString

    /**
     * Image
     * 
     * 
     * @translatable    true
     */
    backgroundImage: PropertyContentReference

    /**
     * Video
     * 
     * 
     * @translatable    true
     */
    mainBackgroundVideo: PropertyContentReference

    /**
     * Link
     * 
     * 
     * @translatable    false
     */
    link: PropertyUrl

    /**
     * Callout
     * 
     * 
     * @translatable    false
     */
    callout: PropertyBlock<HeroBlockCallout>
}

/**
 * Calendar Event Page
 * Used to define an Event
 *
 * @ContentBase Page
 * @ContentGuid f086fd08-4e54-4eb9-8367-c45630415226
 */
export type CalendarEventPage = IContent & {
    /**
     * Start date
     * 
     * 
     * @translatable    true
     */
    eventStartDate: PropertyDate

    /**
     * Categories
     * Categories associated with this content.
     * 
     * @translatable    false
     */
    categories: PropertyContentReferenceList

    /**
     * End date
     * 
     * 
     * @translatable    true
     */
    eventEndDate: PropertyDate

    /**
     * Location
     * 
     * 
     * @translatable    true
     */
    location: PropertyLongString

    /**
     * Teaser ratio (width-height)
     * 
     * 
     * @translatable    true
     */
    teaserRatio: PropertyLongString

    /**
     * Main body
     * 
     * 
     * @translatable    true
     */
    mainBody: PropertyXhtmlString

    /**
     * Title
     * 
     * 
     * @translatable    true
     */
    metaTitle: PropertyLongString

    /**
     * Exclude from results
     * This will determine whether or not to show on search
     * 
     * @translatable    true
     */
    excludeFromSearch: PropertyBoolean

    /**
     * Image
     * 
     * 
     * @translatable    false
     */
    pageImage: PropertyContentReference

    /**
     * CSS files
     * 
     * 
     * @translatable    false
     */
    cssFiles: PropertyLinkCollection

    /**
     * Main content area
     * 
     * 
     * @translatable    true
     */
    mainContentArea: PropertyContentArea

    /**
     * Keywords
     * 
     * 
     * @translatable    true
     */
    keywords: PropertyLongString

    /**
     * Hide site header
     * 
     * 
     * @translatable    true
     */
    hideSiteHeader: PropertyBoolean

    /**
     * Video
     * 
     * 
     * @translatable    true
     */
    teaserVideo: PropertyContentReference

    /**
     * CSS
     * 
     * 
     * @translatable    false
     */
    css: PropertyLongString

    /**
     * Page description
     * 
     * 
     * @translatable    true
     */
    pageDescription: PropertyLongString

    /**
     * Hide site footer
     * 
     * 
     * @translatable    true
     */
    hideSiteFooter: PropertyBoolean

    /**
     * Text
     * 
     * 
     * @translatable    true
     */
    teaserText: PropertyLongString

    /**
     * Content type
     * 
     * 
     * @translatable    true
     */
    metaContentType: PropertyLongString

    /**
     * Industry
     * 
     * 
     * @translatable    true
     */
    industry: PropertyLongString

    /**
     * Author
     * 
     * 
     * @translatable    true
     */
    authorMetaData: PropertyLongString

    /**
     * Disable indexing
     * 
     * 
     * @translatable    true
     */
    disableIndexing: PropertyBoolean

    /**
     * Highlight in page list
     * 
     * 
     * @translatable    true
     */
    highlight: PropertyBoolean

    /**
     * Text alignment
     * 
     * 
     * @translatable    true
     */
    teaserTextAlignment: PropertyLongString

    /**
     * Color theme
     * 
     * 
     * @translatable    true
     */
    teaserColorTheme: PropertyLongString

    /**
     * Button label
     * 
     * 
     * @translatable    true
     */
    teaserButtonText: PropertyLongString

    /**
     * Button theme
     * 
     * 
     * @translatable    true
     */
    teaserButtonStyle: PropertyLongString

    /**
     * Button color
     * 
     * 
     * @translatable    true
     */
    teaserButtonColor: PropertyLongString

    /**
     * Button text color
     * 
     * 
     * @translatable    true
     */
    teaserButtonTextColor: PropertyLongString

    /**
     * Display hover effect
     * 
     * 
     * @translatable    true
     */
    applyHoverEffect: PropertyBoolean

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString
}

/**
 * Blog List Page
 * Blog List Page for dates such as year and month
 *
 * @ContentBase Page
 * @ContentGuid eaadaff2-3e89-4117-adeb-f8d43565d2f4
 */
export type BlogListPage = IContent & {
    /**
     * Heading
     * 
     * 
     * @translatable    false
     */
    heading: PropertyLongString

    /**
     * Root
     * 
     * 
     * @translatable    false
     */
    root: PropertyPageReference

    /**
     * Categories
     * Categories associated with this content.
     * 
     * @translatable    false
     */
    categories: PropertyContentReferenceList

    /**
     * Include all levels
     * 
     * 
     * @translatable    false
     */
    includeAllLevels: PropertyBoolean

    /**
     * Sort order
     * 
     * 
     * @translatable    false
     */
    sortOrder: PropertyNumber

    /**
     * Include publish date
     * 
     * 
     * @translatable    false
     */
    includePublishDate: PropertyBoolean

    /**
     * Include teaser text
     * 
     * 
     * @translatable    false
     */
    includeTeaserText: PropertyBoolean

    /**
     * Teaser ratio (width-height)
     * 
     * 
     * @translatable    true
     */
    teaserRatio: PropertyLongString

    /**
     * Category filter (match all selected)
     * Categories to filter the list on
     * 
     * @translatable    false
     */
    categoryListFilter: PropertyContentReferenceList

    /**
     * Template of blogs listing
     * 
     * 
     * @translatable    false
     */
    template: PropertyLongString

    /**
     * Preview option (not available in the Grid template)
     * 
     * 
     * @translatable    false
     */
    previewOption: PropertyLongString

    /**
     * Overlay color (hex or rgba)
     * Apply for Card template
     * 
     * @translatable    false
     */
    overlayColor: PropertyLongString

    /**
     * Main body
     * 
     * 
     * @translatable    true
     */
    mainBody: PropertyXhtmlString

    /**
     * Title
     * 
     * 
     * @translatable    true
     */
    metaTitle: PropertyLongString

    /**
     * Exclude from results
     * This will determine whether or not to show on search
     * 
     * @translatable    true
     */
    excludeFromSearch: PropertyBoolean

    /**
     * Image
     * 
     * 
     * @translatable    false
     */
    pageImage: PropertyContentReference

    /**
     * CSS files
     * 
     * 
     * @translatable    false
     */
    cssFiles: PropertyLinkCollection

    /**
     * Overlay text color (hex or rgba)
     * Apply for Card template
     * 
     * @translatable    false
     */
    overlayTextColor: PropertyLongString

    /**
     * Main content area
     * 
     * 
     * @translatable    true
     */
    mainContentArea: PropertyContentArea

    /**
     * Keywords
     * 
     * 
     * @translatable    true
     */
    keywords: PropertyLongString

    /**
     * Hide site header
     * 
     * 
     * @translatable    true
     */
    hideSiteHeader: PropertyBoolean

    /**
     * Video
     * 
     * 
     * @translatable    true
     */
    teaserVideo: PropertyContentReference

    /**
     * CSS
     * 
     * 
     * @translatable    false
     */
    css: PropertyLongString

    /**
     * Page description
     * 
     * 
     * @translatable    true
     */
    pageDescription: PropertyLongString

    /**
     * Hide site footer
     * 
     * 
     * @translatable    true
     */
    hideSiteFooter: PropertyBoolean

    /**
     * Text
     * 
     * 
     * @translatable    true
     */
    teaserText: PropertyLongString

    /**
     * Content type
     * 
     * 
     * @translatable    true
     */
    metaContentType: PropertyLongString

    /**
     * Industry
     * 
     * 
     * @translatable    true
     */
    industry: PropertyLongString

    /**
     * Author
     * 
     * 
     * @translatable    true
     */
    authorMetaData: PropertyLongString

    /**
     * Disable indexing
     * 
     * 
     * @translatable    true
     */
    disableIndexing: PropertyBoolean

    /**
     * Highlight in page list
     * 
     * 
     * @translatable    true
     */
    highlight: PropertyBoolean

    /**
     * Text alignment
     * 
     * 
     * @translatable    true
     */
    teaserTextAlignment: PropertyLongString

    /**
     * Color theme
     * 
     * 
     * @translatable    true
     */
    teaserColorTheme: PropertyLongString

    /**
     * Button label
     * 
     * 
     * @translatable    true
     */
    teaserButtonText: PropertyLongString

    /**
     * Button theme
     * 
     * 
     * @translatable    true
     */
    teaserButtonStyle: PropertyLongString

    /**
     * Button color
     * 
     * 
     * @translatable    true
     */
    teaserButtonColor: PropertyLongString

    /**
     * Button text color
     * 
     * 
     * @translatable    true
     */
    teaserButtonTextColor: PropertyLongString

    /**
     * Display hover effect
     * 
     * 
     * @translatable    true
     */
    applyHoverEffect: PropertyBoolean

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString
}

/**
 * Blog Item Page
 * Blog Item Page created underneath the start page and moved to the right area
 *
 * @ContentBase Page
 * @ContentGuid eaacadf2-3e89-4117-adeb-f8d43565d2f4
 */
export type BlogItemPage = IContent & {
    /**
     * Author
     * 
     * 
     * @translatable    false
     */
    author: PropertyLongString

    /**
     * Categories
     * Categories associated with this content.
     * 
     * @translatable    false
     */
    categories: PropertyContentReferenceList

    /**
     * Teaser ratio (width-height)
     * 
     * 
     * @translatable    true
     */
    teaserRatio: PropertyLongString

    /**
     * Main body
     * 
     * 
     * @translatable    true
     */
    mainBody: PropertyXhtmlString

    /**
     * Title
     * 
     * 
     * @translatable    true
     */
    metaTitle: PropertyLongString

    /**
     * Exclude from results
     * This will determine whether or not to show on search
     * 
     * @translatable    true
     */
    excludeFromSearch: PropertyBoolean

    /**
     * Image
     * 
     * 
     * @translatable    false
     */
    pageImage: PropertyContentReference

    /**
     * CSS files
     * 
     * 
     * @translatable    false
     */
    cssFiles: PropertyLinkCollection

    /**
     * Main content area
     * 
     * 
     * @translatable    true
     */
    mainContentArea: PropertyContentArea

    /**
     * Keywords
     * 
     * 
     * @translatable    true
     */
    keywords: PropertyLongString

    /**
     * Hide site header
     * 
     * 
     * @translatable    true
     */
    hideSiteHeader: PropertyBoolean

    /**
     * Video
     * 
     * 
     * @translatable    true
     */
    teaserVideo: PropertyContentReference

    /**
     * CSS
     * 
     * 
     * @translatable    false
     */
    css: PropertyLongString

    /**
     * Page description
     * 
     * 
     * @translatable    true
     */
    pageDescription: PropertyLongString

    /**
     * Hide site footer
     * 
     * 
     * @translatable    true
     */
    hideSiteFooter: PropertyBoolean

    /**
     * Text
     * 
     * 
     * @translatable    true
     */
    teaserText: PropertyLongString

    /**
     * Content type
     * 
     * 
     * @translatable    true
     */
    metaContentType: PropertyLongString

    /**
     * Industry
     * 
     * 
     * @translatable    true
     */
    industry: PropertyLongString

    /**
     * Author
     * 
     * 
     * @translatable    true
     */
    authorMetaData: PropertyLongString

    /**
     * Disable indexing
     * 
     * 
     * @translatable    true
     */
    disableIndexing: PropertyBoolean

    /**
     * Highlight in page list
     * 
     * 
     * @translatable    true
     */
    highlight: PropertyBoolean

    /**
     * Text alignment
     * 
     * 
     * @translatable    true
     */
    teaserTextAlignment: PropertyLongString

    /**
     * Color theme
     * 
     * 
     * @translatable    true
     */
    teaserColorTheme: PropertyLongString

    /**
     * Button label
     * 
     * 
     * @translatable    true
     */
    teaserButtonText: PropertyLongString

    /**
     * Button theme
     * 
     * 
     * @translatable    true
     */
    teaserButtonStyle: PropertyLongString

    /**
     * Button color
     * 
     * 
     * @translatable    true
     */
    teaserButtonColor: PropertyLongString

    /**
     * Button text color
     * 
     * 
     * @translatable    true
     */
    teaserButtonTextColor: PropertyLongString

    /**
     * Display hover effect
     * 
     * 
     * @translatable    true
     */
    applyHoverEffect: PropertyBoolean

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString
}

/**
 * Breadcrumb Block
 * Render normal navigation structures as a breadcrumb
 *
 * @ContentBase Block
 * @ContentGuid de43eb04-0d26-442a-91fc-e36e14a352b6
 */
export type BreadcrumbBlock = IContent & {
    /**
     * Categories
     * Categories associated with this content
     * 
     * @translatable    false
     */
    categories: PropertyContentReferenceList

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString

    /**
     * Background color
     * 
     * 
     * @translatable    false
     */
    backgroundColor: PropertyLongString

    /**
     * Block opacity (0 to 1)
     * 
     * 
     * @translatable    false
     */
    blockOpacity: PropertyFloatNumber

    /**
     * Destination page
     * 
     * 
     * @translatable    false
     */
    destinationPage: PropertyPageReference

    /**
     * Breadcrumb separator
     * 
     * 
     * @translatable    false
     */
    separator: PropertyLongString

    /**
     * Alignment option
     * 
     * 
     * @translatable    false
     */
    alignment: PropertyLongString
}

/**
 * Folder Page
 * A page which allows you to structure pages.
 *
 * @ContentBase Page
 * @ContentGuid 1bc8e78b-40cc-4efc-a561-a0bba89b51ac
 */
export type FolderPage = IContent & {

}

/**
 * Call To Action Block
 * Provides a CTA anchor or link
 *
 * @ContentBase Block
 * @ContentGuid f82da800-c923-48f6-b701-fd093078c5d9
 */
export type CallToActionBlock = IContent & {
    /**
     * Categories
     * Categories associated with this content
     * 
     * @translatable    false
     */
    categories: PropertyContentReferenceList

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString

    /**
     * Background color
     * 
     * 
     * @translatable    false
     */
    backgroundColor: PropertyLongString

    /**
     * Block opacity (0 to 1)
     * 
     * 
     * @translatable    false
     */
    blockOpacity: PropertyFloatNumber

    /**
     * Title
     * Title displayed
     * 
     * @translatable    true
     */
    title: PropertyLongString

    /**
     * Subtext
     * 
     * 
     * @translatable    true
     */
    subtext: PropertyXhtmlString

    /**
     * Text color
     * 
     * 
     * @translatable    false
     */
    textColor: PropertyLongString

    /**
     * Background image
     * 
     * 
     * @translatable    false
     */
    backgroundImage: PropertyContentReference

    /**
     * Choose image style to fit the block
     * 
     * 
     * @translatable    false
     */
    backgroundImageSetting: PropertyLongString

    /**
     * Button
     * 
     * 
     * @translatable    false
     */
    button: PropertyBlock<ButtonBlock>
}

/**
 * RSS Reader Block
 * Display content from a RSS feed
 *
 * @ContentBase Block
 * @ContentGuid 8fc5a3bb-727c-4871-8b2e-5ff337e30e82
 */
export type RssReaderBlock = IContent & {
    /**
     * Categories
     * Categories associated with this content
     * 
     * @translatable    false
     */
    categories: PropertyContentReferenceList

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString

    /**
     * Background color
     * 
     * 
     * @translatable    false
     */
    backgroundColor: PropertyLongString

    /**
     * Block opacity (0 to 1)
     * 
     * 
     * @translatable    false
     */
    blockOpacity: PropertyFloatNumber

    /**
     * RSS feed URL
     * URL for RSS feed
     * 
     * @translatable    true
     */
    rssUrl: PropertyUrl

    /**
     * Number of results
     * Maximum number of items to display
     * 
     * @translatable    false
     */
    maxCount: PropertyNumber

    /**
     * Include publish date
     * Include publish date for each item in list
     * 
     * @translatable    false
     */
    includePublishDate: PropertyBoolean

    /**
     * Heading
     * 
     * 
     * @translatable    true
     */
    heading: PropertyLongString

    /**
     * Main body
     * Descriptive text for the RSS feed
     * 
     * @translatable    true
     */
    mainBody: PropertyXhtmlString
}

/**
 * Button Block
 * Used to insert a link which is styled as a button
 *
 * @ContentBase Block
 * @ContentGuid 426cf12f-1f01-4ea0-922f-0778314ddaf0
 */
export type ButtonBlock = IContent & {
    /**
     * Categories
     * Categories associated with this content
     * 
     * @translatable    false
     */
    categories: PropertyContentReferenceList

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString

    /**
     * Background color
     * 
     * 
     * @translatable    false
     */
    backgroundColor: PropertyLongString

    /**
     * Block opacity (0 to 1)
     * 
     * 
     * @translatable    false
     */
    blockOpacity: PropertyFloatNumber

    /**
     * Use Custom Text Color
     * This will determine whether or not to overdride text color
     * 
     * @translatable    true
     */
    textColorOverdrive: PropertyBoolean

    /**
     * Use Custom Background Color
     * This will determine whether or not to overdride background color
     * 
     * @translatable    true
     */
    backgroundColorOverdrive: PropertyBoolean

    /**
     * Use Custom Border
     * This will determine whether or not to overdride border style
     * 
     * @translatable    true
     */
    borderStyleOverdrive: PropertyBoolean

    /**
     * Label
     * 
     * 
     * @translatable    true
     */
    buttonText: PropertyLongString

    /**
     * Use transparent background
     * This will determine whether or not to use transparent background
     * 
     * @translatable    true
     */
    showTransparentBackground: PropertyBoolean

    /**
     * Border Styles
     * This will determine whether or not to show border
     * 
     * @translatable    true
     */
    borderStyle: PropertyLongString

    /**
     * Link
     * 
     * 
     * @translatable    false
     */
    buttonLink: PropertyUrl

    /**
     * Button background color
     * 
     * 
     * @translatable    true
     */
    buttonBackgroundColor: PropertyLongString

    /**
     * Border width (px)
     * 
     * 
     * @translatable    false
     */
    borderWidth: PropertyNumber

    /**
     * Style
     * 
     * 
     * @translatable    false
     */
    buttonStyle: PropertyLongString

    /**
     * Button Border color
     * 
     * 
     * @translatable    true
     */
    buttonBorderColor: PropertyLongString

    /**
     * Reassuring caption
     * 
     * 
     * @translatable    true
     */
    buttonCaption: PropertyLongString

    /**
     * Button Text color
     * 
     * 
     * @translatable    true
     */
    buttonTextColor: PropertyLongString
}

/**
 * Container Block
 * Allow to style individual blocks, as well as groups of blocks
 *
 * @ContentBase Block
 * @ContentGuid 8bdfac81-1dbd-43b9-a012-522bd67ee8b3
 */
export type ContainerBlock = IContent & {
    /**
     * Categories
     * Categories associated with this content
     * 
     * @translatable    false
     */
    categories: PropertyContentReferenceList

    /**
     * Main content area
     * 
     * 
     * @translatable    false
     */
    mainContentArea: PropertyContentArea

    /**
     * CSS class
     * 
     * 
     * @translatable    false
     */
    cssClass: PropertyLongString

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString

    /**
     * Background color
     * 
     * 
     * @translatable    false
     */
    backgroundColor: PropertyLongString

    /**
     * Block opacity (0 to 1)
     * 
     * 
     * @translatable    false
     */
    blockOpacity: PropertyFloatNumber
}

/**
 * Facebook Feed Block
 * Display content from a Facebook feed
 *
 * @ContentBase Block
 * @ContentGuid fe935bfb-44b0-4ce2-a448-1d366ff3bbc0
 */
export type FacebookBlock = IContent & {
    /**
     * Categories
     * Categories associated with this content
     * 
     * @translatable    false
     */
    categories: PropertyContentReferenceList

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString

    /**
     * Background color
     * 
     * 
     * @translatable    false
     */
    backgroundColor: PropertyLongString

    /**
     * Block opacity (0 to 1)
     * 
     * 
     * @translatable    false
     */
    blockOpacity: PropertyFloatNumber

    /**
     * Account name
     * 
     * 
     * @translatable    false
     */
    accountName: PropertyLongString

    /**
     * Width
     * 
     * 
     * @translatable    false
     */
    width: PropertyNumber

    /**
     * Height
     * 
     * 
     * @translatable    false
     */
    height: PropertyNumber
}

/**
 * Google Maps Block
 * Display Google Maps
 *
 * @ContentBase Block
 * @ContentGuid 8fc31051-6d22-4445-b92d-7c394267fa49
 */
export type GoogleMapsBlock = IContent & {
    /**
     * Categories
     * Categories associated with this content
     * 
     * @translatable    false
     */
    categories: PropertyContentReferenceList

    /**
     * API Key
     * 
     * 
     * @translatable    false
     */
    apiKey: PropertyLongString

    /**
     * Search term
     * 
     * 
     * @translatable    false
     */
    searchTerm: PropertyLongString

    /**
     * Height
     * 
     * 
     * @translatable    false
     */
    height: PropertyFloatNumber

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString

    /**
     * Background color
     * 
     * 
     * @translatable    false
     */
    backgroundColor: PropertyLongString

    /**
     * Block opacity (0 to 1)
     * 
     * 
     * @translatable    false
     */
    blockOpacity: PropertyFloatNumber
}

/**
 * Health chatbot
 * Used to insert a health chat bot
 *
 * @ContentBase Block
 * @ContentGuid 18a7b10e-451c-4223-bad0-36bd224e3927
 */
export type HealthChatbotBlock = IContent & {
    /**
     * Categories
     * Categories associated with this content
     * 
     * @translatable    false
     */
    categories: PropertyContentReferenceList

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString

    /**
     * Background color
     * 
     * 
     * @translatable    false
     */
    backgroundColor: PropertyLongString

    /**
     * Block opacity (0 to 1)
     * 
     * 
     * @translatable    false
     */
    blockOpacity: PropertyFloatNumber

    /**
     * Text above bot
     * Text that appears above the chat bot
     * 
     * @translatable    true
     */
    headerText: PropertyXhtmlString

    /**
     * Direct Line Token
     * The token that is used to connect to the bot framework. Get this from > Health Bot Service > Integration > Channels > DirectLine
     * 
     * @translatable    false
     */
    directLineToken: PropertyLongString

    /**
     * Height (in pixels)
     * The height of the bot in pixels as shown on screen
     * 
     * @translatable    false
     */
    heightInPixels: PropertyNumber
}

/**
 * Video File
 * Used for video file types such as mp4, flv, webm
 *
 * @ContentBase Video
 * @ContentGuid 8a9d9d4b-cd4b-40e8-a777-414cfbda7770
 */
export type VideoFile = IContent & {
    /**
     * Preview image
     * 
     * 
     * @translatable    false
     */
    previewImage: PropertyContentReference

    /**
     * Copyright
     * 
     * 
     * @translatable    false
     */
    copyright: PropertyLongString

    /**
     * Display controls
     * 
     * 
     * @translatable    false
     */
    displayControls: PropertyBoolean

    /**
     * Autoplay
     * 
     * 
     * @translatable    false
     */
    autoplay: PropertyBoolean
}

/**
 * Hero Block Callout
 * 
 *
 * @ContentBase Block
 * @ContentGuid 7a3c9e9e-8612-4722-b795-2a93cb54a476
 */
export type HeroBlockCallout = IContent & {
    /**
     * Text
     * 
     * 
     * @translatable    true
     */
    calloutContent: PropertyXhtmlString

    /**
     * Text placement
     * 
     * 
     * @translatable    false
     */
    calloutContentAlignment: PropertyLongString

    /**
     * Text color
     * Sets text color of callout content
     * 
     * @translatable    false
     */
    calloutTextColor: PropertyLongString

    /**
     * Background color
     * 
     * 
     * @translatable    false
     */
    backgroundColor: PropertyLongString

    /**
     * Callout opacity (0 to 1)
     * 
     * 
     * @translatable    false
     */
    calloutOpacity: PropertyFloatNumber

    /**
     * Callout position
     * 
     * 
     * @translatable    false
     */
    calloutPosition: PropertyLongString

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString
}

/**
 * Menu Item Block
 * Used to create a menu item
 *
 * @ContentBase Block
 * @ContentGuid a6d0242a-3946-4a80-9eec-4d9b2e5fc2d0
 */
export type MenuItemBlock = IContent & {
    /**
     * Name
     * Name in menu
     * 
     * @translatable    true
     */
    name: PropertyLongString

    /**
     * Link
     * Link
     * 
     * @translatable    true
     */
    link: PropertyUrl

    /**
     * Menu item image
     * 
     * 
     * @translatable    false
     */
    menuImage: PropertyContentReference

    /**
     * Teaser text
     * 
     * 
     * @translatable    false
     */
    teaserText: PropertyXhtmlString

    /**
     * Label
     * 
     * 
     * @translatable    false
     */
    buttonText: PropertyLongString

    /**
     * Button link
     * 
     * 
     * @translatable    false
     */
    buttonLink: PropertyUrl

    /**
     * Child items
     * 
     * 
     * @translatable    false
     */
    childItems: GroupLinkCollectionProperty
}

/**
 * Carousel Block
 * Allows users to create a slider using a collection of Images or Hero blocks
 *
 * @ContentBase Block
 * @ContentGuid 980ead74-1d13-45d6-9c5c-16f900269ee6
 */
export type CarouselBlock = IContent & {
    /**
     * Categories
     * Categories associated with this content
     * 
     * @translatable    false
     */
    categories: PropertyContentReferenceList

    /**
     * Carousel items
     * List of carousel items
     * 
     * @translatable    true
     */
    carouselItems: PropertyContentArea

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString

    /**
     * Background color
     * 
     * 
     * @translatable    false
     */
    backgroundColor: PropertyLongString

    /**
     * Block opacity (0 to 1)
     * 
     * 
     * @translatable    false
     */
    blockOpacity: PropertyFloatNumber
}

/**
 * Person Item Page
 * Used to show info of specific person
 *
 * @ContentBase Page
 * @ContentGuid b5af511b-96c9-4ad7-828f-254924542430
 */
export type PersonPage = IContent & {
    /**
     * Job title
     * 
     * 
     * @translatable    true
     */
    jobTitle: PropertyLongString

    /**
     * Location
     * 
     * 
     * @translatable    true
     */
    location: PropertyLongString

    /**
     * Sector
     * 
     * 
     * @translatable    true
     */
    sector: PropertyLongString

    /**
     * Phone
     * 
     * 
     * @translatable    false
     */
    phone: PropertyLongString

    /**
     * Email
     * 
     * 
     * @translatable    true
     */
    email: PropertyLongString

    /**
     * Person image
     * 
     * 
     * @translatable    false
     */
    image: PropertyContentReference

    /**
     * About
     * 
     * 
     * @translatable    true
     */
    about: PropertyXhtmlString

    /**
     * Categories
     * Categories associated with this content.
     * 
     * @translatable    false
     */
    categories: PropertyContentReferenceList

    /**
     * Teaser ratio (width-height)
     * 
     * 
     * @translatable    true
     */
    teaserRatio: PropertyLongString

    /**
     * Main body
     * 
     * 
     * @translatable    true
     */
    mainBody: PropertyXhtmlString

    /**
     * Title
     * 
     * 
     * @translatable    true
     */
    metaTitle: PropertyLongString

    /**
     * Exclude from results
     * This will determine whether or not to show on search
     * 
     * @translatable    true
     */
    excludeFromSearch: PropertyBoolean

    /**
     * Image
     * 
     * 
     * @translatable    false
     */
    pageImage: PropertyContentReference

    /**
     * CSS files
     * 
     * 
     * @translatable    false
     */
    cssFiles: PropertyLinkCollection

    /**
     * Main content area
     * 
     * 
     * @translatable    true
     */
    mainContentArea: PropertyContentArea

    /**
     * Keywords
     * 
     * 
     * @translatable    true
     */
    keywords: PropertyLongString

    /**
     * Hide site header
     * 
     * 
     * @translatable    true
     */
    hideSiteHeader: PropertyBoolean

    /**
     * Video
     * 
     * 
     * @translatable    true
     */
    teaserVideo: PropertyContentReference

    /**
     * CSS
     * 
     * 
     * @translatable    false
     */
    css: PropertyLongString

    /**
     * Page description
     * 
     * 
     * @translatable    true
     */
    pageDescription: PropertyLongString

    /**
     * Hide site footer
     * 
     * 
     * @translatable    true
     */
    hideSiteFooter: PropertyBoolean

    /**
     * Text
     * 
     * 
     * @translatable    true
     */
    teaserText: PropertyLongString

    /**
     * Content type
     * 
     * 
     * @translatable    true
     */
    metaContentType: PropertyLongString

    /**
     * Industry
     * 
     * 
     * @translatable    true
     */
    industry: PropertyLongString

    /**
     * Author
     * 
     * 
     * @translatable    true
     */
    authorMetaData: PropertyLongString

    /**
     * Disable indexing
     * 
     * 
     * @translatable    true
     */
    disableIndexing: PropertyBoolean

    /**
     * Highlight in page list
     * 
     * 
     * @translatable    true
     */
    highlight: PropertyBoolean

    /**
     * Text alignment
     * 
     * 
     * @translatable    true
     */
    teaserTextAlignment: PropertyLongString

    /**
     * Color theme
     * 
     * 
     * @translatable    true
     */
    teaserColorTheme: PropertyLongString

    /**
     * Button label
     * 
     * 
     * @translatable    true
     */
    teaserButtonText: PropertyLongString

    /**
     * Button theme
     * 
     * 
     * @translatable    true
     */
    teaserButtonStyle: PropertyLongString

    /**
     * Button color
     * 
     * 
     * @translatable    true
     */
    teaserButtonColor: PropertyLongString

    /**
     * Button text color
     * 
     * 
     * @translatable    true
     */
    teaserButtonTextColor: PropertyLongString

    /**
     * Display hover effect
     * 
     * 
     * @translatable    true
     */
    applyHoverEffect: PropertyBoolean

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString
}

/**
 * Reset Password Mail Page
 * The reset password template mail page.
 *
 * @ContentBase Page
 * @ContentGuid 73bc5587-eef3-4844-be9d-0c90d081e2e4
 */
export type ResetPasswordMailPage = IContent & {
    /**
     * Subject
     * 
     * 
     * @translatable    true
     */
    subject: PropertyLongString

    /**
     * Categories
     * Categories associated with this content.
     * 
     * @translatable    false
     */
    categories: PropertyContentReferenceList

    /**
     * Teaser ratio (width-height)
     * 
     * 
     * @translatable    true
     */
    teaserRatio: PropertyLongString

    /**
     * Main body
     * 
     * 
     * @translatable    true
     */
    mainBody: PropertyXhtmlString

    /**
     * Title
     * 
     * 
     * @translatable    true
     */
    metaTitle: PropertyLongString

    /**
     * Exclude from results
     * This will determine whether or not to show on search
     * 
     * @translatable    true
     */
    excludeFromSearch: PropertyBoolean

    /**
     * Image
     * 
     * 
     * @translatable    false
     */
    pageImage: PropertyContentReference

    /**
     * CSS files
     * 
     * 
     * @translatable    false
     */
    cssFiles: PropertyLinkCollection

    /**
     * Main content area
     * 
     * 
     * @translatable    true
     */
    mainContentArea: PropertyContentArea

    /**
     * Keywords
     * 
     * 
     * @translatable    true
     */
    keywords: PropertyLongString

    /**
     * Hide site header
     * 
     * 
     * @translatable    true
     */
    hideSiteHeader: PropertyBoolean

    /**
     * Video
     * 
     * 
     * @translatable    true
     */
    teaserVideo: PropertyContentReference

    /**
     * CSS
     * 
     * 
     * @translatable    false
     */
    css: PropertyLongString

    /**
     * Page description
     * 
     * 
     * @translatable    true
     */
    pageDescription: PropertyLongString

    /**
     * Hide site footer
     * 
     * 
     * @translatable    true
     */
    hideSiteFooter: PropertyBoolean

    /**
     * Text
     * 
     * 
     * @translatable    true
     */
    teaserText: PropertyLongString

    /**
     * Content type
     * 
     * 
     * @translatable    true
     */
    metaContentType: PropertyLongString

    /**
     * Industry
     * 
     * 
     * @translatable    true
     */
    industry: PropertyLongString

    /**
     * Author
     * 
     * 
     * @translatable    true
     */
    authorMetaData: PropertyLongString

    /**
     * Disable indexing
     * 
     * 
     * @translatable    true
     */
    disableIndexing: PropertyBoolean

    /**
     * Highlight in page list
     * 
     * 
     * @translatable    true
     */
    highlight: PropertyBoolean

    /**
     * Text alignment
     * 
     * 
     * @translatable    true
     */
    teaserTextAlignment: PropertyLongString

    /**
     * Color theme
     * 
     * 
     * @translatable    true
     */
    teaserColorTheme: PropertyLongString

    /**
     * Button label
     * 
     * 
     * @translatable    true
     */
    teaserButtonText: PropertyLongString

    /**
     * Button theme
     * 
     * 
     * @translatable    true
     */
    teaserButtonStyle: PropertyLongString

    /**
     * Button color
     * 
     * 
     * @translatable    true
     */
    teaserButtonColor: PropertyLongString

    /**
     * Button text color
     * 
     * 
     * @translatable    true
     */
    teaserButtonTextColor: PropertyLongString

    /**
     * Display hover effect
     * 
     * 
     * @translatable    true
     */
    applyHoverEffect: PropertyBoolean

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString
}

/**
 * Collection Settings
 * Selection options settings
 *
 * @ContentBase 
 * @ContentGuid 4356a392-ed29-4895-9e65-bf44fa3db5ca
 */
export type CollectionSettings = IContent & {
    /**
     * Background colors
     * 
     * 
     * @translatable    false
     */
    backgroundColor: ColorPropertyList

    /**
     * Heading colors
     * 
     * 
     * @translatable    false
     */
    headingColor: ColorPropertyList

    /**
     * Text colors
     * 
     * 
     * @translatable    false
     */
    textColor: ColorPropertyList

    /**
     * Block opacity background colors
     * 
     * 
     * @translatable    false
     */
    opacityBackgrounColor: ColorPropertyList

    /**
     * Button background colors
     * 
     * 
     * @translatable    false
     */
    buttonBackgroundColor: ColorPropertyList

    /**
     * Button text colors
     * 
     * 
     * @translatable    false
     */
    buttonTextColor: ColorPropertyList

    /**
     * Banner background color
     * 
     * 
     * @translatable    false
     */
    bannerBackgroundColor: PropertyLongString

    /**
     * Banner text color
     * 
     * 
     * @translatable    false
     */
    bannerTextColor: PropertyLongString

    /**
     * Link color
     * 
     * 
     * @translatable    false
     */
    linkColor: PropertyLongString

    /**
     * Sectors
     * 
     * 
     * @translatable    true
     */
    sectors: SelectionItemProperty

    /**
     * Locations
     * 
     * 
     * @translatable    true
     */
    locations: SelectionItemProperty
}

/**
 * Search Settings
 * 
 *
 * @ContentBase 
 * @ContentGuid d4171337-70a4-476a-aa3c-0d976ac185e8
 */
export type SearchSettings = IContent & {
    /**
     * Search option
     * 
     * 
     * @translatable    true
     */
    searchOption: PropertyLongString
}

/**
 * Person List Page
 * Used to find people within an organization
 *
 * @ContentBase Page
 * @ContentGuid 4f0203b6-d49e-4683-9ce6-ede8c37c77d3
 */
export type PersonList = IContent & {
    /**
     * Categories
     * Categories associated with this content.
     * 
     * @translatable    false
     */
    categories: PropertyContentReferenceList

    /**
     * Teaser ratio (width-height)
     * 
     * 
     * @translatable    true
     */
    teaserRatio: PropertyLongString

    /**
     * Main body
     * 
     * 
     * @translatable    true
     */
    mainBody: PropertyXhtmlString

    /**
     * Title
     * 
     * 
     * @translatable    true
     */
    metaTitle: PropertyLongString

    /**
     * Exclude from results
     * This will determine whether or not to show on search
     * 
     * @translatable    true
     */
    excludeFromSearch: PropertyBoolean

    /**
     * Image
     * 
     * 
     * @translatable    false
     */
    pageImage: PropertyContentReference

    /**
     * CSS files
     * 
     * 
     * @translatable    false
     */
    cssFiles: PropertyLinkCollection

    /**
     * Main content area
     * 
     * 
     * @translatable    true
     */
    mainContentArea: PropertyContentArea

    /**
     * Keywords
     * 
     * 
     * @translatable    true
     */
    keywords: PropertyLongString

    /**
     * Hide site header
     * 
     * 
     * @translatable    true
     */
    hideSiteHeader: PropertyBoolean

    /**
     * Video
     * 
     * 
     * @translatable    true
     */
    teaserVideo: PropertyContentReference

    /**
     * CSS
     * 
     * 
     * @translatable    false
     */
    css: PropertyLongString

    /**
     * Page description
     * 
     * 
     * @translatable    true
     */
    pageDescription: PropertyLongString

    /**
     * Hide site footer
     * 
     * 
     * @translatable    true
     */
    hideSiteFooter: PropertyBoolean

    /**
     * Text
     * 
     * 
     * @translatable    true
     */
    teaserText: PropertyLongString

    /**
     * Content type
     * 
     * 
     * @translatable    true
     */
    metaContentType: PropertyLongString

    /**
     * Industry
     * 
     * 
     * @translatable    true
     */
    industry: PropertyLongString

    /**
     * Author
     * 
     * 
     * @translatable    true
     */
    authorMetaData: PropertyLongString

    /**
     * Disable indexing
     * 
     * 
     * @translatable    true
     */
    disableIndexing: PropertyBoolean

    /**
     * Highlight in page list
     * 
     * 
     * @translatable    true
     */
    highlight: PropertyBoolean

    /**
     * Text alignment
     * 
     * 
     * @translatable    true
     */
    teaserTextAlignment: PropertyLongString

    /**
     * Color theme
     * 
     * 
     * @translatable    true
     */
    teaserColorTheme: PropertyLongString

    /**
     * Button label
     * 
     * 
     * @translatable    true
     */
    teaserButtonText: PropertyLongString

    /**
     * Button theme
     * 
     * 
     * @translatable    true
     */
    teaserButtonStyle: PropertyLongString

    /**
     * Button color
     * 
     * 
     * @translatable    true
     */
    teaserButtonColor: PropertyLongString

    /**
     * Button text color
     * 
     * 
     * @translatable    true
     */
    teaserButtonTextColor: PropertyLongString

    /**
     * Display hover effect
     * 
     * 
     * @translatable    true
     */
    applyHoverEffect: PropertyBoolean

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString
}

/**
 * CategoryRoot
 * 
 *
 * @ContentBase 
 * @ContentGuid c29bf090-05bf-43eb-98d6-91575bce4441
 */
export type CategoryRoot = IContent & {
    /**
     * Description
     * 
     * 
     * @translatable    true
     */
    description: PropertyLongString

    /**
     * IsSelectable
     * 
     * 
     * @translatable    true
     */
    isSelectable: PropertyBoolean
}

/**
 * Scripts Injection Settings
 * Scripts Injection Settings
 *
 * @ContentBase 
 * @ContentGuid 0156b963-88a9-450b-867c-e5c5e7be29fd
 */
export type ScriptInjectionSettings = IContent & {
    /**
     * Header Scripts (Scripts will inject at the bottom of header)
     * Scripts will inject at the bottom of header
     * 
     * @translatable    true
     */
    headerScripts: ScriptInjectionProperty

    /**
     * Footer Scripts (Scripts will inject at the bottom of footer)
     * Scripts will inject at the bottom of footer
     * 
     * @translatable    true
     */
    footerScripts: ScriptInjectionProperty
}

/**
 * Label Settings
 * 
 *
 * @ContentBase 
 * @ContentGuid c17375a6-4a01-402b-8c7f-18257e944527
 */
export type LabelSettings = IContent & {
    /**
     * My account
     * 
     * 
     * @translatable    true
     */
    myAccountLabel: PropertyLongString

    /**
     * Search
     * 
     * 
     * @translatable    true
     */
    searchLabel: PropertyLongString
}

/**
 * Site Structure Settings Page
 * Site structure settings
 *
 * @ContentBase 
 * @ContentGuid bf69f959-c91b-46cb-9829-2ecf9d11e13b
 */
export type ReferencePageSettings = IContent & {
    /**
     * Search page
     * 
     * 
     * @translatable    false
     */
    searchPage: PropertyContentReference

    /**
     * Reset password
     * 
     * 
     * @translatable    false
     */
    resetPasswordMail: PropertyContentReference

    /**
     * Reset password page
     * 
     * 
     * @translatable    false
     */
    resetPasswordPage: PropertyContentReference
}

/**
 * Layout Settings
 * Header settings, footer settings, menu settings
 *
 * @ContentBase 
 * @ContentGuid f7366060-c801-494c-99b8-b761ac3447c3
 */
export type LayoutSettings = IContent & {
    /**
     * Introduction
     * 
     * 
     * @translatable    false
     */
    introduction: PropertyLongString

    /**
     * Main menu
     * 
     * 
     * @translatable    true
     */
    mainMenu: PropertyContentArea

    /**
     * Site logo
     * 
     * 
     * @translatable    true
     */
    siteLogo: PropertyContentReference

    /**
     * Logo height (pixels)
     * 
     * 
     * @translatable    false
     */
    logoHeight: PropertyNumber

    /**
     * Header Background Color
     * 
     * 
     * @translatable    false
     */
    headerBackgroundColor: PropertyLongString

    /**
     * Company header
     * 
     * 
     * @translatable    false
     */
    companyHeader: PropertyLongString

    /**
     * Banner text
     * 
     * 
     * @translatable    true
     */
    bannerText: PropertyXhtmlString

    /**
     * Company name
     * 
     * 
     * @translatable    false
     */
    companyName: PropertyLongString

    /**
     * Comapny address
     * 
     * 
     * @translatable    false
     */
    companyAddress: PropertyLongString

    /**
     * Menu style
     * 
     * 
     * @translatable    true
     */
    headerMenuStyle: PropertyLongString

    /**
     * Large header menu
     * 
     * 
     * @translatable    true
     */
    largeHeaderMenu: PropertyBoolean

    /**
     * Company phone
     * 
     * 
     * @translatable    false
     */
    companyPhone: PropertyLongString

    /**
     * My account menu
     * 
     * 
     * @translatable    true
     */
    myAccountCmsMenu: PropertyLinkCollection

    /**
     * Company email
     * 
     * 
     * @translatable    false
     */
    companyEmail: PropertyLongString

    /**
     * Sticky header
     * 
     * 
     * @translatable    true
     */
    stickyTopHeader: PropertyBoolean

    /**
     * Links header
     * 
     * 
     * @translatable    false
     */
    linksHeader: PropertyLongString

    /**
     * Links
     * 
     * 
     * @translatable    false
     */
    links: PropertyLinkCollection

    /**
     * Social header
     * 
     * 
     * @translatable    false
     */
    socialHeader: PropertyLongString

    /**
     * Social links
     * 
     * 
     * @translatable    false
     */
    socialLinks: PropertyLinkCollection

    /**
     * Content area
     * 
     * 
     * @translatable    true
     */
    contentArea: PropertyContentArea

    /**
     * Copyright
     * 
     * 
     * @translatable    false
     */
    footerCopyrightText: PropertyLongString
}

/**
 * Page List Block
 * A block that lists a bunch of pages
 *
 * @ContentBase Block
 * @ContentGuid 30685434-33de-42af-88a7-3126b936aead
 */
export type PageListBlock = IContent & {
    /**
     * Categories
     * Categories associated with this content
     * 
     * @translatable    false
     */
    categories: PropertyContentReferenceList

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString

    /**
     * Background color
     * 
     * 
     * @translatable    false
     */
    backgroundColor: PropertyLongString

    /**
     * Block opacity (0 to 1)
     * 
     * 
     * @translatable    false
     */
    blockOpacity: PropertyFloatNumber

    /**
     * Heading
     * 
     * 
     * @translatable    true
     */
    heading: PropertyLongString

    /**
     * Include publish date
     * 
     * 
     * @translatable    false
     */
    includePublishDate: PropertyBoolean

    /**
     * Include teaser text
     * 
     * 
     * @translatable    false
     */
    includeTeaserText: PropertyBoolean

    /**
     * Number of results
     * 
     * 
     * @translatable    false
     */
    count: PropertyNumber

    /**
     * Sort order
     * 
     * 
     * @translatable    false
     */
    sortOrder: PropertyNumber

    /**
     * Roots
     * 
     * 
     * @translatable    false
     */
    roots: PropertyContentArea

    /**
     * Filter by page type
     * 
     * 
     * @translatable    false
     */
    pageTypeFilter: PropertyPageType

    /**
     * Filter by category
     * Categories to filter the list on
     * 
     * @translatable    false
     */
    categoryListFilter: PropertyContentReferenceList

    /**
     * Include all levels
     * 
     * 
     * @translatable    false
     */
    recursive: PropertyBoolean

    /**
     * Template of pages listing
     * 
     * 
     * @translatable    false
     */
    template: PropertyLongString

    /**
     * Preview option (not available in the Grid, Insight templates)
     * 
     * 
     * @translatable    false
     */
    previewOption: PropertyLongString

    /**
     * Overlay color (only for Card template)
     * Apply for Card template
     * 
     * @translatable    false
     */
    overlayColor: PropertyLongString

    /**
     * Overlay text color (only for Card template)
     * Apply for Card template
     * 
     * @translatable    false
     */
    overlayTextColor: PropertyLongString
}

/**
 * Standard Category
 * Used to categorize content
 *
 * @ContentBase 
 * @ContentGuid a9bbd7fc-27c5-4718-890a-e28acbe5ee26
 */
export type StandardCategory = IContent & {
    /**
     * Description
     * 
     * 
     * @translatable    true
     */
    description: PropertyLongString

    /**
     * IsSelectable
     * 
     * 
     * @translatable    true
     */
    isSelectable: PropertyBoolean

    /**
     * Hide site header
     * 
     * 
     * @translatable    true
     */
    hideSiteHeader: PropertyBoolean

    /**
     * CSS files
     * 
     * 
     * @translatable    false
     */
    cssFiles: PropertyLinkCollection

    /**
     * Script files
     * 
     * 
     * @translatable    false
     */
    scriptFiles: PropertyLinkCollection

    /**
     * Hide site footer
     * 
     * 
     * @translatable    true
     */
    hideSiteFooter: PropertyBoolean

    /**
     * CSS
     * 
     * 
     * @translatable    false
     */
    css: PropertyLongString

    /**
     * Scripts
     * 
     * 
     * @translatable    false
     */
    scripts: PropertyLongString
}

/**
 * SettingsFolder
 * 
 *
 * @ContentBase Folder
 * @ContentGuid c709627f-ca9f-4c77-b0fb-8563287ebd93
 */
export type SettingsFolder = IContent & {

}

/**
 * Three Column Landing Page
 * Three column landing page with properties to determin column size
 *
 * @ContentBase Page
 * @ContentGuid 947edf31-8c8c-4595-8591-a17def75685e
 */
export type ThreeColumnLandingPage = IContent & {
    /**
     * Categories
     * Categories associated with this content.
     * 
     * @translatable    false
     */
    categories: PropertyContentReferenceList

    /**
     * Teaser ratio (width-height)
     * 
     * 
     * @translatable    true
     */
    teaserRatio: PropertyLongString

    /**
     * Top content area
     * 
     * 
     * @translatable    false
     */
    topContentArea: PropertyContentArea

    /**
     * Main body
     * 
     * 
     * @translatable    true
     */
    mainBody: PropertyXhtmlString

    /**
     * Title
     * 
     * 
     * @translatable    true
     */
    metaTitle: PropertyLongString

    /**
     * Exclude from results
     * This will determine whether or not to show on search
     * 
     * @translatable    true
     */
    excludeFromSearch: PropertyBoolean

    /**
     * Image
     * 
     * 
     * @translatable    false
     */
    pageImage: PropertyContentReference

    /**
     * CSS files
     * 
     * 
     * @translatable    false
     */
    cssFiles: PropertyLinkCollection

    /**
     * Left content area
     * 
     * 
     * @translatable    true
     */
    leftContentArea: PropertyContentArea

    /**
     * Main content area
     * 
     * 
     * @translatable    true
     */
    mainContentArea: PropertyContentArea

    /**
     * Keywords
     * 
     * 
     * @translatable    true
     */
    keywords: PropertyLongString

    /**
     * Hide site header
     * 
     * 
     * @translatable    true
     */
    hideSiteHeader: PropertyBoolean

    /**
     * Video
     * 
     * 
     * @translatable    true
     */
    teaserVideo: PropertyContentReference

    /**
     * CSS
     * 
     * 
     * @translatable    false
     */
    css: PropertyLongString

    /**
     * Right content area
     * 
     * 
     * @translatable    true
     */
    rightContentArea: PropertyContentArea

    /**
     * Left column
     * 
     * 
     * @translatable    true
     */
    leftColumn: PropertyNumber

    /**
     * Center column
     * 
     * 
     * @translatable    true
     */
    centerColumn: PropertyNumber

    /**
     * Right column
     * 
     * 
     * @translatable    true
     */
    rightColumn: PropertyNumber

    /**
     * Page description
     * 
     * 
     * @translatable    true
     */
    pageDescription: PropertyLongString

    /**
     * Hide site footer
     * 
     * 
     * @translatable    true
     */
    hideSiteFooter: PropertyBoolean

    /**
     * Text
     * 
     * 
     * @translatable    true
     */
    teaserText: PropertyLongString

    /**
     * Content type
     * 
     * 
     * @translatable    true
     */
    metaContentType: PropertyLongString

    /**
     * Industry
     * 
     * 
     * @translatable    true
     */
    industry: PropertyLongString

    /**
     * Author
     * 
     * 
     * @translatable    true
     */
    authorMetaData: PropertyLongString

    /**
     * Disable indexing
     * 
     * 
     * @translatable    true
     */
    disableIndexing: PropertyBoolean

    /**
     * Highlight in page list
     * 
     * 
     * @translatable    true
     */
    highlight: PropertyBoolean

    /**
     * Text alignment
     * 
     * 
     * @translatable    true
     */
    teaserTextAlignment: PropertyLongString

    /**
     * Color theme
     * 
     * 
     * @translatable    true
     */
    teaserColorTheme: PropertyLongString

    /**
     * Button label
     * 
     * 
     * @translatable    true
     */
    teaserButtonText: PropertyLongString

    /**
     * Button theme
     * 
     * 
     * @translatable    true
     */
    teaserButtonStyle: PropertyLongString

    /**
     * Button color
     * 
     * 
     * @translatable    true
     */
    teaserButtonColor: PropertyLongString

    /**
     * Button text color
     * 
     * 
     * @translatable    true
     */
    teaserButtonTextColor: PropertyLongString

    /**
     * Display hover effect
     * 
     * 
     * @translatable    true
     */
    applyHoverEffect: PropertyBoolean

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString
}

/**
 * Two Column Landing Page
 * Two column landing page with properties to determine column size
 *
 * @ContentBase Page
 * @ContentGuid f94571b0-65c4-4e49-8a88-5930d045e19d
 */
export type TwoColumnLandingPage = IContent & {
    /**
     * Categories
     * Categories associated with this content.
     * 
     * @translatable    false
     */
    categories: PropertyContentReferenceList

    /**
     * Teaser ratio (width-height)
     * 
     * 
     * @translatable    true
     */
    teaserRatio: PropertyLongString

    /**
     * Top content area
     * 
     * 
     * @translatable    false
     */
    topContentArea: PropertyContentArea

    /**
     * Main body
     * 
     * 
     * @translatable    true
     */
    mainBody: PropertyXhtmlString

    /**
     * Title
     * 
     * 
     * @translatable    true
     */
    metaTitle: PropertyLongString

    /**
     * Exclude from results
     * This will determine whether or not to show on search
     * 
     * @translatable    true
     */
    excludeFromSearch: PropertyBoolean

    /**
     * Image
     * 
     * 
     * @translatable    false
     */
    pageImage: PropertyContentReference

    /**
     * CSS files
     * 
     * 
     * @translatable    false
     */
    cssFiles: PropertyLinkCollection

    /**
     * Main content area
     * 
     * 
     * @translatable    true
     */
    mainContentArea: PropertyContentArea

    /**
     * Keywords
     * 
     * 
     * @translatable    true
     */
    keywords: PropertyLongString

    /**
     * Hide site header
     * 
     * 
     * @translatable    true
     */
    hideSiteHeader: PropertyBoolean

    /**
     * Video
     * 
     * 
     * @translatable    true
     */
    teaserVideo: PropertyContentReference

    /**
     * CSS
     * 
     * 
     * @translatable    false
     */
    css: PropertyLongString

    /**
     * Right content area
     * 
     * 
     * @translatable    true
     */
    rightContentArea: PropertyContentArea

    /**
     * Left column
     * 
     * 
     * @translatable    true
     */
    leftColumn: PropertyNumber

    /**
     * Right column
     * 
     * 
     * @translatable    true
     */
    rightColumn: PropertyNumber

    /**
     * Page description
     * 
     * 
     * @translatable    true
     */
    pageDescription: PropertyLongString

    /**
     * Hide site footer
     * 
     * 
     * @translatable    true
     */
    hideSiteFooter: PropertyBoolean

    /**
     * Text
     * 
     * 
     * @translatable    true
     */
    teaserText: PropertyLongString

    /**
     * Content type
     * 
     * 
     * @translatable    true
     */
    metaContentType: PropertyLongString

    /**
     * Industry
     * 
     * 
     * @translatable    true
     */
    industry: PropertyLongString

    /**
     * Author
     * 
     * 
     * @translatable    true
     */
    authorMetaData: PropertyLongString

    /**
     * Disable indexing
     * 
     * 
     * @translatable    true
     */
    disableIndexing: PropertyBoolean

    /**
     * Highlight in page list
     * 
     * 
     * @translatable    true
     */
    highlight: PropertyBoolean

    /**
     * Text alignment
     * 
     * 
     * @translatable    true
     */
    teaserTextAlignment: PropertyLongString

    /**
     * Color theme
     * 
     * 
     * @translatable    true
     */
    teaserColorTheme: PropertyLongString

    /**
     * Button label
     * 
     * 
     * @translatable    true
     */
    teaserButtonText: PropertyLongString

    /**
     * Button theme
     * 
     * 
     * @translatable    true
     */
    teaserButtonStyle: PropertyLongString

    /**
     * Button color
     * 
     * 
     * @translatable    true
     */
    teaserButtonColor: PropertyLongString

    /**
     * Button text color
     * 
     * 
     * @translatable    true
     */
    teaserButtonTextColor: PropertyLongString

    /**
     * Display hover effect
     * 
     * 
     * @translatable    true
     */
    applyHoverEffect: PropertyBoolean

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString
}

/**
 * Location Item Page
 * Used to display the details of a location
 *
 * @ContentBase Page
 * @ContentGuid ac26ee4b-104f-4719-8aab-ad6d3fcb0d75
 */
export type LocationItemPage = IContent & {
    /**
     * Intro text
     * 
     * 
     * @translatable    false
     */
    mainIntro: PropertyLongString

    /**
     * Continent
     * 
     * 
     * @translatable    false
     */
    continent: PropertyString

    /**
     * Categories
     * Categories associated with this content.
     * 
     * @translatable    false
     */
    categories: PropertyContentReferenceList

    /**
     * Country
     * 
     * 
     * @translatable    false
     */
    country: PropertyString

    /**
     * Latitude
     * 
     * 
     * @translatable    false
     */
    latitude: PropertyFloatNumber

    /**
     * Longitude
     * 
     * 
     * @translatable    false
     */
    longitude: PropertyFloatNumber

    /**
     * Average temperature
     * 
     * 
     * @translatable    false
     */
    avgTemp: PropertyFloatNumber

    /**
     * Teaser ratio (width-height)
     * 
     * 
     * @translatable    true
     */
    teaserRatio: PropertyLongString

    /**
     * Airport initials
     * 
     * 
     * @translatable    false
     */
    airportInitials: PropertyString

    /**
     * Yearly passengers
     * 
     * 
     * @translatable    false
     */
    yearlyPassengers: PropertyNumber

    /**
     * Main body
     * 
     * 
     * @translatable    true
     */
    mainBody: PropertyXhtmlString

    /**
     * Title
     * 
     * 
     * @translatable    true
     */
    metaTitle: PropertyLongString

    /**
     * Exclude from results
     * This will determine whether or not to show on search
     * 
     * @translatable    true
     */
    excludeFromSearch: PropertyBoolean

    /**
     * Image
     * 
     * 
     * @translatable    false
     */
    pageImage: PropertyContentReference

    /**
     * CSS files
     * 
     * 
     * @translatable    false
     */
    cssFiles: PropertyLinkCollection

    /**
     * Image
     * 
     * 
     * @translatable    false
     */
    image: PropertyContentReference

    /**
     * Main content area
     * 
     * 
     * @translatable    true
     */
    mainContentArea: PropertyContentArea

    /**
     * Keywords
     * 
     * 
     * @translatable    true
     */
    keywords: PropertyLongString

    /**
     * Hide site header
     * 
     * 
     * @translatable    true
     */
    hideSiteHeader: PropertyBoolean

    /**
     * Video
     * 
     * 
     * @translatable    true
     */
    teaserVideo: PropertyContentReference

    /**
     * CSS
     * 
     * 
     * @translatable    false
     */
    css: PropertyLongString

    /**
     * Left content area
     * 
     * 
     * @translatable    false
     */
    leftContentArea: PropertyContentArea

    /**
     * New location
     * 
     * 
     * @translatable    false
     */
    new: PropertyBoolean

    /**
     * Promoted location
     * Check this, in order to boost this destination and promote it in suggestions
     * 
     * @translatable    false
     */
    promoted: PropertyBoolean

    /**
     * Page description
     * 
     * 
     * @translatable    true
     */
    pageDescription: PropertyLongString

    /**
     * Hide site footer
     * 
     * 
     * @translatable    true
     */
    hideSiteFooter: PropertyBoolean

    /**
     * Text
     * 
     * 
     * @translatable    true
     */
    teaserText: PropertyLongString

    /**
     * Content type
     * 
     * 
     * @translatable    true
     */
    metaContentType: PropertyLongString

    /**
     * Industry
     * 
     * 
     * @translatable    true
     */
    industry: PropertyLongString

    /**
     * Author
     * 
     * 
     * @translatable    true
     */
    authorMetaData: PropertyLongString

    /**
     * Disable indexing
     * 
     * 
     * @translatable    true
     */
    disableIndexing: PropertyBoolean

    /**
     * Highlight in page list
     * 
     * 
     * @translatable    true
     */
    highlight: PropertyBoolean

    /**
     * Text alignment
     * 
     * 
     * @translatable    true
     */
    teaserTextAlignment: PropertyLongString

    /**
     * Color theme
     * 
     * 
     * @translatable    true
     */
    teaserColorTheme: PropertyLongString

    /**
     * Button label
     * 
     * 
     * @translatable    true
     */
    teaserButtonText: PropertyLongString

    /**
     * Button theme
     * 
     * 
     * @translatable    true
     */
    teaserButtonStyle: PropertyLongString

    /**
     * Button color
     * 
     * 
     * @translatable    true
     */
    teaserButtonColor: PropertyLongString

    /**
     * Button text color
     * 
     * 
     * @translatable    true
     */
    teaserButtonTextColor: PropertyLongString

    /**
     * Display hover effect
     * 
     * 
     * @translatable    true
     */
    applyHoverEffect: PropertyBoolean

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString
}

/**
 * Locations List Page
 * Used to display a list of all locations
 *
 * @ContentBase Page
 * @ContentGuid 597afd14-391b-4e99-8e4f-8827e3e82354
 */
export type LocationListPage = IContent & {
    /**
     * Categories
     * Categories associated with this content.
     * 
     * @translatable    false
     */
    categories: PropertyContentReferenceList

    /**
     * Teaser ratio (width-height)
     * 
     * 
     * @translatable    true
     */
    teaserRatio: PropertyLongString

    /**
     * Main body
     * 
     * 
     * @translatable    true
     */
    mainBody: PropertyXhtmlString

    /**
     * Title
     * 
     * 
     * @translatable    true
     */
    metaTitle: PropertyLongString

    /**
     * Exclude from results
     * This will determine whether or not to show on search
     * 
     * @translatable    true
     */
    excludeFromSearch: PropertyBoolean

    /**
     * Image
     * 
     * 
     * @translatable    false
     */
    pageImage: PropertyContentReference

    /**
     * CSS files
     * 
     * 
     * @translatable    false
     */
    cssFiles: PropertyLinkCollection

    /**
     * Main content area
     * 
     * 
     * @translatable    true
     */
    mainContentArea: PropertyContentArea

    /**
     * Keywords
     * 
     * 
     * @translatable    true
     */
    keywords: PropertyLongString

    /**
     * Hide site header
     * 
     * 
     * @translatable    true
     */
    hideSiteHeader: PropertyBoolean

    /**
     * Video
     * 
     * 
     * @translatable    true
     */
    teaserVideo: PropertyContentReference

    /**
     * CSS
     * 
     * 
     * @translatable    false
     */
    css: PropertyLongString

    /**
     * Filter area
     * 
     * 
     * @translatable    false
     */
    filterArea: PropertyContentArea

    /**
     * Page description
     * 
     * 
     * @translatable    true
     */
    pageDescription: PropertyLongString

    /**
     * Hide site footer
     * 
     * 
     * @translatable    true
     */
    hideSiteFooter: PropertyBoolean

    /**
     * Text
     * 
     * 
     * @translatable    true
     */
    teaserText: PropertyLongString

    /**
     * Content type
     * 
     * 
     * @translatable    true
     */
    metaContentType: PropertyLongString

    /**
     * Industry
     * 
     * 
     * @translatable    true
     */
    industry: PropertyLongString

    /**
     * Author
     * 
     * 
     * @translatable    true
     */
    authorMetaData: PropertyLongString

    /**
     * Disable indexing
     * 
     * 
     * @translatable    true
     */
    disableIndexing: PropertyBoolean

    /**
     * Highlight in page list
     * 
     * 
     * @translatable    true
     */
    highlight: PropertyBoolean

    /**
     * Text alignment
     * 
     * 
     * @translatable    true
     */
    teaserTextAlignment: PropertyLongString

    /**
     * Color theme
     * 
     * 
     * @translatable    true
     */
    teaserColorTheme: PropertyLongString

    /**
     * Button label
     * 
     * 
     * @translatable    true
     */
    teaserButtonText: PropertyLongString

    /**
     * Button theme
     * 
     * 
     * @translatable    true
     */
    teaserButtonStyle: PropertyLongString

    /**
     * Button color
     * 
     * 
     * @translatable    true
     */
    teaserButtonColor: PropertyLongString

    /**
     * Button text color
     * 
     * 
     * @translatable    true
     */
    teaserButtonTextColor: PropertyLongString

    /**
     * Display hover effect
     * 
     * 
     * @translatable    true
     */
    applyHoverEffect: PropertyBoolean

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString
}

/**
 * Tags Page
 * Used to define a Tag
 *
 * @ContentBase Page
 * @ContentGuid fc83ded1-be4a-40fe-99b2-9ab739b018d5
 */
export type TagPage = IContent & {
    /**
     * Images
     * 
     * 
     * @translatable    false
     */
    images: PropertyContentArea

    /**
     * Categories
     * Categories associated with this content.
     * 
     * @translatable    false
     */
    categories: PropertyContentReferenceList

    /**
     * Top content area
     * 
     * 
     * @translatable    false
     */
    topContentArea: PropertyContentArea

    /**
     * Teaser ratio (width-height)
     * 
     * 
     * @translatable    true
     */
    teaserRatio: PropertyLongString

    /**
     * Intro text
     * 
     * 
     * @translatable    false
     */
    mainIntro: PropertyLongString

    /**
     * Main body
     * 
     * 
     * @translatable    true
     */
    mainBody: PropertyXhtmlString

    /**
     * Title
     * 
     * 
     * @translatable    true
     */
    metaTitle: PropertyLongString

    /**
     * Exclude from results
     * This will determine whether or not to show on search
     * 
     * @translatable    true
     */
    excludeFromSearch: PropertyBoolean

    /**
     * Image
     * 
     * 
     * @translatable    false
     */
    pageImage: PropertyContentReference

    /**
     * CSS files
     * 
     * 
     * @translatable    false
     */
    cssFiles: PropertyLinkCollection

    /**
     * Main content area
     * 
     * 
     * @translatable    true
     */
    mainContentArea: PropertyContentArea

    /**
     * Keywords
     * 
     * 
     * @translatable    true
     */
    keywords: PropertyLongString

    /**
     * Hide site header
     * 
     * 
     * @translatable    true
     */
    hideSiteHeader: PropertyBoolean

    /**
     * Video
     * 
     * 
     * @translatable    true
     */
    teaserVideo: PropertyContentReference

    /**
     * CSS
     * 
     * 
     * @translatable    false
     */
    css: PropertyLongString

    /**
     * Bottom content area
     * 
     * 
     * @translatable    false
     */
    bottomArea: PropertyContentArea

    /**
     * Page description
     * 
     * 
     * @translatable    true
     */
    pageDescription: PropertyLongString

    /**
     * Hide site footer
     * 
     * 
     * @translatable    true
     */
    hideSiteFooter: PropertyBoolean

    /**
     * Text
     * 
     * 
     * @translatable    true
     */
    teaserText: PropertyLongString

    /**
     * Content type
     * 
     * 
     * @translatable    true
     */
    metaContentType: PropertyLongString

    /**
     * Industry
     * 
     * 
     * @translatable    true
     */
    industry: PropertyLongString

    /**
     * Author
     * 
     * 
     * @translatable    true
     */
    authorMetaData: PropertyLongString

    /**
     * Disable indexing
     * 
     * 
     * @translatable    true
     */
    disableIndexing: PropertyBoolean

    /**
     * Highlight in page list
     * 
     * 
     * @translatable    true
     */
    highlight: PropertyBoolean

    /**
     * Text alignment
     * 
     * 
     * @translatable    true
     */
    teaserTextAlignment: PropertyLongString

    /**
     * Color theme
     * 
     * 
     * @translatable    true
     */
    teaserColorTheme: PropertyLongString

    /**
     * Button label
     * 
     * 
     * @translatable    true
     */
    teaserButtonText: PropertyLongString

    /**
     * Button theme
     * 
     * 
     * @translatable    true
     */
    teaserButtonStyle: PropertyLongString

    /**
     * Button color
     * 
     * 
     * @translatable    true
     */
    teaserButtonColor: PropertyLongString

    /**
     * Button text color
     * 
     * 
     * @translatable    true
     */
    teaserButtonTextColor: PropertyLongString

    /**
     * Display hover effect
     * 
     * 
     * @translatable    true
     */
    applyHoverEffect: PropertyBoolean

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString
}

/**
 * Webp Image File
 * Used for webp image file type
 *
 * @ContentBase Image
 * @ContentGuid 46652356-ef68-4ef2-b57e-293aa4f87be8
 */
export type WebImageMediaData = IContent & {
    /**
     * Large thumbnail
     * 
     * 
     * @translatable    false
     */
    largeThumbnail: PropertyBlob

    /**
     * Image alignment
     * 
     * 
     * @translatable    false
     */
    imageAlignment: PropertyLongString

    /**
     * File size
     * 
     * 
     * @translatable    false
     */
    fileSize: PropertyLongString

    /**
     * Padding top
     * 
     * 
     * @translatable    false
     */
    paddingTop: PropertyNumber

    /**
     * Padding right
     * 
     * 
     * @translatable    false
     */
    paddingRight: PropertyNumber

    /**
     * Padding bottom
     * 
     * 
     * @translatable    false
     */
    paddingBottom: PropertyNumber

    /**
     * Padding left
     * 
     * 
     * @translatable    false
     */
    paddingLeft: PropertyNumber

    /**
     * Accent color
     * 
     * 
     * @translatable    false
     */
    accentColor: PropertyLongString

    /**
     * Caption
     * 
     * 
     * @translatable    false
     */
    caption: PropertyLongString

    /**
     * Clip art type
     * 
     * 
     * @translatable    false
     */
    clipArtType: PropertyLongString

    /**
     * Dominant color background
     * 
     * 
     * @translatable    false
     */
    dominantColorBackground: PropertyLongString

    /**
     * Dominant color foreground
     * 
     * 
     * @translatable    false
     */
    dominantColorForeground: PropertyLongString

    /**
     * Dominant colors
     * 
     * 
     * @translatable    false
     */
    dominantColors: PropertyStringList

    /**
     * Image categories
     * 
     * 
     * @translatable    false
     */
    imageCategories: PropertyStringList

    /**
     * Is adult content
     * 
     * 
     * @translatable    false
     */
    isAdultContent: PropertyBoolean

    /**
     * Is black & white image
     * 
     * 
     * @translatable    false
     */
    isBwImg: PropertyBoolean

    /**
     * Is racy content
     * 
     * 
     * @translatable    false
     */
    isRacyContent: PropertyBoolean

    /**
     * Line drawing type
     * 
     * 
     * @translatable    false
     */
    lineDrawingType: PropertyLongString

    /**
     * Tags
     * 
     * 
     * @translatable    false
     */
    tags: PropertyStringList

    /**
     * Title
     * 
     * 
     * @translatable    true
     */
    title: PropertyLongString

    /**
     * Description
     * Description of the image
     * 
     * @translatable    true
     */
    description: PropertyLongString

    /**
     * Alternate text
     * 
     * 
     * @translatable    true
     */
    altText: PropertyLongString

    /**
     * Credits text
     * 
     * 
     * @translatable    true
     */
    creditsText: PropertyLongString

    /**
     * Credits link
     * 
     * 
     * @translatable    true
     */
    creditsLink: PropertyUrl

    /**
     * Link
     * Link to content
     * 
     * @translatable    true
     */
    link: PropertyContentReference

    /**
     * Copyright
     * 
     * 
     * @translatable    true
     */
    copyright: PropertyLongString
}

/**
 * Standard Page
 * Allows for creation of rich standard pages
 *
 * @ContentBase Page
 * @ContentGuid c0a25bb7-199c-457d-98c6-b0179c7acae8
 */
export type StandardPage = IContent & {
    /**
     * Categories
     * Categories associated with this content.
     * 
     * @translatable    false
     */
    categories: PropertyContentReferenceList

    /**
     * Teaser ratio (width-height)
     * 
     * 
     * @translatable    true
     */
    teaserRatio: PropertyLongString

    /**
     * Main body
     * 
     * 
     * @translatable    true
     */
    mainBody: PropertyXhtmlString

    /**
     * Title
     * 
     * 
     * @translatable    true
     */
    metaTitle: PropertyLongString

    /**
     * Exclude from results
     * This will determine whether or not to show on search
     * 
     * @translatable    true
     */
    excludeFromSearch: PropertyBoolean

    /**
     * Image
     * 
     * 
     * @translatable    false
     */
    pageImage: PropertyContentReference

    /**
     * CSS files
     * 
     * 
     * @translatable    false
     */
    cssFiles: PropertyLinkCollection

    /**
     * Main content area
     * 
     * 
     * @translatable    true
     */
    mainContentArea: PropertyContentArea

    /**
     * Keywords
     * 
     * 
     * @translatable    true
     */
    keywords: PropertyLongString

    /**
     * Hide site header
     * 
     * 
     * @translatable    true
     */
    hideSiteHeader: PropertyBoolean

    /**
     * Video
     * 
     * 
     * @translatable    true
     */
    teaserVideo: PropertyContentReference

    /**
     * CSS
     * 
     * 
     * @translatable    false
     */
    css: PropertyLongString

    /**
     * Title color
     * 
     * 
     * @translatable    true
     */
    titleColor: PropertyLongString

    /**
     * Background color
     * 
     * 
     * @translatable    false
     */
    backgroundColor: PropertyLongString

    /**
     * Title opacity (0 to 1)
     * 
     * 
     * @translatable    false
     */
    backgroundOpacity: PropertyFloatNumber

    /**
     * Background image
     * 
     * 
     * @translatable    true
     */
    backgroundImage: PropertyContentReference

    /**
     * Background video
     * 
     * 
     * @translatable    true
     */
    backgroundVideo: PropertyContentReference

    /**
     * Top padding mode
     * Sets how much padding should be at the top of the standard content
     * 
     * @translatable    false
     */
    topPaddingMode: PropertyLongString

    /**
     * Page description
     * 
     * 
     * @translatable    true
     */
    pageDescription: PropertyLongString

    /**
     * Hide site footer
     * 
     * 
     * @translatable    true
     */
    hideSiteFooter: PropertyBoolean

    /**
     * Text
     * 
     * 
     * @translatable    true
     */
    teaserText: PropertyLongString

    /**
     * Content type
     * 
     * 
     * @translatable    true
     */
    metaContentType: PropertyLongString

    /**
     * Industry
     * 
     * 
     * @translatable    true
     */
    industry: PropertyLongString

    /**
     * Author
     * 
     * 
     * @translatable    true
     */
    authorMetaData: PropertyLongString

    /**
     * Disable indexing
     * 
     * 
     * @translatable    true
     */
    disableIndexing: PropertyBoolean

    /**
     * Highlight in page list
     * 
     * 
     * @translatable    true
     */
    highlight: PropertyBoolean

    /**
     * Text alignment
     * 
     * 
     * @translatable    true
     */
    teaserTextAlignment: PropertyLongString

    /**
     * Color theme
     * 
     * 
     * @translatable    true
     */
    teaserColorTheme: PropertyLongString

    /**
     * Button label
     * 
     * 
     * @translatable    true
     */
    teaserButtonText: PropertyLongString

    /**
     * Button theme
     * 
     * 
     * @translatable    true
     */
    teaserButtonStyle: PropertyLongString

    /**
     * Button color
     * 
     * 
     * @translatable    true
     */
    teaserButtonColor: PropertyLongString

    /**
     * Button text color
     * 
     * 
     * @translatable    true
     */
    teaserButtonTextColor: PropertyLongString

    /**
     * Display hover effect
     * 
     * 
     * @translatable    true
     */
    applyHoverEffect: PropertyBoolean

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString
}

/**
 * Search Results Page
 * Page to allow customer to search the site
 *
 * @ContentBase Page
 * @ContentGuid 6e0c84de-bd17-43ee-9019-04f08c7fcf8d
 */
export type SearchResultPage = IContent & {
    /**
     * Categories
     * Categories associated with this content.
     * 
     * @translatable    false
     */
    categories: PropertyContentReferenceList

    /**
     * Teaser ratio (width-height)
     * 
     * 
     * @translatable    true
     */
    teaserRatio: PropertyLongString

    /**
     * Main body
     * 
     * 
     * @translatable    true
     */
    mainBody: PropertyXhtmlString

    /**
     * Title
     * 
     * 
     * @translatable    true
     */
    metaTitle: PropertyLongString

    /**
     * Exclude from results
     * This will determine whether or not to show on search
     * 
     * @translatable    true
     */
    excludeFromSearch: PropertyBoolean

    /**
     * Image
     * 
     * 
     * @translatable    false
     */
    pageImage: PropertyContentReference

    /**
     * CSS files
     * 
     * 
     * @translatable    false
     */
    cssFiles: PropertyLinkCollection

    /**
     * Main content area
     * 
     * 
     * @translatable    true
     */
    mainContentArea: PropertyContentArea

    /**
     * Keywords
     * 
     * 
     * @translatable    true
     */
    keywords: PropertyLongString

    /**
     * Hide site header
     * 
     * 
     * @translatable    true
     */
    hideSiteHeader: PropertyBoolean

    /**
     * Video
     * 
     * 
     * @translatable    true
     */
    teaserVideo: PropertyContentReference

    /**
     * CSS
     * 
     * 
     * @translatable    false
     */
    css: PropertyLongString

    /**
     * Top content area
     * 
     * 
     * @translatable    true
     */
    topContentArea: PropertyContentArea

    /**
     * Show recommendations
     * This will determine whether or not to show recommendations
     * 
     * @translatable    true
     */
    showRecommendations: PropertyBoolean

    /**
     * Page description
     * 
     * 
     * @translatable    true
     */
    pageDescription: PropertyLongString

    /**
     * Hide site footer
     * 
     * 
     * @translatable    true
     */
    hideSiteFooter: PropertyBoolean

    /**
     * Text
     * 
     * 
     * @translatable    true
     */
    teaserText: PropertyLongString

    /**
     * Content type
     * 
     * 
     * @translatable    true
     */
    metaContentType: PropertyLongString

    /**
     * Industry
     * 
     * 
     * @translatable    true
     */
    industry: PropertyLongString

    /**
     * Author
     * 
     * 
     * @translatable    true
     */
    authorMetaData: PropertyLongString

    /**
     * Disable indexing
     * 
     * 
     * @translatable    true
     */
    disableIndexing: PropertyBoolean

    /**
     * Highlight in page list
     * 
     * 
     * @translatable    true
     */
    highlight: PropertyBoolean

    /**
     * Text alignment
     * 
     * 
     * @translatable    true
     */
    teaserTextAlignment: PropertyLongString

    /**
     * Color theme
     * 
     * 
     * @translatable    true
     */
    teaserColorTheme: PropertyLongString

    /**
     * Button label
     * 
     * 
     * @translatable    true
     */
    teaserButtonText: PropertyLongString

    /**
     * Button theme
     * 
     * 
     * @translatable    true
     */
    teaserButtonStyle: PropertyLongString

    /**
     * Button color
     * 
     * 
     * @translatable    true
     */
    teaserButtonColor: PropertyLongString

    /**
     * Button text color
     * 
     * 
     * @translatable    true
     */
    teaserButtonTextColor: PropertyLongString

    /**
     * Display hover effect
     * 
     * 
     * @translatable    true
     */
    applyHoverEffect: PropertyBoolean

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString
}

/**
 * Profile Page Landing Page
 * Default standard page that has top content area, main body, and main content area
 *
 * @ContentBase Page
 * @ContentGuid 71f9e8e1-46da-4d40-883f-a1befacaeb88
 */
export type ProfileLandingPage = IContent & {
    /**
     * Categories
     * Categories associated with this content.
     * 
     * @translatable    false
     */
    categories: PropertyContentReferenceList

    /**
     * Teaser ratio (width-height)
     * 
     * 
     * @translatable    true
     */
    teaserRatio: PropertyLongString

    /**
     * Top content area
     * 
     * 
     * @translatable    false
     */
    topContentArea: PropertyContentArea

    /**
     * Main body
     * 
     * 
     * @translatable    true
     */
    mainBody: PropertyXhtmlString

    /**
     * Title
     * 
     * 
     * @translatable    true
     */
    metaTitle: PropertyLongString

    /**
     * Exclude from results
     * This will determine whether or not to show on search
     * 
     * @translatable    true
     */
    excludeFromSearch: PropertyBoolean

    /**
     * Image
     * 
     * 
     * @translatable    false
     */
    pageImage: PropertyContentReference

    /**
     * CSS files
     * 
     * 
     * @translatable    false
     */
    cssFiles: PropertyLinkCollection

    /**
     * Main content area
     * 
     * 
     * @translatable    true
     */
    mainContentArea: PropertyContentArea

    /**
     * Keywords
     * 
     * 
     * @translatable    true
     */
    keywords: PropertyLongString

    /**
     * Hide site header
     * 
     * 
     * @translatable    true
     */
    hideSiteHeader: PropertyBoolean

    /**
     * Video
     * 
     * 
     * @translatable    true
     */
    teaserVideo: PropertyContentReference

    /**
     * CSS
     * 
     * 
     * @translatable    false
     */
    css: PropertyLongString

    /**
     * Page description
     * 
     * 
     * @translatable    true
     */
    pageDescription: PropertyLongString

    /**
     * Hide site footer
     * 
     * 
     * @translatable    true
     */
    hideSiteFooter: PropertyBoolean

    /**
     * Text
     * 
     * 
     * @translatable    true
     */
    teaserText: PropertyLongString

    /**
     * Content type
     * 
     * 
     * @translatable    true
     */
    metaContentType: PropertyLongString

    /**
     * Industry
     * 
     * 
     * @translatable    true
     */
    industry: PropertyLongString

    /**
     * Author
     * 
     * 
     * @translatable    true
     */
    authorMetaData: PropertyLongString

    /**
     * Disable indexing
     * 
     * 
     * @translatable    true
     */
    disableIndexing: PropertyBoolean

    /**
     * Highlight in page list
     * 
     * 
     * @translatable    true
     */
    highlight: PropertyBoolean

    /**
     * Text alignment
     * 
     * 
     * @translatable    true
     */
    teaserTextAlignment: PropertyLongString

    /**
     * Color theme
     * 
     * 
     * @translatable    true
     */
    teaserColorTheme: PropertyLongString

    /**
     * Button label
     * 
     * 
     * @translatable    true
     */
    teaserButtonText: PropertyLongString

    /**
     * Button theme
     * 
     * 
     * @translatable    true
     */
    teaserButtonStyle: PropertyLongString

    /**
     * Button color
     * 
     * 
     * @translatable    true
     */
    teaserButtonColor: PropertyLongString

    /**
     * Button text color
     * 
     * 
     * @translatable    true
     */
    teaserButtonTextColor: PropertyLongString

    /**
     * Display hover effect
     * 
     * 
     * @translatable    true
     */
    applyHoverEffect: PropertyBoolean

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString
}

/**
 * Filter Activities Block
 * Activity facets for locations
 *
 * @ContentBase Block
 * @ContentGuid 918c590e-b2cd-4b87-9116-899b1db19117
 */
export type FilterActivitiesBlock = IContent & {
    /**
     * Categories
     * Categories associated with this content
     * 
     * @translatable    false
     */
    categories: PropertyContentReferenceList

    /**
     * Filter title
     * 
     * 
     * @translatable    true
     */
    filterTitle: PropertyLongString

    /**
     * All condition text
     * 
     * 
     * @translatable    true
     */
    allConditionText: PropertyLongString

    /**
     * Padding
     * 
     * 
     * @translatable    false
     */
    padding: PropertyLongString

    /**
     * Margin
     * 
     * 
     * @translatable    false
     */
    margin: PropertyLongString

    /**
     * Background color
     * 
     * 
     * @translatable    false
     */
    backgroundColor: PropertyLongString

    /**
     * Block opacity (0 to 1)
     * 
     * 
     * @translatable    false
     */
    blockOpacity: PropertyFloatNumber
}

/**
 * TextboxElementBlock
 * 
 *
 * @ContentBase Block
 * @ContentGuid 39547dd4-6045-4eb1-968f-80921bd91e36
 */
export type TextboxElementBlock = IContent & {
    /**
     * Label
     * 
     * 
     * @translatable    true
     */
    label: PropertyLongString

    /**
     * Description
     * 
     * 
     * @translatable    true
     */
    description: PropertyLongString

    /**
     * Validators
     * 
     * 
     * @translatable    false
     */
    validators: PropertyLongString

    /**
     * PlaceHolder
     * 
     * 
     * @translatable    true
     */
    placeHolder: PropertyLongString

    /**
     * PredefinedValue
     * 
     * 
     * @translatable    false
     */
    predefinedValue: PropertyLongString

    /**
     * ValidatorMessages
     * 
     * 
     * @translatable    true
     */
    validatorMessages: PropertyValidatorMessageCollection

    /**
     * SatisfiedAction
     * 
     * 
     * @translatable    false
     */
    satisfiedAction: PropertyLongString

    /**
     * External system field mapping
     * 
     * 
     * @translatable    false
     */
    forms_ExternalSystemsFieldMappings: PropertyFieldMappingCollection

    /**
     * ConditionCombination
     * 
     * 
     * @translatable    false
     */
    conditionCombination: PropertyNumber

    /**
     * Conditions
     * 
     * 
     * @translatable    false
     */
    conditions: PropertyDependencyConditionsList
}

/**
 * TextareaElementBlock
 * 
 *
 * @ContentBase Block
 * @ContentGuid e7f31175-2f9c-4733-8180-8b6512a64a3a
 */
export type TextareaElementBlock = IContent & {
    /**
     * Label
     * 
     * 
     * @translatable    true
     */
    label: PropertyLongString

    /**
     * Description
     * 
     * 
     * @translatable    true
     */
    description: PropertyLongString

    /**
     * Validators
     * 
     * 
     * @translatable    false
     */
    validators: PropertyLongString

    /**
     * PlaceHolder
     * 
     * 
     * @translatable    true
     */
    placeHolder: PropertyLongString

    /**
     * ValidatorMessages
     * 
     * 
     * @translatable    true
     */
    validatorMessages: PropertyValidatorMessageCollection

    /**
     * SatisfiedAction
     * 
     * 
     * @translatable    false
     */
    satisfiedAction: PropertyLongString

    /**
     * External system field mapping
     * 
     * 
     * @translatable    false
     */
    forms_ExternalSystemsFieldMappings: PropertyFieldMappingCollection

    /**
     * ConditionCombination
     * 
     * 
     * @translatable    false
     */
    conditionCombination: PropertyNumber

    /**
     * Conditions
     * 
     * 
     * @translatable    false
     */
    conditions: PropertyDependencyConditionsList
}

/**
 * NumberElementBlock
 * 
 *
 * @ContentBase Block
 * @ContentGuid d2ab34fb-103f-4a0c-9233-1a48e530d9a4
 */
export type NumberElementBlock = IContent & {
    /**
     * Label
     * 
     * 
     * @translatable    true
     */
    label: PropertyLongString

    /**
     * Description
     * 
     * 
     * @translatable    true
     */
    description: PropertyLongString

    /**
     * Validators
     * 
     * 
     * @translatable    false
     */
    validators: PropertyLongString

    /**
     * PlaceHolder
     * 
     * 
     * @translatable    true
     */
    placeHolder: PropertyLongString

    /**
     * ValidatorMessages
     * 
     * 
     * @translatable    true
     */
    validatorMessages: PropertyValidatorMessageCollection

    /**
     * SatisfiedAction
     * 
     * 
     * @translatable    false
     */
    satisfiedAction: PropertyLongString

    /**
     * External system field mapping
     * 
     * 
     * @translatable    false
     */
    forms_ExternalSystemsFieldMappings: PropertyFieldMappingCollection

    /**
     * ConditionCombination
     * 
     * 
     * @translatable    false
     */
    conditionCombination: PropertyNumber

    /**
     * Conditions
     * 
     * 
     * @translatable    false
     */
    conditions: PropertyDependencyConditionsList
}

/**
 * RangeElementBlock
 * 
 *
 * @ContentBase Block
 * @ContentGuid 86bf688b-e61b-4e0a-94ca-715587125494
 */
export type RangeElementBlock = IContent & {
    /**
     * Label
     * 
     * 
     * @translatable    true
     */
    label: PropertyLongString

    /**
     * Description
     * 
     * 
     * @translatable    true
     */
    description: PropertyLongString

    /**
     * Min
     * 
     * 
     * @translatable    false
     */
    min: PropertyNumber

    /**
     * Max
     * 
     * 
     * @translatable    false
     */
    max: PropertyNumber

    /**
     * Step
     * 
     * 
     * @translatable    false
     */
    step: PropertyNumber

    /**
     * PredefinedValue
     * 
     * 
     * @translatable    false
     */
    predefinedValue: PropertyLongString

    /**
     * ValidatorMessages
     * 
     * 
     * @translatable    true
     */
    validatorMessages: PropertyValidatorMessageCollection

    /**
     * SatisfiedAction
     * 
     * 
     * @translatable    false
     */
    satisfiedAction: PropertyLongString

    /**
     * External system field mapping
     * 
     * 
     * @translatable    false
     */
    forms_ExternalSystemsFieldMappings: PropertyFieldMappingCollection

    /**
     * ConditionCombination
     * 
     * 
     * @translatable    false
     */
    conditionCombination: PropertyNumber

    /**
     * Conditions
     * 
     * 
     * @translatable    false
     */
    conditions: PropertyDependencyConditionsList
}

/**
 * UrlElementBlock
 * 
 *
 * @ContentBase Block
 * @ContentGuid dcfc84ca-2f9d-4b51-a792-eaaf7fb8ffea
 */
export type UrlElementBlock = IContent & {
    /**
     * Label
     * 
     * 
     * @translatable    true
     */
    label: PropertyLongString

    /**
     * Description
     * 
     * 
     * @translatable    true
     */
    description: PropertyLongString

    /**
     * Validators
     * 
     * 
     * @translatable    false
     */
    validators: PropertyLongString

    /**
     * PlaceHolder
     * 
     * 
     * @translatable    true
     */
    placeHolder: PropertyLongString

    /**
     * PredefinedValue
     * 
     * 
     * @translatable    false
     */
    predefinedValue: PropertyLongString

    /**
     * ValidatorMessages
     * 
     * 
     * @translatable    true
     */
    validatorMessages: PropertyValidatorMessageCollection

    /**
     * SatisfiedAction
     * 
     * 
     * @translatable    false
     */
    satisfiedAction: PropertyLongString

    /**
     * External system field mapping
     * 
     * 
     * @translatable    false
     */
    forms_ExternalSystemsFieldMappings: PropertyFieldMappingCollection

    /**
     * ConditionCombination
     * 
     * 
     * @translatable    false
     */
    conditionCombination: PropertyNumber

    /**
     * Conditions
     * 
     * 
     * @translatable    false
     */
    conditions: PropertyDependencyConditionsList
}

/**
 * SelectionElementBlock
 * 
 *
 * @ContentBase Block
 * @ContentGuid 21299360-fedd-4978-afcd-ae76991ba63b
 */
export type SelectionElementBlock = IContent & {
    /**
     * Label
     * 
     * 
     * @translatable    true
     */
    label: PropertyLongString

    /**
     * Description
     * 
     * 
     * @translatable    true
     */
    description: PropertyLongString

    /**
     * Validators
     * 
     * 
     * @translatable    false
     */
    validators: PropertyLongString

    /**
     * AllowMultiSelect
     * 
     * 
     * @translatable    false
     */
    allowMultiSelect: PropertyBoolean

    /**
     * Feed
     * 
     * 
     * @translatable    false
     */
    feed: PropertyLongString

    /**
     * Items
     * 
     * 
     * @translatable    false
     */
    items: PropertyOptionList

    /**
     * PlaceHolder
     * 
     * 
     * @translatable    true
     */
    placeHolder: PropertyLongString

    /**
     * ValidatorMessages
     * 
     * 
     * @translatable    true
     */
    validatorMessages: PropertyValidatorMessageCollection

    /**
     * SatisfiedAction
     * 
     * 
     * @translatable    false
     */
    satisfiedAction: PropertyLongString

    /**
     * External system field mapping
     * 
     * 
     * @translatable    false
     */
    forms_ExternalSystemsFieldMappings: PropertyFieldMappingCollection

    /**
     * ConditionCombination
     * 
     * 
     * @translatable    false
     */
    conditionCombination: PropertyNumber

    /**
     * Conditions
     * 
     * 
     * @translatable    false
     */
    conditions: PropertyDependencyConditionsList
}

/**
 * ChoiceElementBlock
 * 
 *
 * @ContentBase Block
 * @ContentGuid 104bba6b-d3de-4806-abe3-02b2cba730ee
 */
export type ChoiceElementBlock = IContent & {
    /**
     * Label
     * 
     * 
     * @translatable    true
     */
    label: PropertyLongString

    /**
     * Description
     * 
     * 
     * @translatable    true
     */
    description: PropertyLongString

    /**
     * Validators
     * 
     * 
     * @translatable    false
     */
    validators: PropertyLongString

    /**
     * AllowMultiSelect
     * 
     * 
     * @translatable    false
     */
    allowMultiSelect: PropertyBoolean

    /**
     * Feed
     * 
     * 
     * @translatable    false
     */
    feed: PropertyLongString

    /**
     * Items
     * 
     * 
     * @translatable    false
     */
    items: PropertyOptionList

    /**
     * ValidatorMessages
     * 
     * 
     * @translatable    true
     */
    validatorMessages: PropertyValidatorMessageCollection

    /**
     * SatisfiedAction
     * 
     * 
     * @translatable    false
     */
    satisfiedAction: PropertyLongString

    /**
     * External system field mapping
     * 
     * 
     * @translatable    false
     */
    forms_ExternalSystemsFieldMappings: PropertyFieldMappingCollection

    /**
     * ConditionCombination
     * 
     * 
     * @translatable    false
     */
    conditionCombination: PropertyNumber

    /**
     * Conditions
     * 
     * 
     * @translatable    false
     */
    conditions: PropertyDependencyConditionsList
}

/**
 * ImageChoiceElementBlock
 * 
 *
 * @ContentBase Block
 * @ContentGuid cb3d3dda-316b-4044-9521-6b05d332722d
 */
export type ImageChoiceElementBlock = IContent & {
    /**
     * Label
     * 
     * 
     * @translatable    true
     */
    label: PropertyLongString

    /**
     * Description
     * 
     * 
     * @translatable    true
     */
    description: PropertyLongString

    /**
     * Validators
     * 
     * 
     * @translatable    false
     */
    validators: PropertyLongString

    /**
     * ShowSelectionInputControl
     * 
     * 
     * @translatable    false
     */
    showSelectionInputControl: PropertyBoolean

    /**
     * AllowMultiSelect
     * 
     * 
     * @translatable    false
     */
    allowMultiSelect: PropertyBoolean

    /**
     * Items
     * 
     * 
     * @translatable    false
     */
    items: PropertyLinkCollection

    /**
     * ValidatorMessages
     * 
     * 
     * @translatable    true
     */
    validatorMessages: PropertyValidatorMessageCollection

    /**
     * SatisfiedAction
     * 
     * 
     * @translatable    false
     */
    satisfiedAction: PropertyLongString

    /**
     * External system field mapping
     * 
     * 
     * @translatable    false
     */
    forms_ExternalSystemsFieldMappings: PropertyFieldMappingCollection

    /**
     * ConditionCombination
     * 
     * 
     * @translatable    false
     */
    conditionCombination: PropertyNumber

    /**
     * Conditions
     * 
     * 
     * @translatable    false
     */
    conditions: PropertyDependencyConditionsList
}

/**
 * FileUploadElementBlock
 * 
 *
 * @ContentBase Block
 * @ContentGuid b2401dfd-e792-4583-a74b-f053ac54a9a6
 */
export type FileUploadElementBlock = IContent & {
    /**
     * Label
     * 
     * 
     * @translatable    true
     */
    label: PropertyLongString

    /**
     * Description
     * 
     * 
     * @translatable    true
     */
    description: PropertyLongString

    /**
     * FileSize
     * 
     * 
     * @translatable    false
     */
    fileSize: PropertyNumber

    /**
     * FileTypes
     * 
     * 
     * @translatable    false
     */
    fileTypes: PropertyLongString

    /**
     * Validators
     * 
     * 
     * @translatable    false
     */
    validators: PropertyLongString

    /**
     * AllowMultiple
     * 
     * 
     * @translatable    false
     */
    allowMultiple: PropertyBoolean

    /**
     * ValidatorMessages
     * 
     * 
     * @translatable    true
     */
    validatorMessages: PropertyValidatorMessageCollection

    /**
     * /episerver/forms/contentediting/fielddependency/satisfiedaction
     * 
     * 
     * @translatable    false
     */
    satisfiedAction: PropertyLongString

    /**
     * /episerver/forms/contentediting/fielddependency/conditioncombination
     * 
     * 
     * @translatable    false
     */
    conditionCombination: PropertyNumber

    /**
     * /episerver/forms/contentediting/fielddependency/fielddependencies
     * 
     * 
     * @translatable    false
     */
    conditions: PropertyDependencyConditionsList
}

/**
 * PredefinedHiddenElementBlock
 * 
 *
 * @ContentBase Block
 * @ContentGuid d08021d2-ffff-4359-9603-3c66d7eb97c6
 */
export type PredefinedHiddenElementBlock = IContent & {
    /**
     * PredefinedValue
     * 
     * 
     * @translatable    false
     */
    predefinedValue: PropertyLongString

    /**
     * ValidatorMessages
     * 
     * 
     * @translatable    true
     */
    validatorMessages: PropertyValidatorMessageCollection

    /**
     * External system field mapping
     * 
     * 
     * @translatable    false
     */
    forms_ExternalSystemsFieldMappings: PropertyFieldMappingCollection
}

/**
 * VisitorDataHiddenElementBlock
 * 
 *
 * @ContentBase Block
 * @ContentGuid d08021d2-f73e-4359-9603-3c66d7eb97c6
 */
export type VisitorDataHiddenElementBlock = IContent & {
    /**
     * VisitorDataSources
     * 
     * 
     * @translatable    false
     */
    visitorDataSources: PropertyLongString

    /**
     * ValidatorMessages
     * 
     * 
     * @translatable    true
     */
    validatorMessages: PropertyValidatorMessageCollection

    /**
     * External system field mapping
     * 
     * 
     * @translatable    false
     */
    forms_ExternalSystemsFieldMappings: PropertyFieldMappingCollection
}

/**
 * CaptchaElementBlock
 * 
 *
 * @ContentBase Block
 * @ContentGuid 0cffa8b6-3c20-4b97-914f-75a624b19bff
 */
export type CaptchaElementBlock = IContent & {
    /**
     * Label
     * 
     * 
     * @translatable    true
     */
    label: PropertyLongString

    /**
     * Description
     * 
     * 
     * @translatable    true
     */
    description: PropertyLongString

    /**
     * Validators
     * 
     * 
     * @translatable    false
     */
    validators: PropertyLongString

    /**
     * ImageWidth
     * 
     * 
     * @translatable    false
     */
    imageWidth: PropertyNumber

    /**
     * ImageHeight
     * 
     * 
     * @translatable    false
     */
    imageHeight: PropertyNumber

    /**
     * TextLength
     * 
     * 
     * @translatable    false
     */
    textLength: PropertyNumber

    /**
     * ValidatorMessages
     * 
     * 
     * @translatable    true
     */
    validatorMessages: PropertyValidatorMessageCollection
}

/**
 * ParagraphTextElementBlock
 * 
 *
 * @ContentBase Block
 * @ContentGuid a917b1ae-738f-416d-b033-7c229559003d
 */
export type ParagraphTextElementBlock = IContent & {
    /**
     * ParagraphText
     * 
     * 
     * @translatable    true
     */
    paragraphText: PropertyXhtmlString

    /**
     * FormSubmissionId
     * 
     * 
     * @translatable    false
     */
    formSubmissionId: PropertyLongString

    /**
     * SatisfiedAction
     * 
     * 
     * @translatable    false
     */
    satisfiedAction: PropertyLongString

    /**
     * ConditionCombination
     * 
     * 
     * @translatable    false
     */
    conditionCombination: PropertyNumber

    /**
     * Conditions
     * 
     * 
     * @translatable    false
     */
    conditions: PropertyDependencyConditionsList

    /**
     * /contenttypes/paragraphtextelementblock/placeholdersetting
     * 
     * 
     * @translatable    false
     */
    disablePlaceholdersReplacement: PropertyBoolean
}

/**
 * FormStepBlock
 * 
 *
 * @ContentBase Block
 * @ContentGuid 4daf691c-1dc9-4182-b04e-f0ed5d449bb9
 */
export type FormStepBlock = IContent & {
    /**
     * Label
     * 
     * 
     * @translatable    true
     */
    label: PropertyLongString

    /**
     * Description
     * 
     * 
     * @translatable    true
     */
    description: PropertyLongString

    /**
     * AttachedContentLink
     * 
     * 
     * @translatable    false
     */
    attachedContentLink: PropertyUrl

    /**
     * DependField
     * 
     * 
     * @translatable    false
     */
    dependField: PropertyContentReference

    /**
     * DependCondition
     * 
     * 
     * @translatable    false
     */
    dependCondition: PropertyNumber

    /**
     * DependValue
     * 
     * 
     * @translatable    false
     */
    dependValue: PropertyLongString
}

/**
 * SubmitButtonElementBlock
 * 
 *
 * @ContentBase Block
 * @ContentGuid ea72a208-1185-4141-a8a6-5febd7f5949a
 */
export type SubmitButtonElementBlock = IContent & {
    /**
     * FinalizeForm
     * 
     * 
     * @translatable    false
     */
    finalizeForm: PropertyBoolean

    /**
     * Label
     * 
     * 
     * @translatable    true
     */
    label: PropertyLongString

    /**
     * Image
     * 
     * 
     * @translatable    false
     */
    image: PropertyUrl

    /**
     * Description
     * 
     * 
     * @translatable    true
     */
    description: PropertyLongString

    /**
     * RedirectToPage
     * 
     * 
     * @translatable    true
     */
    redirectToPage: PropertyUrl

    /**
     * SatisfiedAction
     * 
     * 
     * @translatable    false
     */
    satisfiedAction: PropertyLongString

    /**
     * ConditionCombination
     * 
     * 
     * @translatable    false
     */
    conditionCombination: PropertyNumber

    /**
     * Conditions
     * 
     * 
     * @translatable    false
     */
    conditions: PropertyDependencyConditionsList
}

/**
 * ResetButtonElementBlock
 * 
 *
 * @ContentBase Block
 * @ContentGuid 0bca37fd-ff33-4b6c-9fb3-2ab64b1d0bc2
 */
export type ResetButtonElementBlock = IContent & {
    /**
     * Label
     * 
     * 
     * @translatable    true
     */
    label: PropertyLongString

    /**
     * Description
     * 
     * 
     * @translatable    true
     */
    description: PropertyLongString
}

/**
 * FormContainerBlock
 * 
 *
 * @ContentBase Block
 * @ContentGuid 02ec61ff-819f-4978-add6-a097f5bd944e
 */
export type FormContainerBlock = IContent & {
    /**
     * MetadataAttribute
     * 
     * 
     * @translatable    false
     */
    metadataAttribute: PropertyLongString

    /**
     * Title
     * 
     * 
     * @translatable    true
     */
    title: PropertyLongString

    /**
     * AllowToStoreSubmissionData
     * 
     * 
     * @translatable    false
     */
    allowToStoreSubmissionData: PropertyBoolean

    /**
     * Description
     * 
     * 
     * @translatable    true
     */
    description: PropertyLongString

    /**
     * ShowSummarizedData
     * 
     * 
     * @translatable    false
     */
    showSummarizedData: PropertyBoolean

    /**
     * ConfirmationMessage
     * 
     * 
     * @translatable    true
     */
    confirmationMessage: PropertyLongString

    /**
     * RedirectToPage
     * 
     * 
     * @translatable    true
     */
    redirectToPage: PropertyUrl

    /**
     * SubmitSuccessMessage
     * 
     * 
     * @translatable    true
     */
    submitSuccessMessage: PropertyXhtmlString

    /**
     * AllowAnonymousSubmission
     * 
     * 
     * @translatable    false
     */
    allowAnonymousSubmission: PropertyBoolean

    /**
     * AllowMultipleSubmission
     * 
     * 
     * @translatable    false
     */
    allowMultipleSubmission: PropertyBoolean

    /**
     * ShowNavigationBar
     * 
     * 
     * @translatable    false
     */
    showNavigationBar: PropertyBoolean

    /**
     * AllowExposingDataFeeds
     * 
     * 
     * @translatable    false
     */
    allowExposingDataFeeds: PropertyBoolean

    /**
     * Send email after form submission
     * 
     * 
     * @translatable    false
     */
    sendEmailAfterSubmissionActor: PropertyEmailTemplateActorList

    /**
     * Trigger webhook after form submission
     * 
     * 
     * @translatable    false
     */
    callWebhookAfterSubmissionActor: PropertyWebhookActorList

    /**
     * PartialSubmissionRetentionPeriod
     * 
     * 
     * @translatable    false
     */
    partialSubmissionRetentionPeriod: PropertyLongString

    /**
     * FinalizedSubmissionRetentionPeriod
     * 
     * 
     * @translatable    false
     */
    finalizedSubmissionRetentionPeriod: PropertyLongString

    /**
     * ElementsArea
     * 
     * 
     * @translatable    true
     */
    elementsArea: PropertyContentArea

    /**
     * Connect to Datasource
     * 
     * 
     * @translatable    false
     */
    forms_ConnectedDataSource: PropertyConnectedDataSourceCollection
}

