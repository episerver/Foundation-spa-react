import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Hero Block Callout
 *
 * No Description available.
 *
 * @GUID 7a3c9e9e-8612-4722-b795-2a93cb54a476
 */
export default interface HeroBlockCalloutData extends Taxonomy.IContent {
    /**
     * Text
     *
     * No description available
     */
    calloutContent: ContentDelivery.StringProperty

    /**
     * Text placement
     *
     * No description available
     */
    calloutContentAlignment: ContentDelivery.StringProperty

    /**
     * Text color
     *
     * Sets text color of callout content
     */
    calloutTextColor: ContentDelivery.StringProperty

    /**
     * Background color
     *
     * No description available
     */
    backgroundColor: ContentDelivery.StringProperty

    /**
     * Callout opacity (0 to 1)
     *
     * No description available
     */
    calloutOpacity: ContentDelivery.NumberProperty

    /**
     * Callout position
     *
     * No description available
     */
    calloutPosition: ContentDelivery.StringProperty

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

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface HeroBlockCalloutProps extends ComponentTypes.AbstractComponentProps<HeroBlockCalloutData> {}

export class HeroBlockCalloutType extends Taxonomy.AbstractIContent<HeroBlockCalloutData> implements HeroBlockCalloutData {
    protected _typeName : string = "HeroBlockCallout";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'calloutContent': 'XhtmlString',
        'calloutContentAlignment': 'LongString',
        'calloutTextColor': 'LongString',
        'backgroundColor': 'LongString',
        'calloutOpacity': 'FloatNumber',
        'calloutPosition': 'LongString',
        'padding': 'LongString',
        'margin': 'LongString',
    }

    /**
     * Text
     *
     * No description available
     */
    public get calloutContent() : HeroBlockCalloutData["calloutContent"] { return this.getProperty("calloutContent"); }

    /**
     * Text placement
     *
     * No description available
     */
    public get calloutContentAlignment() : HeroBlockCalloutData["calloutContentAlignment"] { return this.getProperty("calloutContentAlignment"); }

    /**
     * Text color
     *
     * Sets text color of callout content
     */
    public get calloutTextColor() : HeroBlockCalloutData["calloutTextColor"] { return this.getProperty("calloutTextColor"); }

    /**
     * Background color
     *
     * No description available
     */
    public get backgroundColor() : HeroBlockCalloutData["backgroundColor"] { return this.getProperty("backgroundColor"); }

    /**
     * Callout opacity (0 to 1)
     *
     * No description available
     */
    public get calloutOpacity() : HeroBlockCalloutData["calloutOpacity"] { return this.getProperty("calloutOpacity"); }

    /**
     * Callout position
     *
     * No description available
     */
    public get calloutPosition() : HeroBlockCalloutData["calloutPosition"] { return this.getProperty("calloutPosition"); }

    /**
     * Padding
     *
     * No description available
     */
    public get padding() : HeroBlockCalloutData["padding"] { return this.getProperty("padding"); }

    /**
     * Margin
     *
     * No description available
     */
    public get margin() : HeroBlockCalloutData["margin"] { return this.getProperty("margin"); }

}
