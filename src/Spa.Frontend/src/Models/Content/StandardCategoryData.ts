import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'episerver/Property'
import IContent, { BaseIContent } from 'episerver/Models/IContent'
import ContentLink from 'episerver/Models/ContentLink'
import { ComponentProps } from 'episerver/EpiComponent'

/**
 * Standard Category
 *
 * Used to categorize content
 *
 * @GUID a9bbd7fc-27c5-4718-890a-e28acbe5ee26
 */
export default interface StandardCategoryData extends IContent {
    /**
     * Description
     *
     * No description available
     */
    description: StringProperty

    /**
     * IsSelectable
     *
     * No description available
     */
    isSelectable: BooleanProperty

    /**
     * Hide site header
     *
     * No description available
     */
    hideSiteHeader: BooleanProperty

    /**
     * Hide site footer
     *
     * No description available
     */
    hideSiteFooter: BooleanProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface StandardCategoryProps extends ComponentProps<StandardCategoryData> {}

export class StandardCategoryType extends BaseIContent<StandardCategoryData> implements StandardCategoryData {
    protected _typeName : string = "StandardCategory";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'description': 'LongString',
        'isSelectable': 'Boolean',
        'hideSiteHeader': 'Boolean',
        'hideSiteFooter': 'Boolean',
    }

    /**
     * Description
     *
     * No description available
     */
    public description: StringProperty;

    /**
     * IsSelectable
     *
     * No description available
     */
    public isSelectable: BooleanProperty;

    /**
     * Hide site header
     *
     * No description available
     */
    public hideSiteHeader: BooleanProperty;

    /**
     * Hide site footer
     *
     * No description available
     */
    public hideSiteFooter: BooleanProperty;

}
