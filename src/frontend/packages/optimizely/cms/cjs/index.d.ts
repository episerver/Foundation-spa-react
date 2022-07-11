export * as Models from './models/index';
export * as Provider from './provider/index';
export * as Components from './components/index';
export { useOptimizely, useAndInitOptimizely } from './provider/use';
export { ContentComponent } from './components/ContentComponent';
export { EditableField } from './components/EditableField';
export { useContent, useContents, useContentComponent } from './hooks';
export * as ComponentLoader from './loader/index';
export { setup as createGqlClient } from './graphql/index';
export * as GraphQL from './graphql/index';
export { default as cdapi } from './content-delivery/index';
export * as ContentDelivery from './content-delivery/index';
export * as Utils from './util/index';
import React from 'react';
/**
 * React V18 Compatibility definitions, for as long as @types/react does not
 * include any definitions for recent additions to React.
 */
export declare type ReactV18 = typeof React & {
    /**
     * useId is a hook for generating unique IDs that are stable across the
     * server and client, while avoiding hydration mismatches.
     *
     * @see     https://reactjs.org/docs/hooks-reference.html#useid
     */
    useId: () => string;
};
import type { OptiOnPageEditingContext } from './opti-on-page-editing';
declare global {
    interface Window {
        /**
         * The EPiServer namespace used by the Optimizely Content Cloud
         * client side libraries.
         */
        epi?: OptiOnPageEditingContext;
    }
}
