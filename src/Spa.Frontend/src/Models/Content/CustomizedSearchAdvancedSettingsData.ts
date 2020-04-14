import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

/**
 * CustomizedSearchAdvancedSettings
 *
 * No Description available.
 *
 * @GUID 5e333241-f873-4092-9947-8b573ac0ffde
 */
export default interface CustomizedSearchAdvancedSettingsData extends IContent {
    /**
     * RootContent
     *
     * No description available
     */
    rootContent: ContentReferenceProperty

    /**
     * ContentTypes
     *
     * No description available
     */
    contentTypes: StringProperty

    /**
     * IncludeBestBets
     *
     * No description available
     */
    includeBestBets: BooleanProperty

    /**
     * UseSynonyms
     *
     * No description available
     */
    useSynonyms: BooleanProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface CustomizedSearchAdvancedSettingsProps extends ComponentProps<CustomizedSearchAdvancedSettingsData> {}
