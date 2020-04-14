import { StringProperty, ContentReferenceProperty } from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'

export default interface IContentWithTeaser extends IContent
{
    /**
     * Image
     *
     * No description available
     */
    pageImage: ContentReferenceProperty

    /**
     * Teaser ratio (width-height)
     *
     * No description available
     */
    teaserRatio: StringProperty

    /**
     * Video
     *
     * No description available
     */
    teaserVideo: ContentReferenceProperty

    /**
     * Text
     *
     * No description available
     */
    teaserText: StringProperty

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
}