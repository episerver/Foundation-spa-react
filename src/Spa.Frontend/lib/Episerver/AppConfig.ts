import { SpinnerComponent } from './Components/Spinner';
import { LayoutComponent } from './Components/Layout';
import { ContentAreaSiteConfig } from './Components/ContentArea';
import { IComponentPreloadList } from './Loaders/ComponentPreLoader';

export default interface AppConfig {
  /**
   * Enable debug logging to the console
   */
  enableDebug?: boolean;

  /**
   * Prefer guid for content fetching (preferred if running
   * multiple domains).
   */
  preferGuid?: boolean;

  /**
   * Disable all communication with the ContentDelivery API
   */
  noAjax?: boolean;

  /**
   * The base URL where the SPA is running
   */
  basePath: string;

  /**
   * The URL where Episerver is running, may or may not be the same as the basePath
   */
  epiBaseUrl: string;

  /**
   * The default language to use, if none specified
   */
  defaultLanguage: string;

  /**
   * Should sub-requests be minimized by loading related content (1 level deep)
   * by default?
   */
  autoExpandRequests?: boolean;

  /**
   *
   */
  enableSpinner?: boolean;

  /**
   * If this value is set to a number greater then 0, this is the amount of
   * miliseconds to wait before a spinner will be shown
   */
  spinnerTimeout?: number;

  /**
   * The spinner to use
   */
  spinner?: SpinnerComponent;

  /**
   * The default market to use, if none speicified. Only applies to the default
   * Commerce APIs
   */
  defaultMarket?: string;

  /**
   * The default currency to use, if none specified. Only applies to the default
   * Commerce APIs
   */
  defaultCurrency?: string;

  /**
   * Layout
   */
  layout: LayoutComponent;

  /**
   * Content Area configuration
   */
  contentArea?: ContentAreaSiteConfig;

  /**
   * List of components to be preloaded before hydration of the content, this
   * ensures "error-free" hydration at the chance of visitors clicking on links
   * before the full SPA has been loaded.
   */
  preLoadComponents?: IComponentPreloadList;
}
