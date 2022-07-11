import type { IContentData, Property, IContentComponent } from '@optimizely/cms/models'
import type { ContentDelivery } from '@optimizely/cms'
import { ComponentLoader } from '@optimizely/cms'

function isPromise<T>(toTest: any) : toTest is Promise<T>
{
    return typeof(toTest) === 'object' && toTest !== null && typeof(toTest.then) === 'function'
}

export type FilteredContentWithAdditionalProps = {
    content: IContentData
} & Record<string, Property>

export async function loadAdditionalPropsAndFilter(content: IContentData, api: ContentDelivery.IContentDeliveryAPI, locale?: string, preview?: boolean) : Promise<FilteredContentWithAdditionalProps>
{
    // Load component
    const moduleLoader = ComponentLoader.setup()
    const component = (await moduleLoader.tryDynamicAsync( content.contentType )) as IContentComponent | undefined

    // Load additional props
    const additionalProps = component?.getStaticProps && typeof(component?.getStaticProps) === 'function' ?
        await component.getStaticProps(content, { api, locale: locale }) :
        {}

    // Apply content filter
    let filter = component?.getContentFields ? component?.getContentFields({ inEditMode: preview }) : undefined
    if (isPromise(filter))
        filter = await filter
    if (Array.isArray(filter)) {
        const newContent : IContentData = {
            contentLink: content.contentLink,
            contentType: content.contentType,
            language: content.language,
            name: content.name
        }
        for (const key of Object.getOwnPropertyNames(content))
            if (filter.indexOf(key) >= 0)
                newContent[key] = content[key]
        content = newContent
    }

    return {
        content,
        ...additionalProps
    }
}