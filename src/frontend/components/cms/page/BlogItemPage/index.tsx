import type { IContentComponent } from '@optimizely/cms/models'
import type { BlogItemPage } from 'schema'

export const Component : IContentComponent<BlogItemPage> = props =>
{
    return <>BlogItemPage { props.content?.name }</>
}

Component.displayName = "Optimizely Foundation: Blog Item Page"

export default Component