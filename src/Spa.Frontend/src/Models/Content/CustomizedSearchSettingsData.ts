import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

/**
 * CustomizedSearchSettings
 *
 * No Description available.
 *
 * @GUID df11dc77-d4ea-4383-be7c-fcd13ac5beba
 */
export default interface CustomizedSearchSettingsData extends IContent {
    /**
     * SearchPhrase
     *
     * No description available
     */
    searchPhrase: StringProperty

    /**
     * UseAndBetweenWords
     *
     * No description available
     */
    useAndBetweenWords: BooleanProperty

    /**
     * NumberOfHits
     *
     * No description available
     */
    numberOfHits: NumberProperty

    /**
     * IncludeDescription
     *
     * No description available
     */
    includeDescription: BooleanProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface CustomizedSearchSettingsProps extends ComponentProps<CustomizedSearchSettingsData> {}
