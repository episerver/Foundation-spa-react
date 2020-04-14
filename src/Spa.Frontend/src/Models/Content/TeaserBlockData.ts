import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

/**
 * Teaser Block
 *
 * Image block with overlay for text
 *
 * @GUID eb67a99a-e239-41b8-9c59-20eaa5936047
 */
export default interface TeaserBlockData extends IContent {
    /**
     * Categories
     *
     * Categories associated with this content
     */
    categories: Property<Array<ContentLink>>

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

    /**
     * Background color
     *
     * No description available
     */
    backgroundColor: StringProperty

    /**
     * Block opacity (0 to 1)
     *
     * No description available
     */
    blockOpacity: NumberProperty

    /**
     * Heading
     *
     * No description available
     */
    heading: StringProperty

    /**
     * Heading size
     *
     * No description available
     */
    headingSize: NumberProperty

    /**
     * Heading style
     *
     * No description available
     */
    headingStyle: StringProperty

    /**
     * Description
     *
     * No description available
     */
    description: StringProperty

    /**
     * Text
     *
     * No description available
     */
    text: StringProperty

    /**
     * Image
     *
     * No description available
     */
    image: ContentReferenceProperty

    /**
     * SecondImage
     *
     * No description available
     */
    secondImage: ContentReferenceProperty

    /**
     * Image size (%)
     *
     * No description available
     */
    imageSize: NumberProperty

    /**
     * Second Image size (%)
     *
     * No description available
     */
    secondImageSize: NumberProperty

    /**
     * Text color
     *
     * No description available
     */
    textColor: StringProperty

    /**
     * Heading color
     *
     * No description available
     */
    headingColor: StringProperty

    /**
     * Elements order
     *
     * No description available
     */
    elementsOrder: StringProperty

    /**
     * Elements alignment (except Text)
     *
     * No description available
     */
    elementsAlignment: StringProperty

    /**
     * Link
     *
     * No description available
     */
    link: ContentReferenceProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface TeaserBlockProps extends ComponentProps<TeaserBlockData> {}
