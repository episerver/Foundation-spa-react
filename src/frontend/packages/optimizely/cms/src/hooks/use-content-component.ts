import type { ContentTypePath } from '../models/content-type-path'
import type { IContentComponent } from '../models/components'
import type { ComponentType } from 'react'
import { useRef, useState, useEffect, useMemo } from 'react'
import { useOptimizelyCms } from '../provider/index'

export type UseContentComponentResult<T extends ComponentType = IContentComponent> = {
    loading: boolean
    data?: T | undefined
    error: boolean
    id?: string
    importPath?: string
}

export function useContentComponent<T extends ComponentType = IContentComponent, PropsType = T extends ComponentType<infer R> ? R : any>(contentTypePath ?: ContentTypePath, prefix?: string, tag?: string) : UseContentComponentResult<T>
{
    // Get a reference to the loader from the CMS
    const { loader } = useOptimizelyCms()

    // Recalculate the parameters only when the context changes
    const { id, importPath, typePath } = useMemo(() => {
        const typePath = contentTypePath ?? ['OptiContentLoading']
        const id = `${ typePath.join('/') }::p-${ prefix ?? "default"}::t-${ tag ?? "default "}`
        const importPath = loader?.buildComponentImport(typePath, prefix, tag)
        return { id, importPath, typePath }
    }, [ loader, contentTypePath, prefix, tag ])
    
    // Update the fields & references
    const contentComponent = useRef<T | undefined>()
    const [loadedComponentType, setLoadedComponentType] = useState<string>(contentComponent.current ? id : "-")
    const [ isError, setIsError ] = useState<boolean>(false)
    contentComponent.current = loader?.tryDynamicSync<PropsType>(typePath, prefix, tag) as T | undefined

    // Fall back to async in case we don't have the component yet
    useEffect(() => {
        let isCancelled = false
        if (!loader) return
        if (contentComponent.current) return

        loader.tryDynamicAsync<PropsType>(typePath, prefix, tag).then(x => {
            if (isCancelled) return
            if (!x) {
                setIsError(true)
                return
            }
            contentComponent.current = x as T | undefined
            setLoadedComponentType(id)
        })

        return () => {
            isCancelled = true
        }
    }, [ loader, typePath, prefix, tag, id ])

    return {
        loading: loadedComponentType === "-",
        data: contentComponent.current,
        error: isError,
        id,
        importPath
    }
}

export default useContentComponent