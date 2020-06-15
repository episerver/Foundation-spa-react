import { StringProperty, ContentReferenceProperty } from '@episerver/spa-core/Property'
import IContent from '@episerver/spa-core/Models/IContent'

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

export function isIContentWithTeaser(contentItem : IContent|IContentWithTeaser) : contentItem is IContentWithTeaser
{
    if ((contentItem as IContentWithTeaser)?.pageImage) {
        return true;
    }
    return false;
}