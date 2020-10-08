import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Content Recommendations Block
 *
 * List of content recommendations based on topic interests
 *
 * @GUID 41ccc1ee-68ac-48f9-804b-b9a4054aeaa4
 */
export default interface ContentRecommendationsBlockData extends Taxonomy.IContent {
    /**
     * Number of recommendations
     *
     * No description available
     */
    numberOfRecommendations: ContentDelivery.NumberProperty

    /**
     * Delivery Widget
     *
     * No description available
     */
    deliveryAPIKey: ContentDelivery.StringProperty

    /**
     * Recommendations Template
     *
     * No description available
     */
    recommendationsTemplate: ContentDelivery.StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface ContentRecommendationsBlockProps extends ComponentTypes.AbstractComponentProps<ContentRecommendationsBlockData> {}

export class ContentRecommendationsBlockType extends Taxonomy.AbstractIContent<ContentRecommendationsBlockData> implements ContentRecommendationsBlockData {
    protected _typeName : string = "ContentRecommendationsBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'numberOfRecommendations': 'Number',
        'deliveryAPIKey': 'LongString',
        'recommendationsTemplate': 'LongString',
    }

    /**
     * Number of recommendations
     *
     * No description available
     */
    public get numberOfRecommendations() : ContentRecommendationsBlockData["numberOfRecommendations"] { return this.getProperty("numberOfRecommendations"); }

    /**
     * Delivery Widget
     *
     * No description available
     */
    public get deliveryAPIKey() : ContentRecommendationsBlockData["deliveryAPIKey"] { return this.getProperty("deliveryAPIKey"); }

    /**
     * Recommendations Template
     *
     * No description available
     */
    public get recommendationsTemplate() : ContentRecommendationsBlockData["recommendationsTemplate"] { return this.getProperty("recommendationsTemplate"); }

}
