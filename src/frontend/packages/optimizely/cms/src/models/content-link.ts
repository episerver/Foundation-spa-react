import IContent from './icontent';

export type ContentReference = IContent | ContentLink | string
export type ContentApiId = string

/**
 * Describe a content-link item as returned by the Episerver
 * Content Delivery API.
 */
export type ContentLink<T extends IContent = IContent> = {
  id: number
  workId?: number
  guidValue: string
  providerName?: string
  url: string
  expanded?: T
}

export default ContentLink