import type { IContentComponent } from '@optimizely/cms/models'
import type { BlogListPage } from 'schema'

export const Component : IContentComponent<BlogListPage> = props =>
{
    return <>BlogListPage { props.content?.name }</>
}

Component.displayName = "Optimizely Foundation: Blog List Page"

export default Component