import { createContext } from 'react'
import type { ComponentLoader } from '../loader'
import type { IContentDeliveryAPI } from '../content-delivery'
import type { EditModeContentInfo } from '../util/edit-mode'

export type ContextType = {
    api ?: IContentDeliveryAPI
    loader ?: ComponentLoader
    isReady: boolean
    isEditable: boolean
    inEditMode: boolean
    defaultBranch: string
    editableContent?: EditModeContentInfo
    currentContentId?: any
}

export const Context = createContext<ContextType>({
    isReady: false,
    isEditable: false,
    inEditMode: false,
    defaultBranch: 'en'
})

export default Context