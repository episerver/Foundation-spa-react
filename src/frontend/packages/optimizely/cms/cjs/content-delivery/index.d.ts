export type { Config } from './config';
export * from './icontent-delivery-api';
export * from './content-delivery-api';
export * as Utils from './util';
export * as ApiConfig from './config';
export * from './NetworkError';
import type { Config } from './config';
import type { IContentDeliveryAPI, IContentDeliveryAPIStatic } from './icontent-delivery-api';
import { OptiContentMode } from './util';
declare class ContentDeliveryContainer {
    apiType: IContentDeliveryAPIStatic;
    private _instance?;
    private _gat;
    get instance(): IContentDeliveryAPI;
    set instance(api: IContentDeliveryAPI);
    isInitialized(): boolean;
    set tokenProvider(provider: Config['getAccessToken']);
    get tokenProvider(): Config['getAccessToken'];
    setup(config?: Partial<Config>): IContentDeliveryAPI;
    createInstance(config?: Partial<Config>): IContentDeliveryAPI;
    createBasicConfig(partial?: Partial<Config>): Config;
}
export declare const Container: ContentDeliveryContainer;
export declare function Current(): IContentDeliveryAPI;
export declare function createInstance(config?: Partial<Config>): IContentDeliveryAPI;
export declare const MODE_DELIVERY = OptiContentMode['Delivery'];
export declare const MODE_EDIT = OptiContentMode['Edit'];
export default Current;
