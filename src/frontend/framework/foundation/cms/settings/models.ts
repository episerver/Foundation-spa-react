import { IContent, IContentData } from '@optimizely/cms/models'

export type SettingsResponse<T extends SettingsResponseType = SettingsResponseType> = {
    error: false
    data: T
} | {
    error: true
    message: string
}

export type SettingsResponseType = {
    siteName: string,
    siteId: string
}

export type SettingsContainerList = SettingsResponseType & {
    settingGroups: string[]
}

export type SettingsContainerData<T extends IContent = IContentData> = SettingsResponseType & {
    settingGroup: string,
    settings: T
}

export type SettingsHookData<T extends IContent = IContentData> = SettingsContainerData<T> | {
    error: any
}