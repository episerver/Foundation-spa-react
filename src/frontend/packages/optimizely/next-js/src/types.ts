import type { ComponentType } from "react"
import type { User, Profile, Account } from "next-auth"

export type OptimizelyComponentProps<ContentModel = {}> = {
    content: ContentModel
    contentType: string[]
    contentId: string | number
}

export type OptimizelyQueryResponse<ContentModel = {}, AdditionalQueries = {}> = {
    content: ContentModel
} & AdditionalQueries

export type OptimizelyComponentModule<ContentModel = {}> = {
    /**
     * The default export of an OptimizelyComponentModule must be
     * the React Component
     */
    default: OptimizelyComponent<ContentModel>

    /**
     * Get string used to import the module that will be used to
     * fetch the static props of this module. This setup enables
     * Next.JS to keep server side dependencies out of the 
     * browser bundles
     */
    getStaticPropsModule: GetStaticPropsModule
}

export type OptimizelyComponent<ContentModel = {}, AdditionalProps = {}> = ComponentType<OptimizelyComponentProps<ContentModel> & AdditionalProps>
export type GetStaticPropsModule = () => string