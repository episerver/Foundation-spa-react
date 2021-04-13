import { ContentDelivery, ServerSideRendering, Taxonomy } from '@episerver/spa-core';

type ISettingsService = {
    GetSiteSettings<T extends Taxonomy.IContent = Taxonomy.IContent>(container: string) : T | undefined;
}

export default class SettingsApi
{
    public serviceEndpoint : Readonly<string> = 'api/foundation/v1/settings';
    protected _repo : Readonly<ContentDelivery.IIContentRepositoryV2>;
    protected _api : Readonly<ContentDelivery.IContentDeliveryAPI_V2>;
    protected _ctx : Readonly<ServerSideRendering.Accessor>;

    public constructor (
        contentDeliveryApi: ContentDelivery.IContentDeliveryAPI_V2,
        contentRepositoryApi: ContentDelivery.IIContentRepositoryV2,
        serverContext: ServerSideRendering.Accessor
    ) {
        this._api = contentDeliveryApi;
        this._repo = contentRepositoryApi;
        this._ctx = serverContext;
    }

    public getContainerOnServer<T extends Taxonomy.IContent = Taxonomy.IContent>(container: string) : T | undefined
    {
        if (!this._ctx.IsServerSideRendering) return undefined;

        var ISettingsService = this._ctx.getEpiserverService<ISettingsService>("Foundation.Cms.Settings.ISettingsService");
        return this._ctx.makeSafe<T>(ISettingsService.GetSiteSettings<T>(container));
    }

    public async listContainers(site ?: Taxonomy.Website) : Promise<string[]>
    {
        site = site || await this._repo.getCurrentWebsite();
        // @ToDo: Implement local storage caching...
        let url = this.serviceEndpoint + '/' + site.id;
        return this._api.raw<string[]>(url).then(r => ContentDelivery.isNetworkError(r[0]) ? [] : r[0]);
    }

    public async getContainer<T extends Taxonomy.IContent = Taxonomy.IContent>(container: string, site ?: Taxonomy.Website) : Promise<T | null>
    {
        site = site || await this._repo.getCurrentWebsite();

        const containerKey = `settings.${ this._api.Language }.${ site.id }.${ container }`;
        let cached : string | null = null;
        try {
            cached = localStorage.getItem(containerKey);
        } catch (e) {
            //Ignore on purpose
        }
        if (cached) {
            if (this._api.OnLine) {
                this.getRemoteContainer<T>(container, site).then(x => localStorage.setItem(containerKey, JSON.stringify(x))).catch(x => null);
            }
            return JSON.parse(cached);
        }

        const result = await this.getRemoteContainer<T>(container, site);
        try {
            localStorage.setItem(containerKey, JSON.stringify(result));
        } catch (e) {
            //Ignore on purpose
        }
        return result;
    }

    protected async getRemoteContainer<T extends Taxonomy.IContent = Taxonomy.IContent>(container: string, site: Taxonomy.Website) : Promise<T | null>
    {
        let url = this.serviceEndpoint + '/' + site.id + '/' + container;
        return this._api.raw<T>(url).then(r => r[1].status === 200 ? r[0] : null).catch(() => null);
    }
}