import ContentLink from './ContentLink';
import IContent from './IContent';

export enum ResponseType {
  ActionResult = 'ActionResult',
}

/**
 * The ActionResponse is the main response type for invoking action
 * methods.
 */
export default interface ActionResponse<T> {
  /**
   * The name of the invoked action
   */
  actionName: string;

  /**
   * The type of response
   */
  responseType: ResponseType;

  /**
   * The actual payload of the response
   */
  data: T;

  /**
   * The name of the current content
   */
  name: string;

  /**
   * The link to the content
   */
  contentLink: ContentLink;

  /**
   * The URL to the content, without actions
   */
  url: string;

  /**
   * The full content object
   */
  currentContent: IContent;

  /**
   * The current language
   */
  language: string;
}
