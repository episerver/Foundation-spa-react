
import type { FunctionComponent, PropsWithChildren, ComponentProps } from 'react'
import type { OptimizelyCmsProps } from './cms'
import type { OptimizelyEditModeProps } from './edit-mode'
import { SWRConfig } from 'swr'     
import React from 'react'
import { OptimizelyCms } from './cms'
import { OptimizelyEditMode } from './edit-mode'

// Export Hooks from individual providers
export { useOptimizelyCms } from './cms'
export { useEditMode, useContentEditMode } from './edit-mode'

export type OptimizelyCmsContextProps = OptimizelyCmsProps & OptimizelyEditModeProps & { swrOptions?: SWROptions }
export type SWROptions =  ComponentProps<typeof SWRConfig>["value"]

export const OptimizelyCmsContext : FunctionComponent<PropsWithChildren<OptimizelyCmsContextProps>> = ({children, cmsDomain, ComponentLoaderClass, cmsPath, cmsVersion, communicatorFile, components, currentUrl, defaultBranch, defaultSiteId, swrOptions }) => 
{
    return <OptimizelyCms cmsDomain={ cmsDomain } ComponentLoaderClass={ ComponentLoaderClass } components={ components } defaultBranch={ defaultBranch } defaultSiteId={ defaultSiteId }>
        <SWRConfig value={ swrOptions }>
            <OptimizelyEditMode cmsDomain={ cmsDomain } cmsPath={ cmsPath } cmsVersion={ cmsVersion } communicatorFile={ communicatorFile } currentUrl={ currentUrl }>
                { children }
            </OptimizelyEditMode>
        </SWRConfig>
    </OptimizelyCms>
}
OptimizelyCmsContext.defaultProps = {
    ...OptimizelyCms.defaultProps,
    ...OptimizelyEditMode.defaultProps
}
OptimizelyCmsContext.displayName = "Optimizely CMS: Context"

export default OptimizelyCmsContext