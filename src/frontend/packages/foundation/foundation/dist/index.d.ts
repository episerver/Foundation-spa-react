export * as Models from './models';
export * as Api from './api';
import { ContentDelivery } from '@optimizely/cms';
import { IFoundationAPI } from './api';
export declare function setup(): void;
export declare function get(): IFoundationAPI;
export declare function createInstance(config?: Partial<ContentDelivery.Config>): IFoundationAPI;
export default get;
