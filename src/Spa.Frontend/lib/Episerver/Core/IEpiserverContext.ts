
// External libraries
import { EnhancedStore } from '@reduxjs/toolkit';

// Episerver Application
import IServiceContainer from './IServiceContainer';
import EpiConfig from '../AppConfig';
import ContentDeliveryAPI from '../ContentDeliveryAPI';
import { IEventEngine } from '../EventEngine';
import { DispatchableMethod, RepositoryAction } from '../Repository/AbstractRepostory';
import { ContentReference, ContentApiId } from '../Models/ContentLink';
import ComponentLoader from '../Loaders/ComponentLoader';

// Episerver taxonomy
import IContent from '../Models/IContent';
import Website from '../Models/Website';

/**
 * The context for an Episerver SPA, enabling access to the core logic of the SPA.
 */
export default interface IEpiserverContext {
    /**
     * Perform the initialization of the context from the configuration of the application
     *
     * @param config
     */
    init(config: EpiConfig, serviceContainer: IServiceContainer, isServerSideRendering?: boolean): void;
  
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
    config(): EpiConfig;
  
    /**
     * Get the current component loader
     */
    componentLoader(): ComponentLoader;
  
    /**
     * Get an instance of the ContentDeliveryAPI
     */
    contentDeliveryApi<API extends ContentDeliveryAPI = ContentDeliveryAPI>(): API;
  
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