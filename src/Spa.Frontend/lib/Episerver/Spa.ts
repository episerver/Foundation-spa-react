// Redux & Redux setup
import { configureStore, EnhancedStore, Action, AnyAction, Reducer } from '@reduxjs/toolkit';
import { DispatchableMethod, RepositoryAction, RepositoryActions } from './Repository/AbstractRepostory';
import IContentRepository, { IContentActionFactory } from './Repository/IContent';
import ViewContext from './Repository/ViewContext';

// Application context
import IEpiserverContext from './Core/IEpiserverContext';
import IServiceContainer, { DefaultServices } from './Core/IServiceContainer';
import EpiConfig from './AppConfig';
import ContentDeliveryAPI from './ContentDeliveryAPI';
import EventEngine, { IEventEngine } from './EventEngine';
import { ContentReference, ContentLinkService, ContentApiId } from './Models/ContentLink';
import ComponentLoader from './Loaders/ComponentLoader';
import AppConfig from './AppConfig';

// Taxonomy
import IContent from './Models/IContent';
import Website from './Models/Website';
import History from './Routing/History';
import StringUtils from './Util/StringUtils';

// Create context
declare let global: any;
declare let window: Window;
const ctx: any = window || global || {};
ctx.EpiserverSpa = ctx.EpiserverSpa || {};
ctx.epi = ctx.epi || {};
declare let epi: any;

interface EpiContentSavedEvent {
  successful: boolean;
  contentLink: string;
  hasContentLinkChanged: boolean;
  savedContentLink: string;
  publishedContentLink: string;
  properties: {
    name: string;
    successful: boolean;
    validationErrors: any;
    value: any;
  }[];
  validationErrors: any[];
  oldContentLink: string;
}

export enum InitStatus
{
  NotInitialized,
  Initializing,
  Initialized
}

export class EpiserverSpaContext implements IEpiserverContext {
    protected _config!: EpiConfig;
    protected _initialized: InitStatus = InitStatus.NotInitialized;
    protected _state!: EnhancedStore;
    protected _isServerSideRendering!: boolean;
    protected _componentLoader!: ComponentLoader;
    protected _serviceContainer!: IServiceContainer;

    public init(config: EpiConfig, serviceContainer: IServiceContainer, isServerSideRendering: boolean = false): void {
        // Generic init
        this._initialized = InitStatus.Initializing;
        this._isServerSideRendering = isServerSideRendering;
        this._serviceContainer = serviceContainer;
        this._config = config;

        // Register core services
        this._serviceContainer.addService(DefaultServices.ContentDeliveryApi, new ContentDeliveryAPI({ getCurrentPath(): string { return window.location.pathname; }}, this._config));

        // Have modules add services of their own
        if (this._config.modules) {
            this._config.modules.forEach(x => x.ConfigureContainer(this._serviceContainer));
        }

        // Redux init
        this._initRedux();

        // EpiEditMode init
        this._initEditMode();

        // Run module startup logic
        if (this._config.modules) {
            const me = this;
            this._config.modules.forEach(x => x.StartModule(me));
        }

        this._initialized = InitStatus.Initialized;
    }

    private _initRedux() : void
    {
        const reducers: { [key : string ]: Reducer<any, Action> } = {};

        IContentRepository.ContentDeliveryAPI = this.contentDeliveryApi();
        reducers[IContentRepository.StateKey] = IContentRepository.reducer.bind(IContentRepository);
        reducers[ViewContext.StateKey] = ViewContext.reducer.bind(ViewContext);
        if (this._config.modules) {
            this._config.modules.forEach(x => { const ri = x.GetStateReducer(); if (ri) { reducers[ri.stateKey] = ri.reducer }});
        }
        this._state = configureStore({ reducer: reducers });
        const initAction: Action<RepositoryActions> = { type: RepositoryActions.INIT };
        this._state.dispatch(initAction);
    }

  private _initEditMode() : void
  {
    if (!this._isServerSideRendering) {
      this.events().addListener(
        'beta/epiReady',
        'EpiSpaReady',
        (() => {
          if (this.isDebugActive())
            console.info('Episerver Ready, setting edit mode to', this.isInEditMode() ? 'true' : 'false');
          this.contentDeliveryApi().setInEditMode(this.isInEditMode());
        }).bind(this),
        true,
      );
      this.events().addListener(
        'beta/contentSaved',
        'EpiContentSaved',
        ((event: EpiContentSavedEvent) => {
          if (this.isDebugActive()) console.info('Received updated content from the Episerver Shell', event);
          if (event.successful) {
            const baseId = event.savedContentLink.split('_')[0];
            const baseContent = this.getContentById(baseId);
            if (baseContent) {
              event.properties.forEach((prop) => {
                this.dispatch(
                  IContentActionFactory.updateContentProperty(baseContent as IContent, prop.name, prop.value),
                );
              });
            }

            // Full refresh as we don't support partials yet....
            this.loadContentById(event.savedContentLink);
          }
        }).bind(this),
        true,
      );
    }
  }

  public isInitialized(): boolean {
    return this._initialized === InitStatus.Initialized;
  }

  public isDebugActive(): boolean {
    this.enforceInitialized();
    return this._config?.enableDebug || false;
  }

  public isServerSideRendering(): boolean {
    if (this._isServerSideRendering == null) {
      try {
        this._isServerSideRendering = epi.isServerSideRendering === true;
      } catch (e) {
        return false;
      }
    }
    return this._isServerSideRendering;
  }

  protected enforceInitialized(): void {
    if (!this._initialized) {
      throw new Error('The Episerver SPA Context has not yet been initialized');
    }
  }

  public dispatch<T extends RepositoryAction<any, any>>(action: T): T {
    this.enforceInitialized();
    return this._state.dispatch(action);
  }

  public invoke<T>(action: DispatchableMethod<T>): T {
    this.enforceInitialized();
    return (this._state.dispatch((action as unknown) as AnyAction) as unknown) as T;
  }

  public getStore(): EnhancedStore {
    this.enforceInitialized();
    return this._state;
  }

  public events(): IEventEngine {
    return EventEngine;
  }

  public config(): Readonly<AppConfig> {
    this.enforceInitialized();
    return this._config;
  }

  public componentLoader(): ComponentLoader {
    if (!this._componentLoader) {
      this._componentLoader = new ComponentLoader();
    }
    return this._componentLoader;
  }

  public contentDeliveryApi<API extends ContentDeliveryAPI = ContentDeliveryAPI>(): API {
    this.enforceInitialized();
    return this._serviceContainer.getService<API>(DefaultServices.ContentDeliveryApi);
  }

  public getContentByGuid(guid: string): IContent | null {
    if (this._state.getState().iContentRepo.guids[guid]) {
      const id = this._state.getState().iContentRepo.guids[guid];
      return this.getContentById(id);
    }
    return null;
  }

  public loadContentByGuid(id: string): Promise<IContent> {
    const c: IContent | null = this.getContentByGuid(id);
    if (c) {
      return Promise.resolve(c);
    }
    return this.invoke(IContentRepository.getById(id));
  }

  public getContentById(id: ContentApiId): IContent | null {
    if (this._state.getState().iContentRepo.items && this._state.getState().iContentRepo.items[id]) {
      return this._state.getState().iContentRepo.items[id].content;
    }
    return null;
  }

  public loadContentById(id: ContentApiId): Promise<IContent> {
    const c = this.getContentById(id);
    if (c) {
      return Promise.resolve(c);
    }
    return this.invoke(IContentRepository.getById(id));
  }

  public getContentByRef(ref: string): IContent | null {
    if (this._state.getState().iContentRepo.refs[ref]) {
      const id = this._state.getState().iContentRepo.refs[ref];
      return this.getContentById(id);
    }
    return null;
  }

  public loadContentByRef(ref: string): Promise<IContent> {
    const item = this.getContentByRef(ref);
    if (item) return Promise.resolve(item);

    return this.invoke(IContentRepository.getByReference(ref));
  }

  public getContentByPath(path: string): IContent | null {
    if (this._state.getState().iContentRepo.paths[path]) {
      const id = this._state.getState().iContentRepo.paths[path];
      return this.getContentById(id);
    }
    return null;
  }

  public loadContentByPath(path: string): Promise<IContent> {
    const c = this.getContentByPath(path);
    if (c) {
      return Promise.resolve(c);
    }
    return this.invoke(IContentRepository.getByPath(path));
  }

  public injectContent(iContent: IContent): void {
    this.dispatch(IContentActionFactory.addOrUpdateItem(iContent));
  }

  public isInEditMode(): boolean {
    try {
      return ctx.epi && ctx.epi.beta ? ctx.epi.beta.inEditMode === true : false;
    } catch (e) {
      return false; // Asume not
    }
  }

  public isEditable(): boolean {
    try {
      return ctx.epi && ctx.epi.beta ? ctx.epi.beta.isEditable === true : false;
    } catch (e) {
      return false;
    }
  }

  public getEpiserverUrl(path: ContentReference, action?: string): string {
    let itemPath: string = '';
    if (ContentLinkService.referenceIsString(path)) {
      itemPath = path;
    } else if (ContentLinkService.referenceIsContentLink(path)) {
      itemPath = path.url;
    } else if (ContentLinkService.referenceIsIContent(path)) {
      itemPath = path.contentLink.url;
    }

    if (action) {
      itemPath += itemPath.length ? '/' + action : action;
    }

    return this._config.epiBaseUrl + itemPath;
  }

  public navigateTo(path: ContentReference, noHistory: boolean = false): void {
    let newPath: string = '';
    if (ContentLinkService.referenceIsString(path)) {
      newPath = path;
    } else if (ContentLinkService.referenceIsIContent(path)) {
      newPath = path.contentLink.url;
    } else if (ContentLinkService.referenceIsContentLink(path)) {
      newPath = path.url;
    }

    if (!newPath) {
      if (this.isDebugActive()) console.log('The navigation target does not include a path.', path);
      newPath = '/';
    }
    const me = this;
    this.loadContentByPath(newPath).then(() => {
      me.getStore().dispatch(ViewContext.updateCurrentPath(newPath));
      if (!noHistory) {
        History.pushPath(newPath);
      }
    });
  }

  public getCurrentWebsite(): Website {
    return this._state.getState().iContentRepo?.website;
  }

  public loadCurrentWebsite(): Promise<Website> {
    const website: Website = this.getCurrentWebsite();
    if (website) {
      return Promise.resolve(website);
    }
    return this.invoke(IContentRepository.getCurrentWebsite());
  }

  public getCurrentPath(): string {
    const state = this._state.getState();
    return state.ViewContext.currentPath;
  }

  public getRoutedContent(): IContent {
    const c = this.getContentByPath(this.getCurrentPath());
    if (!c) {
      throw new Error("There's no currently routed content");
    }
    return c;
  }

  public getContentByContentRef(ref: ContentReference) {
    const id: string | null = ContentLinkService.createApiId(ref);
    return id ? this.getContentById(id) : null;
  }

  /**
   * Get the base path where the SPA is running. If it's configured to be
   * running at https://example.com/spa/, this method returns /spa. If it's
   * running at https://example.com/, this method will return an empty
   * string.
   *
   * It's preferred to use this method over accessing the config directly as
   * this method sanitizes the configuration value;
   *
   * @returns {string}    The base path of the SPA
   */
  public getSpaBasePath(): string {
    if (typeof this._sanitizedSpaBasePath === 'string') {
      return this._sanitizedSpaBasePath;
    }
    let configBasePath = this.config()?.basePath || '';
    if (configBasePath.length > 0) {
      configBasePath = StringUtils.TrimRight('/', StringUtils.TrimLeft('/', configBasePath));
      configBasePath = configBasePath.length > 0 ? '/' + configBasePath : '';
    }
    this._sanitizedSpaBasePath = configBasePath;
    return this._sanitizedSpaBasePath;
  }

  private _sanitizedSpaBasePath!: string;

  /**
   * Get the domain where the SPA is running. If it's configured to be
   * running at https://example.com/spa/, this method returns: https://example.com
   */
  public getSpaDomain(): string {
    return window.location.protocol + '//' + window.location.hostname;
  }

  /**
   * Get the location where Episerver is running, whithout a trailing slash.
   */
  public getEpiserverURL(): string {
    const epiUrl = this.config().epiBaseUrl;
    return StringUtils.TrimRight('/', epiUrl);
  }
}

ctx.EpiserverSpa.Context = ctx.EpiserverSpa.Context || new EpiserverSpaContext();
export default ctx.EpiserverSpa.Context as IEpiserverContext;
