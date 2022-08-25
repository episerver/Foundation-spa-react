import type { ComponentType } from 'react'
import createDynamicComponent from 'next/dynamic'

import pages from './page'
import blocks from './block'
import images from './image'

export const CmsComponents : Record<string, ComponentType> = {
    'LayoutSettings': createDynamicComponent(() => import('./LayoutSettings'), { ssr: true }),
    ...pages,
    ...blocks,
    ...images
}

export default CmsComponents