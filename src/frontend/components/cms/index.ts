import type { ComponentType } from 'react'
import dynamic from 'next/dynamic'

import pages from './page'
import blocks from './block'
import images from './image'

export const CmsComponents : Record<string, ComponentType> = {
    'LayoutSettings': dynamic(() => import(
        /* webpackMode: "lazy-once" */
        /* webpackPrefetch: true */
        /* webpackChunkName: "LayoutSettings" */
        './LayoutSettings'
    ), { ssr: true }),
    ...pages,
    ...blocks,
    ...images
}

export default CmsComponents