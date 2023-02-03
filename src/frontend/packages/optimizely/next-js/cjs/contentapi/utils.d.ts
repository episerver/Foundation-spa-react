import type { IContentData } from '@optimizely/cms/models';
import type { ContentApiComponent } from './types';
export declare const loadAdditionalProps: <AdditionalProps = {}, ContentModel extends IContentData = IContentData>(forItem: ContentModel, prefix?: string, tag?: string) => Promise<AdditionalProps | null>;
export declare const loadComponent: <AdditionalProps = {}, ContentModel extends IContentData = IContentData>(forItem: ContentModel, prefix?: string, tag?: string) => Promise<ContentApiComponent<ContentModel, AdditionalProps> | undefined>;
