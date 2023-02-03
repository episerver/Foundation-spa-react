import type { IContentData } from '@optimizely/cms/models'
import type  { ComponentLoader } from '@optimizely/cms/types'
import type { ContentApiComponentModule, ContentApiComponent } from './types'
import { resolve } from '@optimizely/cms/utils'
import createComponentLoader from '@optimizely/cms/component-loader'

const loadModule = async <AdditionalProps = {}, ContentModel extends IContentData = IContentData>(forItem: ContentModel, prefix?: string, tag?: string, componentLoader?: ComponentLoader) : Promise<ContentApiComponentModule<ContentModel, AdditionalProps> | undefined> => 
{
    const loader = resolve(componentLoader, createComponentLoader)
    const contentType = forItem.contentType

    return loader.tryDynamicModuleAsync<ContentApiComponentModule<ContentModel, AdditionalProps>>(contentType, prefix, tag)
}

export const loadAdditionalProps = async <AdditionalProps = {}, ContentModel extends IContentData = IContentData>(forItem: ContentModel, prefix?: string, tag?: string) : Promise<AdditionalProps | null> => 
{
    const m = await loadModule<AdditionalProps, ContentModel>(forItem, prefix, tag)
    if (m?.loadAdditionalProps) 
        return m.loadAdditionalProps(forItem)
    return null
}

export const loadComponent = async <AdditionalProps = {}, ContentModel extends IContentData = IContentData>(forItem: ContentModel, prefix?: string, tag?: string) : Promise<ContentApiComponent<ContentModel, AdditionalProps> | undefined> => 
{
    return (await loadModule<AdditionalProps, ContentModel>(forItem, prefix, tag))?.default
}