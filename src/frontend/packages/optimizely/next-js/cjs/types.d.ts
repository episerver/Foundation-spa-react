import type { ComponentType } from "react";
export declare type OptimizelyComponentProps<ContentModel = {}> = {
    content: ContentModel;
    contentType: string[];
    contentId: string | number;
};
export declare type OptimizelyQueryResponse<ContentModel = {}, AdditionalQueries = {}> = {
    content: ContentModel;
} & AdditionalQueries;
export declare type OptimizelyComponentModule<ContentModel = {}> = {
    /**
     * The default export of an OptimizelyComponentModule must be
     * the React Component
     */
    default: OptimizelyComponent<ContentModel>;
    /**
     * Get string used to import the module that will be used to
     * fetch the static props of this module. This setup enables
     * Next.JS to keep server side dependencies out of the
     * browser bundles
     */
    getStaticPropsModule: GetStaticPropsModule;
};
export declare type OptimizelyComponent<ContentModel = {}, AdditionalProps = {}> = ComponentType<OptimizelyComponentProps<ContentModel> & AdditionalProps>;
export declare type GetStaticPropsModule = () => string;
