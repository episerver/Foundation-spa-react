import IContent from './IContent';
import EpiContext from '../Spa';

export type ContentReference = IContent | ContentLink | string;
export type ContentApiId = string;

export class ContentLinkService {
    private constructor()
    {
        //Just here to prevent instances
    }

    public static referenceIsIContent(ref : ContentReference) : ref is IContent
    {
        if (ref && (ref as IContent).contentType && (ref as IContent).name) {
            return true;
        }
        return false;
    }

    public static referenceIsContentLink(ref: ContentReference) : ref is ContentLink
    {
        if (ref && /*(ref as ContentLink).guidValue &&*/ (ref as ContentLink).id && typeof((ref as ContentLink).id) == "number") {
            return true;
        }
        return false;
    }

    public static referenceIsString(ref: ContentReference) : ref is string
    {
        if (ref && (ref as string).trim) {
            return true;
        }
        return false;
    }

    public static createApiId(ref: ContentReference) : ContentApiId
    {
        if (this.referenceIsString(ref)) {
            return ref;
        }
        let link : ContentLink = null;
        if (this.referenceIsIContent(ref)) {
            link = ref.contentLink;
        }
        if (this.referenceIsContentLink(ref)) {
            link = ref;
        }
        if (link) {
            let out : string = link.id.toString();
            if (link.providerName) {
                out = `${ out }__${ link.providerName }`;
            }
            return out;
        } else {
            return null;
        }
    }

    public static createHref(ref: ContentReference) : string
    {
        if (this.referenceIsIContent(ref)) {
            let path = this.getUrlFromLink(ref.contentLink);
            if (!path && ref.url) {
                return ref.url;
            }
            return path;
        }

        if (this.referenceIsContentLink(ref)) {
            return this.getUrlFromLink(ref);
        }
        
        return null;
    }

    protected static getUrlFromLink(link: ContentLink) {
        let linkUrl = link.url || '';
        if (linkUrl.substr(0,1) == '/') { //Absolute URL
            const basePath : string = EpiContext.config().basePath;
            linkUrl = linkUrl.substr(1);
            return basePath.substr(-1) == '/' ? basePath + linkUrl : basePath + '/' + linkUrl ;
        } else {
            return linkUrl;
        }
    }
}

export default interface ContentLink {
    id: number,
    workId: number,
    guidValue: string,
    providerName: string,
    url: string,
    expanded?: IContent
}