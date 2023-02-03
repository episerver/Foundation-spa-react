// React
import type { PropsWithChildren, FunctionComponent } from 'react'
import React from 'react'

// Next.JS
import { useRouter } from 'next/router'

// Material UI
import Grid from '@mui/material/Grid'

// Optimizely CMS
import type { ContentAreaContainer, ContentAreaProps } from '@optimizely/cms/content-area'
import type { IContent, IContentData } from '@optimizely/cms/models'
import BaseContentArea from '@optimizely/cms/content-area'
import { useOptimizelyCms } from '@optimizely/cms/context'

// Local imports
import StyledContentAreaItem from './ContentAreaItem'

/**
 * Wrapper for the default Content Area, configuring it for the layout system
 * of Foundation Spa React.
 * 
 * @param       props   The properties for this component
 * @returns     The rendered component
 */
export const ContentArea = <T extends IContent = IContentData, I extends T | undefined = T | undefined>(props: PropsWithChildren<ContentAreaProps<T, I>>) => 
{
    const router = useRouter()
    const opti = useOptimizelyCms()
    const language = router.locale ?? router.defaultLocale ?? opti.defaultBranch  ?? 'en'
    const newProps : ContentAreaProps<T, I> = {
        language,
        container: StyledContentArea,
        itemContainer: StyledContentAreaItem,
        passEpiData: true,
        ...props
    }
    const children = (newProps as PropsWithChildren<ContentAreaProps<T,I>>).children
    if ((newProps as PropsWithChildren<ContentAreaProps<T,I>>).children)
        delete (newProps as PropsWithChildren<ContentAreaProps<T,I>>).children
    return <BaseContentArea {...newProps}>{ children }</BaseContentArea>
}
(ContentArea as FunctionComponent<ContentAreaProps<IContent, IContent>>).displayName = "Foundation Decoupled: Pre-configured ContentArea"

export const StyledContentArea : ContentAreaContainer = props =>
{
    if (props.dataEpiEdit) 
        return <Grid container direction="row" justifyContent="center" alignItems="stretch" data-epi-edit={ `${ props.dataEpiEdit }` }>{ props.children }</Grid>
    return <Grid container direction="row" justifyContent="center" alignItems="stretch">{ props.children }</Grid>
}
StyledContentArea.displayName = "Foundation Decoupled: ContentArea Container"

export default ContentArea