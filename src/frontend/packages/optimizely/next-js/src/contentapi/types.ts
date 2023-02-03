import type { ComponentType } from 'react'
import type { IContentData, ContentTypePath } from '@optimizely/cms/models'

/**
 * Type definition for components presenting data retrieved from the Optimizely ContentDelivery API
 * this includes the means to load additional properties, based upon the content item resolved from
 * routing by Next.JS
 */
export type ContentApiComponent<ContentModel extends IContentData = IContentData, AdditionalProps = {}> = 
    ComponentType<ContentApiProps<ContentModel, AdditionalProps>>

/**
 * Property definition for a ContentApiComponent, including the additional properties retrieved through
 * the 'loadAdditionalProps' method.
 */
export type ContentApiProps<ContentModel extends IContentData = IContentData, AdditionalProps = {}> = {
    contentType: ContentTypePath
    content: ContentModel
    contentId: string
} & AdditionalProps

/**
 * Module defintion for modules containing ContentApiComponents
 */
export type ContentApiComponentModule<ContentModel extends IContentData = IContentData, AdditionalProps = {}> = {
    default: ContentApiComponent<ContentModel, AdditionalProps>

    /**
     * Asynchronous method for loading additional component properties for this content item, so
     * it can be fully server-side rendered
     */
    loadAdditionalProps ?: (forItem: ContentModel) => Promise<AdditionalProps | null>
}

/**
 * Shorthand for the component
 */
export type CAC = ContentApiComponent