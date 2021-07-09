import { ContentDelivery, ServerSideRendering, Taxonomy, Interfaces } from '@episerver/spa-core';

type ISettingsService = {
    GetSiteSettings<T extends Taxonomy.IContent = Taxonomy.IContent>(container: string) : T | undefined;
}

export class SettingsApi
{
    public serviceEndpoint : Readonly<string> = 'api/foundation/v1/settings';
    protected _repo : Readonly<Interfaces.IIContentRepository>;
    protected _api : Readonly<Interfaces.IContentDeliveryAPI>;
    protected _ctx : Readonly<Interfaces.IServerContextAccessor>;

    public constructor (
        contentDeliveryApi: Interfaces.IContentDeliveryAPI,
        contentRepositoryApi: Interfaces.IIContentRepository,
        serverContext: Interfaces.IServerContextAccessor
    ) {
        this._api = contentDeliveryApi;
        this._repo = contentRepositoryApi;
        this._ctx = serverContext;
    }

    /**
     * Get a settings container, either during server side rendering or from the initial context delivered by the
     * server side rendering.
     * 
     * @param       container 
     * @returns     The settings container, or undefined if not found
     */
    public getContainerOnServer<T extends Taxonomy.IContent = Taxonomy.IContent>(container: string) : T | undefined
    {
        const ssrPropName = container.toLowerCase();
        let settingsContainer  = this._ctx.getProp<T>(ssrPropName);
        if (!settingsContainer && this._ctx.IsServerSideRendering) {
            const ISettingsService = (this._ctx as ServerSideRendering.DotNetAccessor).getEpiserverService<ISettingsService>("Foundation.Cms.Settings.ISettingsService");
            settingsContainer = ISettingsService.GetSiteSettings<T>(container);
            this._ctx.setProp(ssrPropName, settingsContainer);
            settingsContainer = (this._ctx as ServerSideRendering.DotNetAccessor).makeSafe(settingsContainer);
        }
        return settingsContainer;
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
export default SettingsApi;