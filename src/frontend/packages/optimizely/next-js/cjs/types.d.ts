import type { ComponentType } from "react";
export type OptimizelyComponentProps<ContentModel = {}> = {
    content: ContentModel;
    contentType: string[];
    contentId: string | number;
};
export type OptimizelyQueryResponse<ContentModel = {}, AdditionalQueries = {}> = {
    content: ContentModel;
} & AdditionalQueries;
export type OptimizelyComponentModule<ContentModel = {}> = {
    default: OptimizelyComponent<ContentModel>;
    getStaticPropsModule: GetStaticPropsModule;
};
export type OptimizelyComponent<ContentModel = {}, AdditionalProps = {}> = ComponentType<OptimizelyComponentProps<ContentModel> & AdditionalProps>;
export type GetStaticPropsModule = () => string;
