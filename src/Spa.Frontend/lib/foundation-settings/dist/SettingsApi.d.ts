import { ContentDelivery, Taxonomy } from '@episerver/spa-core';
export default class SettingsApi {
    serviceEndpoint: Readonly<string>;
    protected _repo: Readonly<ContentDelivery.IIContentRepositoryV2>;
    protected _api: Readonly<ContentDelivery.IContentDeliveryAPI_V2>;
    constructor(contentDeliveryApi: ContentDelivery.IContentDeliveryAPI_V2, contentRepositoryApi: ContentDelivery.IIContentRepositoryV2);
    listContainers(site?: Taxonomy.Website): Promise<string[]>;
    getContainer<T extends Taxonomy.IContent = Taxonomy.IContent>(container: string, site?: Taxonomy.Website): Promise<T | null>;
    protected getRemoteContainer<T extends Taxonomy.IContent = Taxonomy.IContent>(container: string, site: Taxonomy.Website): Promise<T | null>;
}
