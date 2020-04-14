import EpiContext from '../Context';
import ContentDeliveryAPI from './ContentDeliveryAPI';
import ServerContext from './ServerContext';
import ContentLink from '../Models/ContentLink';
import IContent from '../Models/IContent';
import Website from '../Models/Website';
import IPathProvider from '../PathProvider';

declare var ssr : ServerContext;

export default class SSRContext extends EpiContext {

    private initialContent: IContent;
    private initialViewModel: any;
    private initialContentLink: ContentLink;

    constructor(pathProvider: IPathProvider)
    {
        super(pathProvider);

        this.website = JSON.parse(ssr.Website);
        this.homePage = this.website?.contentRoots["startPage"];
        this.homePageData = JSON.parse(ssr.StartPageData);
    }

    public getInitialContent(): IContent
    {
        if (!this.initialContent) {
            this.initialContent = JSON.parse(ssr.IContent);
        }
        return this.initialContent;
    }

    public getInitialContentLink(): ContentLink
    {
        if (!this.initialContentLink) {
            this.initialContentLink = JSON.parse(ssr.ContentLink);
        }
        return this.initialContentLink;
    }
}