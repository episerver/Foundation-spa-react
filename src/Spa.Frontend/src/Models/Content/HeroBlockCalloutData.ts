import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'episerver/Property'
import IContent, { BaseIContent } from 'episerver/Models/IContent'
import ContentLink from 'episerver/Models/ContentLink'
import { ComponentProps } from 'episerver/EpiComponent'

/**
 * Hero Block Callout
 *
 * No Description available.
 *
 * @GUID 7a3c9e9e-8612-4722-b795-2a93cb54a476
 */
export default interface HeroBlockCalloutData extends IContent {
    /**
     * Text
     *
     * No description available
     */
    calloutContent: StringProperty

    /**
     * Text placement
     *
     * No description available
     */
    calloutContentAlignment: StringProperty

    /**
     * Text color
     *
     * Sets text color of callout content
     */
    calloutTextColor: StringProperty

    /**
     * Background color
     *
     * No description available
     */
    backgroundColor: StringProperty

    /**
     * Callout opacity (0 to 1)
     *
     * No description available
     */
    calloutOpacity: NumberProperty

    /**
     * Callout position
     *
     * No description available
     */
    calloutPosition: StringProperty

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

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface HeroBlockCalloutProps extends ComponentProps<HeroBlockCalloutData> {}

export class HeroBlockCalloutType extends BaseIContent<HeroBlockCalloutData> implements HeroBlockCalloutData {
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
    public calloutContent: StringProperty;

    /**
     * Text placement
     *
     * No description available
     */
    public calloutContentAlignment: StringProperty;

    /**
     * Text color
     *
     * Sets text color of callout content
     */
    public calloutTextColor: StringProperty;

    /**
     * Background color
     *
     * No description available
     */
    public backgroundColor: StringProperty;

    /**
     * Callout opacity (0 to 1)
     *
     * No description available
     */
    public calloutOpacity: NumberProperty;

    /**
     * Callout position
     *
     * No description available
     */
    public calloutPosition: StringProperty;

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

}
