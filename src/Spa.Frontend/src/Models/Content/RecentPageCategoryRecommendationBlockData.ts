import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Recent Page Category Recommendation Block
 *
 * Block that show recommendations based on selected recent page category
 *
 * @GUID d1728a48-764a-4a02-bfb6-4e004fb4ac92
 */
export default interface RecentPageCategoryRecommendationBlockData extends Taxonomy.IContent {
    /**
     * Categories
     *
     * Categories associated with this content
     */
    categories: ContentDelivery.ContentReferenceListProperty

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

    /**
     * Background color
     *
     * No description available
     */
    backgroundColor: ContentDelivery.StringProperty

    /**
     * Block opacity (0 to 1)
     *
     * No description available
     */
    blockOpacity: ContentDelivery.NumberProperty

    /**
     * Number of recommendations
     *
     * No description available
     */
    numberOfRecommendations: ContentDelivery.NumberProperty

    /**
     * Filter root
     *
     * No description available
     */
    filterRoot: ContentDelivery.ContentReferenceProperty

    /**
     * Filter types
     *
     * No description available
     */
    filterTypes: ContentDelivery.StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface RecentPageCategoryRecommendationBlockProps extends ComponentTypes.AbstractComponentProps<RecentPageCategoryRecommendationBlockData> {}

export class RecentPageCategoryRecommendationBlockType extends Taxonomy.AbstractIContent<RecentPageCategoryRecommendationBlockData> implements RecentPageCategoryRecommendationBlockData {
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
    public get categories() : RecentPageCategoryRecommendationBlockData["categories"] { return this.getProperty("categories"); }

    /**
     * Padding
     *
     * No description available
     */
    public get padding() : RecentPageCategoryRecommendationBlockData["padding"] { return this.getProperty("padding"); }

    /**
     * Margin
     *
     * No description available
     */
    public get margin() : RecentPageCategoryRecommendationBlockData["margin"] { return this.getProperty("margin"); }

    /**
     * Background color
     *
     * No description available
     */
    public get backgroundColor() : RecentPageCategoryRecommendationBlockData["backgroundColor"] { return this.getProperty("backgroundColor"); }

    /**
     * Block opacity (0 to 1)
     *
     * No description available
     */
    public get blockOpacity() : RecentPageCategoryRecommendationBlockData["blockOpacity"] { return this.getProperty("blockOpacity"); }

    /**
     * Number of recommendations
     *
     * No description available
     */
    public get numberOfRecommendations() : RecentPageCategoryRecommendationBlockData["numberOfRecommendations"] { return this.getProperty("numberOfRecommendations"); }

    /**
     * Filter root
     *
     * No description available
     */
    public get filterRoot() : RecentPageCategoryRecommendationBlockData["filterRoot"] { return this.getProperty("filterRoot"); }

    /**
     * Filter types
     *
     * No description available
     */
    public get filterTypes() : RecentPageCategoryRecommendationBlockData["filterTypes"] { return this.getProperty("filterTypes"); }

}
