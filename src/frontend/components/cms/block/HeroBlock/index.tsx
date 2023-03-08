import type { IContentComponent } from "@optimizely/cms/models"
import { readValue as pv } from "@optimizely/cms/utils"
import React from "react"
import { HeroBlock, HeroBlockCallout } from "schema"
import Image from 'next/image'
import AspectRatioBox from '@components/shared/Utils/AspectRatioBox'
import Box from '@mui/material/Box'
import StructuredHtml from "@framework/foundation/cms/structuredhtml"
import componentFactory from "@components/shared/Utils/factory"

export const HeroBlockComponent : IContentComponent<HeroBlock> = props => {
    const callout = pv(props.content, "callout") || undefined
    const bgImage = pv(props.content, "backgroundImage")
    const name = pv(props.content, "name") ?? "Hero image"
    const backgroundColor = pv(props.content, "backgroundColor")
    const opacity = undefined //pv(props.content, "blockOpacity")

    const background = bgImage ? <Image src={ bgImage.url} alt={ name } fill priority style={{ objectFit: "cover" }} /> : <></>
    
    return <AspectRatioBox className="optiReact__hero-block" ratio={{ xs: 0.5, md: 0.33, lg: 0.25 }} background={ background } sx={{ opacity, backgroundColor }} >
            <HeroBlockCalloutComponent content={ callout } />
        </AspectRatioBox>
}

HeroBlockComponent.displayName = "CMS-Component: HeroBlock"

export default HeroBlockComponent

export const HeroBlockCalloutComponent : IContentComponent<HeroBlockCallout> = ({ content }) => {
    return <Box sx={{ opacity: pv(content, "calloutOpacity"), m: { xs: 1, md: 2, lg: 3 }, color: pv(content, "calloutTextColor") }}>
        <StructuredHtml propertyData={ content?.calloutContent } componentFactory={ componentFactory } />
    </Box>
}