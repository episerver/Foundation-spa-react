import { Taxonomy, ContentDelivery as CD } from '@episerver/spa-core';

export type IContentWithTeaser<T extends Taxonomy.IContent = Taxonomy.IContent> = T & {
    /**
     * Image
     *
     * No description available
     */
    pageImage: CD.ContentReferenceProperty

    /**
     * Teaser ratio (width-height)
     *
     * No description available
     */
    teaserRatio: CD.StringProperty

    /**
     * Video
     *
     * No description available
     */
    teaserVideo: CD.ContentReferenceProperty

    /**
     * Text
     *
     * No description available
     */
    teaserText: CD.StringProperty

    /**
     * Text alignment
     *
     * No description available
     */
    teaserTextAlignment: CD.StringProperty

    /**
     * Color theme
     *
     * No description available
     */
    teaserColorTheme: CD.StringProperty

    /**
     * Button label
     *
     * No description available
     */
    teaserButtonText: CD.StringProperty

    /**
     * Button theme
     *
     * No description available
     */
    teaserButtonStyle: CD.StringProperty
}

export function isIContentWithTeaser(contentItem : Taxonomy.IContent|IContentWithTeaser) : contentItem is IContentWithTeaser
{
    if ((contentItem as IContentWithTeaser)?.pageImage) {
        return true;
    }
    return false;
}

export default IContentWithTeaser;