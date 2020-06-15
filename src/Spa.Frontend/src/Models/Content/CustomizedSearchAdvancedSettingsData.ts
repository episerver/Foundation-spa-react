import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from '@episerver/spa-core/Property'
import IContent, { BaseIContent } from '@episerver/spa-core/Models/IContent'
import ContentLink from '@episerver/spa-core/Models/ContentLink'
import { ComponentProps } from '@episerver/spa-core/EpiComponent'

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

export class CustomizedSearchAdvancedSettingsType extends BaseIContent<CustomizedSearchAdvancedSettingsData> implements CustomizedSearchAdvancedSettingsData {
    protected _typeName : string = "CustomizedSearchAdvancedSettings";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'rootContent': 'ContentReference',
        'contentTypes': 'LongString',
        'includeBestBets': 'Boolean',
        'useSynonyms': 'Boolean',
    }

    /**
     * RootContent
     *
     * No description available
     */
    public rootContent: ContentReferenceProperty;

    /**
     * ContentTypes
     *
     * No description available
     */
    public contentTypes: StringProperty;

    /**
     * IncludeBestBets
     *
     * No description available
     */
    public includeBestBets: BooleanProperty;

    /**
     * UseSynonyms
     *
     * No description available
     */
    public useSynonyms: BooleanProperty;

}
