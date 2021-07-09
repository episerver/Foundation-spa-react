import { Taxonomy, Interfaces } from '@episerver/spa-core';
export declare class SettingsApi {
    serviceEndpoint: Readonly<string>;
    protected _repo: Readonly<Interfaces.IIContentRepository>;
    protected _api: Readonly<Interfaces.IContentDeliveryAPI>;
    protected _ctx: Readonly<Interfaces.IServerContextAccessor>;
    constructor(contentDeliveryApi: Interfaces.IContentDeliveryAPI, contentRepositoryApi: Interfaces.IIContentRepository, serverContext: Interfaces.IServerContextAccessor);
    /**
     * Get a settings container, either during server side rendering or from the initial context delivered by the
     * server side rendering.
     *
     * @param       container
     * @returns     The settings container, or undefined if not found
     */
    getContainerOnServer<T extends Taxonomy.IContent = Taxonomy.IContent>(container: string): T | undefined;
    listContainers(site?: Taxonomy.Website): Promise<string[]>;
    getContainer<T extends Taxonomy.IContent = Taxonomy.IContent>(container: string, site?: Taxonomy.Website): Promise<T | null>;
    protected getRemoteContainer<T extends Taxonomy.IContent = Taxonomy.IContent>(container: string, site: Taxonomy.Website): Promise<T | null>;
}
export default SettingsApi;
