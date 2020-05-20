import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'episerver/Property'
import IContent, { BaseIContent } from 'episerver/Models/IContent'
import ContentLink from 'episerver/Models/ContentLink'
import { ComponentProps } from 'episerver/EpiComponent'

/**
 * CategoryRoot
 *
 * No Description available.
 *
 * @GUID c29bf090-05bf-43eb-98d6-91575bce4441
 */
export default interface CategoryRootData extends IContent {
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

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface CategoryRootProps extends ComponentProps<CategoryRootData> {}

export class CategoryRootType extends BaseIContent<CategoryRootData> implements CategoryRootData {
    protected _typeName : string = "CategoryRoot";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'description': 'LongString',
        'isSelectable': 'Boolean',
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

}
