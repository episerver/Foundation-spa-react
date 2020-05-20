import ComponentLoader from './ComponentLoader';

/**
 * Type definition to be used within the main Episerver SPA configuration
 */
export interface IComponentPreloadList extends Array<string> {}

/**
 * Helper class to pre-load a list of components to either ensure hydration of a server-side
 * rendered page is going smoothly or it's pre-load components for quick rendering.
 */
export default class ComponentPreLoader {
  /**
   * Perform the actual pre-loading of components, this is works by filling the cache of the
   * component loader.
   *
   * @param   config      The list of components to pre load
   * @param   loader      The ComponentLoader to use
   */
  public static async load(config: IComponentPreloadList, loader: ComponentLoader): Promise<boolean> {
    if (config && config.length > 0) {
      let list = config.map((c) => loader.LoadType(c).catch((e) => e));
      try {
        await Promise.all(list);
        return true;
      } catch (e) {
        return false;
      }
    }
    return Promise.resolve<boolean>(true);
  }

  /**
   * Verify if all provided components are pre-loaded
   *
   * @param   config  The list of components to pre-load
   * @param   loader  The ComponentLoader to use
   */
  public static isPreLoaded(config: IComponentPreloadList, loader: ComponentLoader): boolean {
    let allPreLoaded: boolean = true;
    if (config && config.length > 0) {
      config.forEach((c) => {
        allPreLoaded = allPreLoaded && loader.isPreLoaded(c);
      });
    }
    return allPreLoaded;
  }
}
