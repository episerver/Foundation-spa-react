import CustomizedSearchAdvancedSettingsData from './CustomizedSearchAdvancedSettingsData'
import CustomizedSearchSettingsData from './CustomizedSearchSettingsData'
import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from '@episerver/spa-core/Property'
import IContent, { BaseIContent } from '@episerver/spa-core/Models/IContent'
import ContentLink from '@episerver/spa-core/Models/ContentLink'
import { ComponentProps } from '@episerver/spa-core/EpiComponent'

/**
 * CustomizedSearchBlock
 *
 * No Description available.
 *
 * @GUID 3a263af2-79d9-4275-ad15-3c3187c89870
 */
export default interface CustomizedSearchBlockData extends IContent {
    /**
     * Heading
     *
     * No description available
     */
    heading: StringProperty

    /**
     * CustomizedSearchSettings
     *
     * No description available
     */
    customizedSearchSettings: CustomizedSearchSettingsData

    /**
     * CustomizedSearchAdvancedSettings
     *
     * No description available
     */
    customizedSearchAdvancedSettings: CustomizedSearchAdvancedSettingsData

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface CustomizedSearchBlockProps extends ComponentProps<CustomizedSearchBlockData> {}

export class CustomizedSearchBlockType extends BaseIContent<CustomizedSearchBlockData> implements CustomizedSearchBlockData {
    protected _typeName : string = "CustomizedSearchBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'heading': 'LongString',
        'customizedSearchSettings': 'CustomizedSearchSettings',
        'customizedSearchAdvancedSettings': 'CustomizedSearchAdvancedSettings',
    }

    /**
     * Heading
     *
     * No description available
     */
    public heading: StringProperty;

    /**
     * CustomizedSearchSettings
     *
     * No description available
     */
    public customizedSearchSettings: CustomizedSearchSettingsData;

    /**
     * CustomizedSearchAdvancedSettings
     *
     * No description available
     */
    public customizedSearchAdvancedSettings: CustomizedSearchAdvancedSettingsData;

}
