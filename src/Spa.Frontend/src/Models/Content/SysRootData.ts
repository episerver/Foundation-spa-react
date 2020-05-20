import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'episerver/Property'
import IContent, { BaseIContent } from 'episerver/Models/IContent'
import ContentLink from 'episerver/Models/ContentLink'
import { ComponentProps } from 'episerver/EpiComponent'

/**
 * SysRoot
 *
 * Used as root/welcome page
 *
 * @GUID 3fa7d9e7-877b-11d3-827c-00a024cacfcb
 */
export default interface SysRootData extends IContent {
}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface SysRootProps extends ComponentProps<SysRootData> {}

export class SysRootType extends BaseIContent<SysRootData> implements SysRootData {
    protected _typeName : string = "SysRoot";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
    }

}
