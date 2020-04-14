import EpiComponent from './EpiComponent';
import IContent from './Models/IContent';

export enum PageType {
    Home = "home",
    Product = "product",
    Category = "category",
    Basket = "basket",
    Other = "other"
}

export default abstract class Page<P extends IContent, S = {}, SS = {}> extends EpiComponent<P, S, SS>
{
    /**
     * The page type of the current page being rendered
     */
    protected pageType: PageType = PageType.Other;

    /**
     * Make sure page tracking is done when a page is being rendered 
     * 
     * This method cannot be overridden in sub-classes, use the pageDidMount method, that
     * is invoked by this class as direct replacement.
     */
    public readonly componentDidMount = (): void =>
    {
        /*let initialContent = EpiContext.Instance.getInitialContentLink();
        if (!(initialContent && initialContent.guidValue == this.props.data.contentLink.guidValue)) {
            //Only track if we're not the initial page
            let trackingData = this.buildTrackingData();
            if (this.isDebugActive()) {
                console.debug("ProductRecs tracking data: ", trackingData);
            }
            if (trackingData) Engine.trackPageView(trackingData);
        }*/
        if (this.pageDidMount) this.pageDidMount();
    }
    
    /**
     * This method creates the tracking data as send to the the Episerver tracking service
     */
    protected readonly buildTrackingData = () : any =>
    {
        let trackingData : any = {};
        if (this.pageWillTrack) trackingData = this.pageWillTrack(trackingData);
        return trackingData;
    }

    /**
     * Retrieve the path of the current page
     */
    protected readonly getPagePath = () : string =>
    {
        return this.getCurrentContentLink().url;
    }

    /**
     * Build an action URL
     */
    protected readonly buildActionPath = (action: string) : string =>
    {
        return (this.getPagePath() + '/' + action + '/').replace('//', '/');
    }

    /**
     * Lifecycle call, implement this method instead of the React standard
     * componentDidMount.
     */
    protected pageDidMount?() : void

    /**
     * Lifecycle call, invoked just before the page will be tracked. It should
     * return the tracking data for the page. If nothing is returned, the page
     * will not be tracked.
     * 
     * @param   data    The initial data for tracking
     */
    protected pageWillTrack?(data: any) : any 
}