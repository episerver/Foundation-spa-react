import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

/**
 * ImageMediaData
 *
 * No Description available.
 *
 * @GUID 20644be7-3ca1-4f84-b893-ee021b73ce6c
 */
export default interface ImageMediaDataData extends IContent {
    /**
     * Large thumbnail
     *
     * No description available
     */
    largeThumbnail: Property<any> // Original type: Blob

    /**
     * File size
     *
     * No description available
     */
    fileSize: StringProperty

    /**
     * Accent color
     *
     * No description available
     */
    accentColor: StringProperty

    /**
     * Caption
     *
     * No description available
     */
    caption: StringProperty

    /**
     * Clip art type
     *
     * No description available
     */
    clipArtType: StringProperty

    /**
     * Dominant color background
     *
     * No description available
     */
    dominantColorBackground: StringProperty

    /**
     * Dominant color foreground
     *
     * No description available
     */
    dominantColorForeground: StringProperty

    /**
     * Dominant colors
     *
     * No description available
     */
    dominantColors: Property<any> // Original type: StringList

    /**
     * Image categories
     *
     * No description available
     */
    imageCategories: Property<any> // Original type: StringList

    /**
     * Is adult content
     *
     * No description available
     */
    isAdultContent: BooleanProperty

    /**
     * Is black & white image
     *
     * No description available
     */
    isBwImg: BooleanProperty

    /**
     * Is racy content
     *
     * No description available
     */
    isRacyContent: BooleanProperty

    /**
     * Line drawing type
     *
     * No description available
     */
    lineDrawingType: StringProperty

    /**
     * Tags
     *
     * No description available
     */
    tags: Property<any> // Original type: StringList

    /**
     * Title
     *
     * No description available
     */
    title: StringProperty

    /**
     * Description
     *
     * Description of the image
     */
    description: StringProperty

    /**
     * Alternate text
     *
     * No description available
     */
    altText: StringProperty

    /**
     * Credits text
     *
     * No description available
     */
    creditsText: StringProperty

    /**
     * Credits link
     *
     * No description available
     */
    creditsLink: StringProperty

    /**
     * Link
     *
     * Link to content
     */
    link: ContentReferenceProperty

    /**
     * Copyright
     *
     * No description available
     */
    copyright: StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface ImageMediaDataProps extends ComponentProps<ImageMediaDataData> {}
