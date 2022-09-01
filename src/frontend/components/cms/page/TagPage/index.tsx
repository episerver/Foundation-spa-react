import type { IContentComponent } from '@optimizely/cms/models'
import type { TagPage } from 'schema'

export const Component : IContentComponent<TagPage> = props =>
{
    return <>TagPage { props.content?.name }</>
}

Component.displayName = "Optimizely Foundation: TagPage"

export default Component