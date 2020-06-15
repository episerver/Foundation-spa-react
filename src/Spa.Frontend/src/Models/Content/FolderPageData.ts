import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from '@episerver/spa-core/Property'
import IContent, { BaseIContent } from '@episerver/spa-core/Models/IContent'
import ContentLink from '@episerver/spa-core/Models/ContentLink'
import { ComponentProps } from '@episerver/spa-core/EpiComponent'

/**
 * Folder Page
 *
 * A page which allows you to structure pages.
 *
 * @GUID 1bc8e78b-40cc-4efc-a561-a0bba89b51ac
 */
export default interface FolderPageData extends IContent {
}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface FolderPageProps extends ComponentProps<FolderPageData> {}

export class FolderPageType extends BaseIContent<FolderPageData> implements FolderPageData {
    protected _typeName : string = "FolderPage";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
    }

}
