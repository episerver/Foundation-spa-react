import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'episerver/Property'
import IContent, { BaseIContent } from 'episerver/Models/IContent'
import ContentLink from 'episerver/Models/ContentLink'
import { ComponentProps } from 'episerver/EpiComponent'

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

export class CustomizedSearchSettingsType extends BaseIContent<CustomizedSearchSettingsData> implements CustomizedSearchSettingsData {
    protected _typeName : string = "CustomizedSearchSettings";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'searchPhrase': 'LongString',
        'useAndBetweenWords': 'Boolean',
        'numberOfHits': 'Number',
        'includeDescription': 'Boolean',
    }

    /**
     * SearchPhrase
     *
     * No description available
     */
    public searchPhrase: StringProperty;

    /**
     * UseAndBetweenWords
     *
     * No description available
     */
    public useAndBetweenWords: BooleanProperty;

    /**
     * NumberOfHits
     *
     * No description available
     */
    public numberOfHits: NumberProperty;

    /**
     * IncludeDescription
     *
     * No description available
     */
    public includeDescription: BooleanProperty;

}
