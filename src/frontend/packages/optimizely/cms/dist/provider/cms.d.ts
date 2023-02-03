import type { FunctionComponent, PropsWithChildren } from 'react';
import type IContentDeliveryApi from '../content-delivery/icontent-delivery-api';
import type { ComponentLoaderStatic, ComponentLoader, ComponentsCache } from '../loader/types';
import React from 'react';
export type OptimizelyCmsContextData = {
    api?: IContentDeliveryApi;
    loader?: ComponentLoader;
    cmsDomain: string;
    defaultBranch: string;
    defaultSiteId: string;
};
export type OptimizelyCmsProps = {
    cmsDomain: string;
    ComponentLoaderClass?: ComponentLoaderStatic;
    defaultBranch?: string;
    defaultSiteId?: string;
    components?: ComponentsCache;
};
export declare const OptimizelyCmsContext: React.Context<OptimizelyCmsContextData>;
export declare const OptimizelyCms: FunctionComponent<PropsWithChildren<OptimizelyCmsProps>>;
export default OptimizelyCms;
/**
 *
 * @returns
 */
export declare const useOptimizelyCms: () => OptimizelyCmsContextData;
