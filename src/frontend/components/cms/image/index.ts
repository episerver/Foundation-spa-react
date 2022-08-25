import type { ComponentType } from "react"
import createDynamicComponent from 'next/dynamic'

export const CmsPageComponents : Record<string, ComponentType> = {
    "image/media/ImageMediaData": createDynamicComponent(() => import("./media/ImageMediaData"), { ssr: true }),
}

export default CmsPageComponents