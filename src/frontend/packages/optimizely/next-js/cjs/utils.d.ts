import type { IContentData, Property } from '@optimizely/cms/models';
import type { ContentDelivery } from '@optimizely/cms';
export declare type FilteredContentWithAdditionalProps = {
    content: IContentData;
} & Record<string, Property>;
export declare function loadAdditionalPropsAndFilter(content: IContentData, api: ContentDelivery.IContentDeliveryAPI, locale?: string, preview?: boolean): Promise<FilteredContentWithAdditionalProps>;
