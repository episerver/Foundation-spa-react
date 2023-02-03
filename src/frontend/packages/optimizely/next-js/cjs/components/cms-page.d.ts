/// <reference types="node" />
import type { NextPage, GetStaticProps, GetStaticPathsContext, GetStaticPathsResult, GetStaticPropsResult, GetServerSideProps, GetServerSidePropsResult, Redirect, PreviewData } from 'next';
import type { ComponentLoader, IContentDeliveryAPI } from '@optimizely/cms/types';
import type { ParsedUrlQuery } from 'querystring';
export type OptimizelyCmsPageProps = {
    locale: string;
    fallback?: Record<string, any>;
    contentId?: string;
    inEditMode?: boolean;
};
export type OptimizelyCmsPageInitialProps = OptimizelyCmsPageProps & {};
export type OptimizelyCmsPageUrlParams = {
    page: string[];
};
export declare function isStringArray(toTest: any): toTest is string[];
export declare function staticPropsHasData(toTest: GetStaticPropsResult<OptimizelyCmsPageProps>): toTest is {
    props: OptimizelyCmsPageProps;
    revalidate?: number | boolean;
};
export declare function isServerSideRedirect(toTest: GetServerSidePropsResult<OptimizelyCmsPageProps>): toTest is {
    redirect: Redirect;
};
export declare function isServerSideNotFound(toTest: GetServerSidePropsResult<OptimizelyCmsPageProps>): toTest is {
    notFound: true;
};
export declare function hasAwaitableProps(toTest: GetServerSidePropsResult<OptimizelyCmsPageProps>): toTest is {
    props: Promise<OptimizelyCmsPageProps>;
};
export declare function resolveAwaitableProps(toResolve: {
    props: OptimizelyCmsPageProps | Promise<OptimizelyCmsPageProps>;
}): Promise<{
    props: OptimizelyCmsPageProps;
}>;
export declare function getStaticPaths(context: GetStaticPathsContext): Promise<GetStaticPathsResult>;
type CmsPageGetStaticProps<Q extends ParsedUrlQuery = ParsedUrlQuery, D extends PreviewData = PreviewData> = (context: Parameters<GetStaticProps<OptimizelyCmsPageProps, Q, D>>[0], cLoader?: ComponentLoader, api?: IContentDeliveryAPI) => ReturnType<GetStaticProps<OptimizelyCmsPageProps, Q, D>>;
export declare const getStaticProps: CmsPageGetStaticProps;
export declare const getServerSideProps: GetServerSideProps<OptimizelyCmsPageProps, OptimizelyCmsPageUrlParams, {}>;
export declare const OptimizelyCmsPage: NextPage<OptimizelyCmsPageProps, OptimizelyCmsPageInitialProps>;
export default OptimizelyCmsPage;
