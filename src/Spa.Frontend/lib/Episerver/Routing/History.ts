import ViewContext from '../Repository/ViewContext';
import EpiContext, { IEpiserverSpaContext } from "../Spa";

export default class History {
    public static setupPageBinding(context: IEpiserverSpaContext) {
        const config = context.config();
        const events = context.events();

        jQuery(window).on('click', (event) => {
            let target : HTMLElement = event.target as any as HTMLElement;
            let link : JQuery<HTMLElement>;
            let newPath : string = null;
            let currentUrl : URL = new URL(window.location.href);
            if (target.tagName == 'A') {
                let targetUrl : URL = new URL((target as HTMLAnchorElement).href);
        
                //Only act if we remain on the same domain
                if (targetUrl.origin == currentUrl.origin) {
                    newPath = targetUrl.pathname;
                }
            } else if ((link = jQuery(target).parents('a').first()).length) {
                let targetUrl : URL = new URL((link.get(0) as HTMLAnchorElement).href);
        
                //Only act if we remain on the same domain
                if (targetUrl.origin == currentUrl.origin) {
                    newPath = targetUrl.pathname;
                }
            }
        
            if (newPath == currentUrl.pathname) {
                if (config.enableDebug) console.warn("Ignoring navigation to same path");
                event.preventDefault();
                return false;
            }
        
            if (newPath) {
                events.dispatch('onNavigateStart', newPath);
                if (config.basePath && newPath.substr(0, config.basePath.length) == config.basePath) {
                    newPath = newPath.substr(config.basePath.length);
                    if (newPath.substr(0,1) != '/') newPath = '/' + newPath; //Ensure we've an absolute path
                }
                context.loadContentByPath(newPath).then ((iContent) => {
                    context.dispatch(ViewContext.updateCurrentPath(newPath));
                    this.pushPath(newPath);
                    window.scrollTo(0,0);
                    events.dispatch('onNavigateEnd', newPath);
                });
                event.preventDefault();
                return false;
            }
        });
        window.onpopstate = (event: PopStateEvent) => {
            let newPath : string = window.location.pathname;
            if (config.basePath && newPath.substr(0, config.basePath.length) == config.basePath) {
                newPath = newPath.substr(config.basePath.length);
            }
            context.loadContentByPath(newPath).then((iContent) => {
                context.dispatch(ViewContext.updateCurrentPath(newPath));
            });
        };
    }

    public static pushPath(newPath: string) {
        if (window.history && window.history.pushState) {
            let spaPath = (EpiContext.config().basePath != '/' ? EpiContext.config().basePath : '') + newPath;
            window.history.pushState({}, '', spaPath);
        }
    }
}