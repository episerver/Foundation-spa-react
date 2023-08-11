import type { ComponentType } from "react"
import dynamic from 'next/dynamic'

export const CmsPageComponents : Record<string, ComponentType> = {
    "page/BlogItemPage":        dynamic(() => import("./BlogItemPage"), { ssr: true  }),
    "page/BlogListPage":        dynamic(() => import("./BlogListPage"), { ssr: true }),
    "page/FolderPage":          dynamic(() => import("./FolderPage"), { ssr: true }),
    "page/HomePage":            dynamic(() => import("./HomePage"), { ssr: true }),
    "page/LandingPage":         dynamic(() => import("./LandingPage"), { ssr: true }),
	"page/TwoColumnLandingPage":dynamic(() => import("./TwoColumnLandingPage"), { ssr: true }),
    "page/ThreeColumnLandingPage":dynamic(() => import("./ThreeColumnLandingPage"), { ssr: true }),    
    "page/LocationItemPage":    dynamic(() => import("./LocationItemPage"), { ssr: true }),
    "page/LocationListPage":    dynamic(() => import("./LocationListPage"), { ssr: true }),
    "page/StandardPage":        dynamic(() => import("./StandardPage"), { ssr: true }),
    "page/TagPage":             dynamic(() => import("./TagPage"), { ssr: true }),
    "page/UnknownTypePage":     dynamic(() => import("./UnknownTypePage"), { ssr: true })
}

export default CmsPageComponents