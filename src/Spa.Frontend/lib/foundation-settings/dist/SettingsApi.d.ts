import { ContentDelivery, ServerSideRendering, Taxonomy } from '@episerver/spa-core';
export default class SettingsApi {
    serviceEndpoint: Readonly<string>;
    protected _repo: Readonly<ContentDelivery.IIContentRepositoryV2>;
    protected _api: Readonly<ContentDelivery.IContentDeliveryAPI_V2>;
    protected _ctx: Readonly<ServerSideRendering.Accessor>;
    constructor(contentDeliveryApi: ContentDelivery.IContentDeliveryAPI_V2, contentRepositoryApi: ContentDelivery.IIContentRepositoryV2, serverContext: ServerSideRendering.Accessor);
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
