//Redux & Redux setup
import { configureStore, EnhancedStore, AnyAction } from '@reduxjs/toolkit';
import { DispatchableMethod, RepositoryAction, RepositoryActions } from './Repository/AbstractRepostory';
import IContentRepository, { IContentActionFactory } from './Repository/IContent';
import ViewContext from './Repository/ViewContext';

//Application context
import EpiConfig from './AppConfig';
import ContentDeliveryAPI from './ContentDeliveryAPI';
import EventEngine, { IEventEngine } from './EventEngine';
import { ContentReference, ContentLinkService, ContentApiId } from './Models/ContentLink';
import ComponentLoader from './Loaders/ComponentLoader';
import AppConfig from './AppConfig';

//Taxonomy
import IContent from './Models/IContent';
import Website from './Models/Website';
import History from './Routing/History';
import StringUtils from './Util/StringUtils';

//Create context
declare let global: any;
declare let window: Window;
let ctx: any = window || global || {};
ctx.EpiserverSpa = ctx.EpiserverSpa || {};
ctx.epi = ctx.epi || {};
declare let epi: any;

/**
 * The context for an Episerver SPA, enabling access to the core logic of the SPA.
 */
export interface IEpiserverSpaContext {
  /**
   * Perform the initialization of the context from the configuration of the application
   *
   * @param config
   */
  init(config: EpiConfig, isServerSideRendering?: boolean): void;

  /**
   * Check if the debug mode is active
   */
  isDebugActive(): boolean;

  /**
   * Test if the current context has already been initialized and is now ready for usage
   */
  isInitialized(): boolean;

  /**
   * Return if we're server side rendering
   */
  isServerSideRendering(): boolean;

  /**
   * Dispatch an action to the context (Redux store)
   *
   * @param action
   */
  dispatch<T extends RepositoryAction<any, any>>(action: T): T;

  /**
   * Invoke a function on the context (Redux store)
   *
   * @param action
   */
  invoke<T>(action: DispatchableMethod<T>): T;

  /**
   * Get the store
   */
  getStore(): EnhancedStore;

  /**
   * Get the main EventEngine to use
   */
  events(): IEventEngine;

  /**
   * Retrieve the full configuration
   */
  config(): AppConfig;

  /**
   * Get the current component loader
   */
  componentLoader(): ComponentLoader;

  /**
   * Get an instance of the ContentDeliveryAPI
   */
  contentDeliveryApi(): ContentDeliveryAPI;

  /**
   * Navigate to a specific item
   *
   * @param item
   */
  navigateTo(item: ContentReference): void;

  /**
   * Transform a path to a full URL that can be used as href parameter for a
   * link tag.
   *
   * @param path
   */
  getEpiserverUrl(path: ContentReference, action?: string): string;

  /**
   * Retrieve an item from the state based upon it's GUID, will return
   * null if the content is not in the state.
   *
   * @param guid The GUID of the content to fetch
   */
  getContentByGuid(guid: string): IContent | null;

  /**
   * Retrieve an item from the state based upon it's GUID, will trigger async
   * fetching of the content by GUID if the content is not in the state
   *
   * @param guid The GUID of the content to fetch
   */
  loadContentByGuid(guid: string): Promise<IContent>;

  /**
   * Retrieve an item from the state based upon it's ID, will return
   * null if the content is not in the state.
   *
   * @param id The API ID (combination of ContentProvider & ID) of the content to fetch
   */
  getContentById(id: ContentApiId): IContent | null;

  /**
   * Retrieve an item from the state based upon it's GUID, will trigger async
   * fetching of the content by GUID if the content is not in the state
   *
   * @param id The API ID (combination of ContentProvider & ID) of the content to fetch
   */
  loadContentById(id: ContentApiId): Promise<IContent>;
  getContentByRef(ref: string): IContent | null;
  loadContentByRef(ref: string): Promise<IContent>;
  getContentByPath(path: string): IContent | null;
  loadContentByPath(path: string): Promise<IContent>;

  /**
   * Retrieve the website that's currently being rendered by the system, returns null
   * if the website is not yet loaded into the state.
   */
  getCurrentWebsite(): Website;

  /**
   * Retrieve the website that's currently being rendered by the system, returns null
   * if the website is not yet loaded into the state.
   */
  loadCurrentWebsite(): Promise<Website>;
  injectContent(iContent: IContent): void;
  isInEditMode(): boolean;
  isEditable(): boolean;

  /**
   * Retrieve the current path
   */
  getCurrentPath(): string;

  /**
   * Retrieve the currently routed content
   */
  getRoutedContent(): IContent;

  /**
   * Get the cached content by ContentReference object
   *
   * @param ref The content reference to load
   */
  getContentByContentRef(ref: ContentReference): IContent | null;

  /**
   * Get the domain where the SPA is running. If it's configured to be
   * running at https://example.com/spa/, this method returns: https://example.com
   */
  getSpaDomain(): string;

  /*
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
  getSpaBasePath(): string;

  /**
   * Get the URL where Episerver is running, without trailing slash, so that
   * all paths can start with a traling slash.
   */
  getEpiserverURL(): string;
}

interface EpiContentSavedEvent {
  successful: boolean;
  contentLink: string;
  hasContentLinkChanged: boolean;
  savedContentLink: string;
  publishedContentLink: string;
  properties: Array<{
    name: string;
    successful: boolean;
    validationErrors: any;
    value: any;
  }>;
  validationErrors: Array<any>;
  oldContentLink: string;
}

export class EpiserverSpaContext implements IEpiserverSpaContext {
  protected _config!: EpiConfig;
  protected _initialized: boolean = false;
  protected _state!: EnhancedStore;
  protected _contentApi!: ContentDeliveryAPI;
  protected _isServerSideRendering!: boolean;
  protected _componentLoader!: ComponentLoader;

  public init(config: EpiConfig, isServerSideRendering: boolean = false): void {
    //Generic init
    this._initialized = true;
    this._isServerSideRendering = isServerSideRendering;
    this._config = config;
    if (process.env.NODE_ENV == 'production') {
      this._config = { ...this._config, enableDebug: false };
    }
    this._contentApi = new ContentDeliveryAPI(
      {
        getCurrentPath(): string {
          return window.location.pathname;
        },
      },
      this._config,
    );

    //Redux init
    let reducers: any = {};
    IContentRepository.ContentDeliveryAPI = this._contentApi;
    reducers[IContentRepository.StateKey] = IContentRepository.reducer.bind(IContentRepository);
    reducers[ViewContext.StateKey] = ViewContext.reducer.bind(ViewContext);
    this._state = configureStore({ reducer: reducers });
    let initAction: RepositoryAction<RepositoryActions, any> = {
      type: RepositoryActions.INIT,
    };
    this._state.dispatch(initAction);

    //EpiEditMode init
    if (!this._isServerSideRendering) {
      this.events().addListener(
        'beta/epiReady',
        'EpiSpaReady',
        (() => {
          if (this.isDebugActive())
            console.info('Episerver Ready, setting edit mode to', this.isInEditMode() ? 'true' : 'false');
          this._contentApi.setInEditMode(this.isInEditMode());
        }).bind(this),
        true,
      );
      this.events().addListener(
        'beta/contentSaved',
        'EpiContentSaved',
        ((event: EpiContentSavedEvent) => {
          if (this.isDebugActive()) console.info('Received updated content from the Episerver Shell', event);
          if (event.successful) {
            let baseId = event.savedContentLink.split('_')[0];
            let baseContent = this.getContentById(baseId);
            if (baseContent) {
              event.properties.forEach((prop) => {
                this.dispatch(
                  IContentActionFactory.updateContentProperty(baseContent as IContent, prop.name, prop.value),
                );
              });
            }

            //Full refresh as we don't support partials yet....
            this.loadContentById(event.savedContentLink);
          }
        }).bind(this),
        true,
      );
    }
  }

  public isInitialized(): boolean {
    return this._initialized;
  }

  public isDebugActive(): boolean {
    this.enforceInitialized();
    return this._config?.enableDebug || false;
  }

  public isServerSideRendering(): boolean {
    if (this._isServerSideRendering == null) {
      try {
        this._isServerSideRendering = epi.isServerSideRendering == true;
      } catch (e) {
        return false;
      }
    }
    return this._isServerSideRendering;
  }

  protected enforceInitialized(): void {
    if (!this._initialized) {
      throw 'The Episerver SPA Context has not yet been initialized';
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

  public contentDeliveryApi(): ContentDeliveryAPI {
    this.enforceInitialized();
    return this._contentApi;
  }

  public getContentByGuid(guid: string): IContent | null {
    if (this._state.getState().iContentRepo.guids[guid]) {
      let id = this._state.getState().iContentRepo.guids[guid];
      return this.getContentById(id);
    }
    return null;
  }

  public loadContentByGuid(id: string): Promise<IContent> {
    let c: IContent | null = this.getContentByGuid(id);
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
    let c = this.getContentById(id);
    if (c) {
      return Promise.resolve(c);
    }
    return this.invoke(IContentRepository.getById(id));
  }

  public getContentByRef(ref: string): IContent | null {
    if (this._state.getState().iContentRepo.refs[ref]) {
      let id = this._state.getState().iContentRepo.refs[ref];
      return this.getContentById(id);
    }
    return null;
  }

  public loadContentByRef(ref: string): Promise<IContent> {
    let item = this.getContentByRef(ref);
    if (item) return Promise.resolve(item);

    return this.invoke(IContentRepository.getByReference(ref));
  }

  public getContentByPath(path: string): IContent | null {
    if (this._state.getState().iContentRepo.paths[path]) {
      let id = this._state.getState().iContentRepo.paths[path];
      return this.getContentById(id);
    }
    return null;
  }

  public loadContentByPath(path: string): Promise<IContent> {
    let c = this.getContentByPath(path);
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
      return ctx.epi && ctx.epi.beta ? ctx.epi.beta.inEditMode == true : false;
    } catch (e) {
      return false; //Asume not
    }
  }

  public isEditable(): boolean {
    try {
      return ctx.epi && ctx.epi.beta ? ctx.epi.beta.isEditable == true : false;
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
    let me = this;
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
    let website: Website = this.getCurrentWebsite();
    if (website) {
      return Promise.resolve(website);
    }
    return this.invoke(IContentRepository.getCurrentWebsite());
  }

  public getCurrentPath(): string {
    let state = this._state.getState();
    return state.ViewContext.currentPath;
  }

  public getRoutedContent(): IContent {
    let c = this.getContentByPath(this.getCurrentPath());
    if (!c) {
      throw "There's no currently routed content";
    }
    return c;
  }

  public getContentByContentRef(ref: ContentReference) {
    let id: string | null = ContentLinkService.createApiId(ref);
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
    if (typeof this._sanitizedSpaBasePath == 'string') {
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
    let epiUrl = this.config().epiBaseUrl;
    return StringUtils.TrimRight('/', epiUrl);
  }
}

ctx.EpiserverSpa.Context = ctx.EpiserverSpa.Context || new EpiserverSpaContext();
export default ctx.EpiserverSpa.Context as IEpiserverSpaContext;
