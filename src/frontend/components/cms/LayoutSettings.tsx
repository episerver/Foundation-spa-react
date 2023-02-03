import type { IContentComponent } from '@optimizely/cms/models'
import type { LayoutSettings } from 'schema'
import { readValue as pv } from '@optimizely/cms/utils'

export const Component : IContentComponent<LayoutSettings> = props =>
{
    return <div>
        <h1>{ `LayoutSettings: ${ props.content?.name }`}</h1>
        <dl>
            <dt>Company Name:</dt>
            <dd>{ pv(props.content, "companyName") ?? "" }</dd>
        </dl>
    </div>
}

Component.displayName = "Optimizely Foundation: Layout Settings"

export default Component