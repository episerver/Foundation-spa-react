import type { IContentComponent } from '@optimizely/cms/models'
import type { FolderPage } from 'schema'

export const Component : IContentComponent<FolderPage> = props =>
{
    return <>FolderPage { props.content?.name }</>
}

Component.displayName = "Optimizely Foundation: FolderPage"

export default Component