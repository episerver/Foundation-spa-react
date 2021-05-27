import CustomizedSearchAdvancedSettingsData from './CustomizedSearchAdvancedSettingsData'
import CustomizedSearchSettingsData from './CustomizedSearchSettingsData'
import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * CustomizedSearchBlock
 *
 * No Description available.
 *
 * @GUID 3a263af2-79d9-4275-ad15-3c3187c89870
 */
export default interface CustomizedSearchBlockData extends Taxonomy.IContent {
    /**
     * Heading
     *
     * No description available
     */
    heading: ContentDelivery.StringProperty

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
export interface CustomizedSearchBlockProps extends ComponentTypes.AbstractComponentProps<CustomizedSearchBlockData> {}

export class CustomizedSearchBlockType extends Taxonomy.AbstractIContent<CustomizedSearchBlockData> implements CustomizedSearchBlockData {
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
    public get heading() : CustomizedSearchBlockData["heading"] { return this.getProperty("heading"); }

    /**
     * CustomizedSearchSettings
     *
     * No description available
     */
    public get customizedSearchSettings() : CustomizedSearchBlockData["customizedSearchSettings"] { return this.getProperty("customizedSearchSettings"); }

    /**
     * CustomizedSearchAdvancedSettings
     *
     * No description available
     */
    public get customizedSearchAdvancedSettings() : CustomizedSearchBlockData["customizedSearchAdvancedSettings"] { return this.getProperty("customizedSearchAdvancedSettings"); }

}
