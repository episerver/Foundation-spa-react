import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from '@episerver/spa-core/Property'
import IContent, { BaseIContent } from '@episerver/spa-core/Models/IContent'
import ContentLink from '@episerver/spa-core/Models/ContentLink'
import { ComponentProps } from '@episerver/spa-core/EpiComponent'

/**
 * ResetButtonElementBlock
 *
 * No Description available.
 *
 * @GUID 0bca37fd-ff33-4b6c-9fb3-2ab64b1d0bc2
 */
export default interface ResetButtonElementBlockData extends IContent {
    /**
     * Label
     *
     * No description available
     */
    label: StringProperty

    /**
     * Description
     *
     * No description available
     */
    description: StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface ResetButtonElementBlockProps extends ComponentProps<ResetButtonElementBlockData> {}

export class ResetButtonElementBlockType extends BaseIContent<ResetButtonElementBlockData> implements ResetButtonElementBlockData {
    protected _typeName : string = "ResetButtonElementBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'label': 'LongString',
        'description': 'LongString',
    }

    /**
     * Label
     *
     * No description available
     */
    public label: StringProperty;

    /**
     * Description
     *
     * No description available
     */
    public description: StringProperty;

}
