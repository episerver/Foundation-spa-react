import type { IContentDeliveryAPI, IContentDeliveryAPIStatic } from './icontent-delivery-api';
import type Config from './config';
export declare function createInstance(config: Partial<Config>, ApiClient?: IContentDeliveryAPIStatic): IContentDeliveryAPI;
export default createInstance;
