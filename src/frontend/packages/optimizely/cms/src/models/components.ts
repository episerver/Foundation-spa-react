import type { ComponentType } from 'react'
import type { IContent, IContentData } from './icontent'
import type { IContentDeliveryAPI } from '../content-delivery'
import type { ComponentLoader } from '../loader/types'

export type GetStaticPropsContext = {
    api: IContentDeliveryAPI
    locale ?: string
    inEditMode?: boolean
    loader?: ComponentLoader
}
export type GetDynamicPropsContext = {
    api: IContentDeliveryAPI
    locale ?: string
    inEditMode?: boolean
}
export type GetContentFieldsContext = {
    inEditMode?: boolean
}
export type WithSwrFallback<T> = T & {
    fallback?: Record<string, any>
}

export type IContentComponentProps<ICT extends IContent = IContentData, AP = any> = {
    content?: ICT,
    locale?: string,
} & Partial<AP> & {
    [ key: string ]: any
}

export type IContentFieldFilter<ICT extends IContent = IContentData> = (keyof ICT)[] | undefined

export type IContentComponent<ICT extends IContent = IContentData, AP = any> = ComponentType<IContentComponentProps<ICT, AP>> & {
    /**
     * Helper method that can be invoked on the actual component to fetch the additional
     * properties that it needs for static site generation, based upon the content item
     * given.
     * 
     * Example: Pre-Fetch locations on a store/office locator. The properties resulting
     * from this method will be given to the component while rendering.
     * 
     * @param       content     The content item to get the static props for
     * @param       context     The context to use when building the static props
     * @returns     The pre-rendering props
     */
    getStaticProps ?: (content: ICT, context: GetStaticPropsContext ) => Promise<WithSwrFallback<AP>>

    /**
     * Helper method that can be invoked on the actual component to fetch the additional
     * properties that it needs for server side rendering / client side rendering, based 
     * upon the content item given.
     * 
     * Example: Fetching data for the current context
     * 
     * @param       content     The content item to get the static props for
     * @param       context     The context to use when building the static props
     * @returns     The pre-rendering props
     */
    getDynamicProps ?: (content: ICT, context: GetDynamicPropsContext ) => Promise<AP>

    /**
     * Helper method that can be invoked to filter the data that is made available to the
     * presenation layer AFTER it has been loaded from the CMS. This method is used by the
     * helpers to minimize the data provided to the frontend.
     * 
     * @param       context     The context to use when building the fields list
     * @returns     The fields to select OR undefined if no filtering should occur
     */
    getContentFields ?: (context?: GetContentFieldsContext) => IContentFieldFilter<ICT> | Promise<IContentFieldFilter<ICT>>
}