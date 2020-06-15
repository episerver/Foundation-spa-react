import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from '@episerver/spa-core/Property'
import IContent, { BaseIContent } from '@episerver/spa-core/Models/IContent'
import ContentLink from '@episerver/spa-core/Models/ContentLink'
import { ComponentProps } from '@episerver/spa-core/EpiComponent'

/**
 * SysRecycleBin
 *
 * Used as recycle bin for the website
 *
 * @GUID 4eea90cd-4210-4115-a399-6d6915554e10
 */
export default interface SysRecycleBinData extends IContent {
}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface SysRecycleBinProps extends ComponentProps<SysRecycleBinData> {}

export class SysRecycleBinType extends BaseIContent<SysRecycleBinData> implements SysRecycleBinData {
    protected _typeName : string = "SysRecycleBin";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
    }

}
