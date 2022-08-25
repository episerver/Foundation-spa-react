import type { ComponentType } from "react"
import createDynamicComponent from 'next/dynamic'

export const CmsPageComponents : Record<string, ComponentType> = {
    "block/ContainerBlock": createDynamicComponent(() => import("./ContainerBlock"), { ssr: true }),
    "block/FormContainerBlock": createDynamicComponent(() => import("./FormContainerBlock"), { ssr: true }),
    "block/HeroBlock": createDynamicComponent(() => import("./HeroBlock"), { ssr: true }),
    "block/image/media/ImageMediaData": createDynamicComponent(() => import("./image/media/ImageMediaData"), { ssr: true }),
    "block/OptiContentLoading": createDynamicComponent(() => import("./OptiContentLoading"), { ssr: true }),
    "block/page/LandingPage": createDynamicComponent(() => import("./page/LandingPage"), { ssr: true }),
    "block/page/StandardPage": createDynamicComponent(() => import("./page/StandardPage"), { ssr: true }),
    "block/PageListBlock": createDynamicComponent(() => import("./PageListBlock"), { ssr: true }),
    "block/TeaserBlock": createDynamicComponent(() => import("./TeaserBlock"), { ssr: true }),
    "block/TextBlock": createDynamicComponent(() => import("./TextBlock"), { ssr: true }),
}

export default CmsPageComponents