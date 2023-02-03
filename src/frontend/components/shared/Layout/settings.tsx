import type { LayoutSettings as LayoutSettingsData } from '../../../schema'
import { useSettings, hasSettingsData } from '@framework/foundation/cms/settings'
import { useOptimizelyCms } from '@optimizely/cms/context'

const LAYOUT_SETTINGS_GROUP = "LayoutSettings"

export type UseLayoutSettingsHook = (locale?: string, siteId?: string) => LayoutSettingsData | undefined

export const useLayoutSettings : UseLayoutSettingsHook = (locale, siteId) => {
    const { defaultBranch, defaultSiteId } = useOptimizelyCms()
    const { data } = useSettings<LayoutSettingsData>(LAYOUT_SETTINGS_GROUP, locale ?? defaultBranch, siteId ?? defaultSiteId)
    return hasSettingsData(data) ? data.settings : undefined
}
