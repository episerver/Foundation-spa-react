import CustomizedSearchAdvancedSettingsData from './CustomizedSearchAdvancedSettingsData'
import CustomizedSearchSettingsData from './CustomizedSearchSettingsData'
import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

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
