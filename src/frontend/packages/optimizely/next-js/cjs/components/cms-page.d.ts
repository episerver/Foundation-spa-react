import type { NextPage, GetStaticPathsContext, GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult, GetServerSideProps, GetServerSidePropsResult, Redirect } from 'next';
export declare type OptimizelyCmsPageProps = {
    /**
     * The pre-determined locale for the page
     */
    locale: string;
    /**
     * Fallback data for SWR, as populated by the components used to render
     * the page.
     */
    fallback?: Record<string, any>;
    /**
     * The content identifier of the content that will be loaded by the
     * page.
     */
    contentId?: string;
    /**
     * Initial "editMode" state, which will fill the gap between page load
     * and the communicationInjector completing initialization.
     */
    inEditMode?: boolean;
};
export declare type OptimizelyCmsPageInitialProps = OptimizelyCmsPageProps & {};
/**
 * The path for the current page, as resolved into segments by Next.JS
 */
export declare type OptimizelyCmsPageUrlParams = {
    /**
     * The current path segements
     */
    page: string[];
};
export declare function isStringArray(toTest: any): toTest is string[];
/**
 * Validate that the CMS Props have data (e.g. the props have yielded an actual page)
 *
 * @param       toTest      The variable to test
 * @returns     boolean
 */
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
/**
 * Resolve the paths available within the CMS, which should be pre-rendered by Next.JS
 *
 * @param       context
 * @returns     The paths to pre-render during SSG
 */
export declare function getStaticPaths(context: GetStaticPathsContext): Promise<GetStaticPathsResult>;
/**
 * Resolve the properties needed to render the current path from the content
 * managed within the Optimizely CMS.
 *
 * @param       context     The context provided by Next.JS
 * @returns     The Page properties
 */
export declare function getStaticProps(context: GetStaticPropsContext<OptimizelyCmsPageUrlParams>): Promise<GetStaticPropsResult<OptimizelyCmsPageProps>>;
export declare const getServerSideProps: GetServerSideProps<OptimizelyCmsPageProps, OptimizelyCmsPageUrlParams, {}>;
export declare const OptimizelyCmsPage: NextPage<OptimizelyCmsPageProps, OptimizelyCmsPageInitialProps>;
export default OptimizelyCmsPage;
