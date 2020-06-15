import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from '@episerver/spa-core/Property'
import IContent, { BaseIContent } from '@episerver/spa-core/Models/IContent'
import ContentLink from '@episerver/spa-core/Models/ContentLink'
import { ComponentProps } from '@episerver/spa-core/EpiComponent'

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

export class RecentPageCategoryRecommendationBlockType extends BaseIContent<RecentPageCategoryRecommendationBlockData> implements RecentPageCategoryRecommendationBlockData {
    protected _typeName : string = "RecentPageCategoryRecommendationBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'categories': 'ContentReferenceList',
        'padding': 'LongString',
        'margin': 'LongString',
        'backgroundColor': 'LongString',
        'blockOpacity': 'FloatNumber',
        'numberOfRecommendations': 'Number',
        'filterRoot': 'ContentReference',
        'filterTypes': 'LongString',
    }

    /**
     * Categories
     *
     * Categories associated with this content
     */
    public categories: Property<Array<ContentLink>>;

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

    /**
     * Background color
     *
     * No description available
     */
    public backgroundColor: StringProperty;

    /**
     * Block opacity (0 to 1)
     *
     * No description available
     */
    public blockOpacity: NumberProperty;

    /**
     * Number of recommendations
     *
     * No description available
     */
    public numberOfRecommendations: NumberProperty;

    /**
     * Filter root
     *
     * No description available
     */
    public filterRoot: ContentReferenceProperty;

    /**
     * Filter types
     *
     * No description available
     */
    public filterTypes: StringProperty;

}
