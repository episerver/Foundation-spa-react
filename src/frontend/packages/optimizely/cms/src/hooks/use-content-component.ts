import type { ContentTypePath } from '../models/content-type-path'
import type { IContentComponent } from '../models/components'
import type { ComponentType } from 'react'
import { useRef, useState, useEffect, useMemo } from 'react'
import { useOptimizely } from '../provider/use'

export type UseContentComponentResult<T extends ComponentType = IContentComponent> = {
    loading: boolean
    data?: T
    error: boolean
    id?: string
    importPath?: string
}

export function useContentComponent<T extends ComponentType = IContentComponent, PropsType = T extends ComponentType<infer R> ? R : any>(contentTypePath ?: ContentTypePath, prefix?: string, tag?: string) : UseContentComponentResult<T>
{
    const opti = useOptimizely()
    const loader = opti?.loader
    const typePath = useMemo(() => contentTypePath ?? ['OptiContentLoading'], [ contentTypePath])
    const id = `${ typePath.join('/') }::p-${ prefix ?? "default"}::t-${ tag ?? "default "}`
    const contentComponent = useRef<T | undefined>()
    const [loadedComponentType, setLoadedComponentType] = useState<string>(contentComponent.current ? id : "-")
    const [ isError, setIsError ] = useState<boolean>(false)
    contentComponent.current = loader?.tryDynamicSync<PropsType>(typePath, prefix, tag) as T | undefined
    const importPath = loader?.buildComponentImport(typePath, prefix, tag)
    //console.log("ContentComponent.Current", loader, contentTypePath, contentComponent.current);

    useEffect(() => {
        let isCancelled = false
        if (!loader) return

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
        data: contentComponent.current as T,
        error: isError,
        id,
        importPath
    }
}

export default useContentComponent