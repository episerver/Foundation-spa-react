import type { IContentData, Property } from '@optimizely/cms/models';
import type { IContentDeliveryAPI } from '@optimizely/cms/types';
export type FilteredContentWithAdditionalProps = {
    content: IContentData;
} & Record<string, Property>;
export declare function loadAdditionalPropsAndFilter(content: IContentData, api: IContentDeliveryAPI, locale?: string, preview?: boolean): Promise<FilteredContentWithAdditionalProps>;
