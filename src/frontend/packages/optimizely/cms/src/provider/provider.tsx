import type { FunctionComponent, PropsWithChildren } from 'react'
import type { ContextType as OptimizelyContextType } from './context'
import type { ComponentLoaderStatic } from '../loader/types'
import type { OptiEvents } from '../opti-on-page-editing'
import { setup as createComponentLoader } from '../loader/index'
import React, { useMemo } from 'react'
import OptimizelyContext from './context'
import { createInstance as createCdApi } from '../content-delivery/index'
import { useContentEditing } from '../hooks'

export type ContextProviderProps = {
    cmsDomain: string
    cmsVersion ?: string
    cmsPath ?: string
    communicatorFile ?: string
    ComponentLoaderClass ?: ComponentLoaderStatic
    defaultBranch ?: string
    currentContentId ?: any
}

const COMMUNICATOR_CMS_PATH = 'episerver/cms'
const COMMUNICATOR_FILE = 'clientresources/epi-cms/communicationInjector.js'

export const ContextProvider : FunctionComponent<PropsWithChildren<ContextProviderProps>> = ( { defaultBranch, cmsDomain, children, cmsPath, cmsVersion, communicatorFile, ComponentLoaderClass, currentContentId } ) =>
{
    // Prepare default values
    const contentEditing = useContentEditing({ cmsDomain, cmsPath, cmsVersion: cmsVersion as string, communicatorFile })
    const api = useMemo(() => createCdApi({ defaultBranch: defaultBranch }), [ defaultBranch ])
    const loader = useMemo(() => createComponentLoader({loaderType : ComponentLoaderClass}), [ ComponentLoaderClass ])
    const withActionsAndEvents = useMemo<OptimizelyContextType>(() => {
        return {
            api,
            loader,
            defaultBranch: defaultBranch || "en",
            inEditMode: contentEditing.inEditMode,
            isEditable: contentEditing.inEditMode,
            isReady: contentEditing.loading === false,
            currentContentId: currentContentId,
            editableContent: contentEditing.info
        }
    }, [api, loader, defaultBranch, contentEditing, currentContentId])

    return <OptimizelyContext.Provider value={ withActionsAndEvents }>{ children }</OptimizelyContext.Provider>
}
ContextProvider.defaultProps = {
    cmsPath: COMMUNICATOR_CMS_PATH,
    communicatorFile: COMMUNICATOR_FILE,
    cmsVersion: 'latest',
    defaultBranch: 'en'
}
export default ContextProvider;

export class OptimizelyContentEvent<K extends keyof OptiEvents> extends Event
{
    private _data : OptiEvents[K]

    public get data() : OptiEvents[K] {
        return this._data
    }

    public constructor(name: K, init: (EventInit & { data : OptiEvents[K] }) )
    {
        super(name, init)
        this._data = init.data
    }
}