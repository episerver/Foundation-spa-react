import type { ContentLink } from '../models'

export function isContentLink(toTest: unknown) : toTest is ContentLink
{
    if (typeof(toTest) !== 'object' || toTest === null)
        return false;
    return typeof((toTest as ContentLink).guidValue) == 'string' || typeof((toTest as ContentLink).id) == 'number';
}