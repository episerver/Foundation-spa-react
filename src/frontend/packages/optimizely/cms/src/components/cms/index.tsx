import type { FC, PropsWithChildren } from 'react'
import React from 'react'

export const EmptyComponent : FC<PropsWithChildren<{}>> = (props) =>
{
    return <>{props.children}</>
}

EmptyComponent.displayName = "Optimizely CMS Empty Component"
export default EmptyComponent