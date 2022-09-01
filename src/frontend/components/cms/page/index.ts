import type { ComponentType } from "react"
import dynamic from 'next/dynamic'

export const CmsPageComponents : Record<string, ComponentType> = {
    "page/BlogItemPage":        dynamic(() => import("./BlogItemPage"), { ssr: true, suspense: true  }),
    "page/BlogListPage":        dynamic(() => import("./BlogListPage"), { ssr: true, suspense: true }),
    "page/FolderPage":          dynamic(() => import("./FolderPage"), { ssr: true, suspense: true }),
    "page/HomePage":            dynamic(() => import("./HomePage"), { ssr: true, suspense: true }),
    "page/LandingPage":         dynamic(() => import("./LandingPage"), { ssr: true, suspense: true }),
    "page/LocationItemPage":    dynamic(() => import("./LocationItemPage"), { ssr: true, suspense: true }),
    "page/LocationListPage":    dynamic(() => import("./LocationListPage"), { ssr: true, suspense: true }),
    "page/StandardPage":        dynamic(() => import("./StandardPage"), { ssr: true, suspense: true }),
    "page/TagPage":             dynamic(() => import("./TagPage"), { ssr: true, suspense: true }),
}

export default CmsPageComponents