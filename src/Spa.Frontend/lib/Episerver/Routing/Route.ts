import { EpiComponentType, ComponentProps } from '../EpiComponent';
import IContent from '../Models/IContent';

/**
 * Base type of the callback that's mandatory to do custom matching
 */
type RouteMatchCallback = (path: string) => boolean

type RouteProperty = RegExp | RouteMatchCallback;
/**
 * Test if the route property for the Route object is of the RegExp or
 * RouteMatchCallback type
 * 
 * @param toTest    The value to test
 */
export function isRegExpRoute(toTest: RouteProperty): toTest is RegExp
{
    if ((toTest as RegExp).exec) {
        return true;
    }
    return false;
}

/**
 * The route type definition to be used by implementations to define 
 * routes that are not present whithin Episerver.
 */
export default interface Route
{
    /**
     * The regular expression that should match the requested path to apply 
     * this route.
     */
    route: RouteProperty

    /**
     * The type of React Component that must be instantieated to render the 
     * route. This is only needed if it cannot be derived from the properties
     * you'll be providing as response from the getProperties() method.
     */
    component?: EpiComponentType

    /**
     * The sort order to use when multiple routes match a given path.
     */
    sortOrder?: number

    /**
     * Method which constructs the properties that will be provided to the
     * component to be instantieated.
     */
    getContent(): IContent
}