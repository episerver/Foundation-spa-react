import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

/**
 * Recent Page Category Recommendation Block
 *
 * Block that show recommendations based on selected recent page category
 *
 * @GUID d1728a48-764a-4a02-bfb6-4e004fb4ac92
 */
export default interface RecentPageCategoryRecommendationBlockData extends IContent {
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
     * Number of recommendations
     *
     * No description available
     */
    numberOfRecommendations: NumberProperty

    /**
     * Filter root
     *
     * No description available
     */
    filterRoot: ContentReferenceProperty

    /**
     * Filter types
     *
     * No description available
     */
    filterTypes: StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface RecentPageCategoryRecommendationBlockProps extends ComponentProps<RecentPageCategoryRecommendationBlockData> {}
