import type { SWRResponse } from 'swr';
import type WebsiteInfo from '../models/website-info';
export type UseWebsiteResponse = SWRResponse<WebsiteInfo, any> | undefined;
export declare function useWebsite(fallbackData?: WebsiteInfo, siteDomain?: string, locale?: string): UseWebsiteResponse;
export default useWebsite;
