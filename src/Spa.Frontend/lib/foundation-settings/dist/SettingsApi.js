var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ContentDelivery } from '@episerver/spa-core';
export default class SettingsApi {
    constructor(contentDeliveryApi, contentRepositoryApi, serverContext) {
        this.serviceEndpoint = 'api/foundation/v1/settings';
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
    getContainerOnServer(container) {
        const ssrPropName = container.toLowerCase();
        let settingsContainer = this._ctx.getProp(ssrPropName);
        if (!settingsContainer && this._ctx.IsServerSideRendering) {
            const ISettingsService = this._ctx.getEpiserverService("Foundation.Cms.Settings.ISettingsService");
            settingsContainer = ISettingsService.GetSiteSettings(container);
            this._ctx.setProp(ssrPropName, settingsContainer);
            settingsContainer = this._ctx.makeSafe(settingsContainer);
        }
        return settingsContainer;
    }
    listContainers(site) {
        return __awaiter(this, void 0, void 0, function* () {
            site = site || (yield this._repo.getCurrentWebsite());
            // @ToDo: Implement local storage caching...
            let url = this.serviceEndpoint + '/' + site.id;
            return this._api.raw(url).then(r => ContentDelivery.isNetworkError(r[0]) ? [] : r[0]);
        });
    }
    getContainer(container, site) {
        return __awaiter(this, void 0, void 0, function* () {
            site = site || (yield this._repo.getCurrentWebsite());
            const containerKey = `settings.${this._api.Language}.${site.id}.${container}`;
            let cached = null;
            try {
                cached = localStorage.getItem(containerKey);
            }
            catch (e) {
                //Ignore on purpose
            }
            if (cached) {
                if (this._api.OnLine) {
                    this.getRemoteContainer(container, site).then(x => localStorage.setItem(containerKey, JSON.stringify(x))).catch(x => null);
                }
                return JSON.parse(cached);
            }
            const result = yield this.getRemoteContainer(container, site);
            try {
                localStorage.setItem(containerKey, JSON.stringify(result));
            }
            catch (e) {
                //Ignore on purpose
            }
            return result;
        });
    }
    getRemoteContainer(container, site) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = this.serviceEndpoint + '/' + site.id + '/' + container;
            return this._api.raw(url).then(r => r[1].status === 200 ? r[0] : null).catch(() => null);
        });
    }
}
