import type { ComponentType } from "react"
import createDynamicComponent from 'next/dynamic'

export const CmsPageComponents : Record<string, ComponentType> = {
    "block/ContainerBlock": createDynamicComponent(() => import(
        /* webpackChunkName: "block-container" */
        /* webpackMode: "lazy-once" */
        "./ContainerBlock"
    ), { ssr: true }),
    "block/FormContainerBlock": createDynamicComponent(() => import(
        /* webpackChunkName: "block-form-container" */
        /* webpackMode: "lazy-once" */
        "./FormContainerBlock"
    ), { ssr: true }),
    "block/HeroBlock": createDynamicComponent(() => import(
        /* webpackChunkName: "block-hero" */
        /* webpackMode: "lazy-once" */
        "./HeroBlock"
    ), { ssr: true }),
    "block/image/media/ImageMediaData": createDynamicComponent(() => import(
        /* webpackChunkName: "block-image" */
        /* webpackMode: "lazy-once" */
        "./image/media/ImageMediaData"
    ), { ssr: true }),
    "block/OptiContentLoading": createDynamicComponent(() => import(
        /* webpackChunkName: "block-loader" */
        /* webpackMode: "lazy-once" */
        "./OptiContentLoading"
    ), { ssr: true }),
    "block/page/LandingPage": createDynamicComponent(() => import(
        /* webpackChunkName: "block-page-landingpage" */
        /* webpackMode: "lazy-once" */
        "./page/LandingPage"
    ), { ssr: true }),
    "block/page/StandardPage": createDynamicComponent(() => import(
        /* webpackChunkName: "block-page-standardpage" */
        /* webpackMode: "lazy-once" */
        "./page/StandardPage"
    ), { ssr: true }),
    "block/PageListBlock": createDynamicComponent(() => import(
        /* webpackChunkName: "block-page-list" */
        /* webpackMode: "lazy-once" */
        "./PageListBlock"
    ), { ssr: true }),
    "block/TeaserBlock": createDynamicComponent(() => import(
        /* webpackChunkName: "block-teaser" */
        /* webpackMode: "lazy-once" */
        "./TeaserBlock"
    ), { ssr: true }),
    "block/TextBlock": createDynamicComponent(() => import(
        /* webpackChunkName: "block-text" */
        /* webpackMode: "lazy-once" */
        "./TextBlock"
    ), { ssr: true }),
    "block/ButtonBlock": createDynamicComponent(() => import(
        /* webpackChunkName: "block-button" */
        /* webpackMode: "lazy-once" */
        "./ButtonBlock"
    ), { ssr: true }),
}

export default CmsPageComponents