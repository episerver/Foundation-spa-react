import ContentLink from '../Models/ContentLink'
import IContent from '../Models/IContent'
import Website from '../Models/Website'

type IContentOrSerialized = IContent | string;
type ContentLinkOrSerialzed = ContentLink | string;
type WebsiteOrSerialzed = Website | string;

export function isSerializedIContent(data: IContentOrSerialized) : data is string {
    return typeof(data) == "string";
}
export function isSerializedContentLink(data: ContentLinkOrSerialzed) : data is string {
    return typeof(data) == "string";
}
export function isSerializedWebsite(data: WebsiteOrSerialzed) : data is string {
    return typeof(data) == "string";
}

/**
 * The TypeScript definition of the ServerContext being passed from .Net to the
 * React Application.
 */
export default interface ServerContext {
    /**
     * Window.location compatible location object. 
     */
    Location: any;

    /**
     * The current Path of the request being handled
     */
    Path: string

    /**
     * The IContent passed from the execution (JSON Encoded)
     */
    IContent: IContentOrSerialized

    /**
     * The ContentLink passed from the execution (JSON Encoded)
     */
    ContentLink: ContentLinkOrSerialzed

    /**
     * The Current Website (JSON encoded)
     */
    Website: WebsiteOrSerialzed

    /**
     * The content of the the current start page (JSON Encoded)
     */
    StartPageData: IContentOrSerialized
}