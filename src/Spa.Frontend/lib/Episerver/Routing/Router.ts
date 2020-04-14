import EpiContext from '../Context';
import Route, { isRegExpRoute } from './Route';

export default class Router {
    protected routes : Array<Route>

    public constructor()
    {
        this.routes = EpiContext.Instance.getConfiguration().routes || [];
        this.routes = this.routes.sort((a: Route, b: Route) : number => {
            let aSort = a.sortOrder || 0;
            let bSort = b.sortOrder || 0;
            return aSort < bSort ? -1 : (aSort > bSort ? 1 : 0);
        });
    }

    public hasRoute(path: string) : boolean
    {
        let hasRoute = this.routes.some((route : Route) : boolean => {
            return this.match(route, path);
        });
        return hasRoute;
    }

    public getRoute(path: string) : Route
    {
        let myRoute : Route = null;
        this.routes.forEach((route : Route) : void => {
            if (!myRoute && this.match(route, path)) {
                myRoute = route;
            }
        });
        return myRoute;
    }

    protected match(route: Route, path: string) : boolean
    {
        if (isRegExpRoute(route.route)) {
            let result = route.route.exec(path);
            return result && result.length > 0;
        }
        return route.route(path);
    }
}