import type { ComponentType } from "react"
import createDynamicComponent from 'next/dynamic'

export const CmsPageComponents : Record<string, ComponentType> = {
    "page/BlogItemPage":        createDynamicComponent(() => import("./BlogItemPage"), { ssr: true }),
    "page/BlogListPage":        createDynamicComponent(() => import("./BlogListPage"), { ssr: true }),
    "page/FolderPage":          createDynamicComponent(() => import("./FolderPage"), { ssr: true }),
    "page/HomePage":            createDynamicComponent(() => import("./HomePage"), { ssr: true }),
    "page/LandingPage":         createDynamicComponent(() => import("./LandingPage"), { ssr: true }),
    "page/LocationItemPage":    createDynamicComponent(() => import("./LocationItemPage"), { ssr: true }),
    "page/LocationListPage":    createDynamicComponent(() => import("./LocationListPage"), { ssr: true }),
    "page/StandardPage":        createDynamicComponent(() => import("./StandardPage"), { ssr: true }),
    "page/TagPage":             createDynamicComponent(() => import("./TagPage"), { ssr: true }),
}

export default CmsPageComponents