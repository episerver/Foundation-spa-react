import { Models } from '@optimizely/cms'

export type Node = Models.IContentData & {
    assets: string[]
    code: Models.StringProperty
    catalogId: Models.NumberProperty
}

export default Node