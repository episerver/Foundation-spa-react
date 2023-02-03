import type { IContentComponent } from "@optimizely/cms/models"
import type { ContainerBlock } from "schema"
import React from "react"
import ContentArea from '@components/shared/Utils/ContentArea' 
import { readValue as pv, prefetchContentAreaRecursive } from '@optimizely/cms/utils'
import Box from '@mui/material/Box'

export const ContainerBlockComponent : IContentComponent<ContainerBlock> = props => {
    const backgroundColor = pv(props.content, "backgroundColor") ?? undefined
    const opacity = pv(props.content, "blockOpacity") ?? undefined
    if (!props.content)
        return <></>
    return <Box sx={{ backgroundColor, opacity }}>
        <ContentArea content={ props.content } name="mainContentArea" />
    </Box>
}

ContainerBlockComponent.getStaticProps = async (content, { locale, inEditMode, api, loader }) => {
    return {
        fallback: await prefetchContentAreaRecursive(content, [{ name: "mainContentArea" }], locale, inEditMode == true, undefined, api, loader)
    }
}

ContainerBlockComponent.displayName = "CMS-Component: ContainerBlock"

export default ContainerBlockComponent