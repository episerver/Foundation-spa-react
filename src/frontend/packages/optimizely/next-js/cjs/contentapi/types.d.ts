import type { ComponentType } from 'react';
import type { IContentData, ContentTypePath } from '@optimizely/cms/models';
export type ContentApiComponent<ContentModel extends IContentData = IContentData, AdditionalProps = {}> = ComponentType<ContentApiProps<ContentModel, AdditionalProps>>;
export type ContentApiProps<ContentModel extends IContentData = IContentData, AdditionalProps = {}> = {
    contentType: ContentTypePath;
    content: ContentModel;
    contentId: string;
} & AdditionalProps;
export type ContentApiComponentModule<ContentModel extends IContentData = IContentData, AdditionalProps = {}> = {
    default: ContentApiComponent<ContentModel, AdditionalProps>;
    loadAdditionalProps?: (forItem: ContentModel) => Promise<AdditionalProps | null>;
};
export type CAC = ContentApiComponent;
