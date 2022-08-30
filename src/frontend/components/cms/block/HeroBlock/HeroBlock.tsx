import type { IContentComponent } from "@optimizely/cms/models"
import { readValue as pv } from "@optimizely/cms/utils"
import React from "react"
import { HeroBlock, HeroBlockCallout } from "schema"
import Image from 'next/image'
import AspectRatioBox from '@components/shared/Utils/AspectRatioBox'
import Box from '@mui/material/Box'
import Typography from "@mui/material/Typography"

export const HeroBlockComponent : IContentComponent<HeroBlock> = props => {
    const callout = pv(props.content, "callout") || undefined
    const bgImage = pv(props.content, "backgroundImage")
    const name = pv(props.content, "name") ?? "Hero image"
    const backgroundColor = pv(props.content, "backgroundColor")
    const opacity = undefined //pv(props.content, "blockOpacity")

    const background = bgImage ? <Image src={ bgImage.url} alt={ name } layout="fill" objectFit="cover" /> : <></>
    
    return <AspectRatioBox ratio={{ xs: 0.5, md: 0.33, lg: 0.25 }} background={ background } sx={{ opacity, backgroundColor }} >
            <HeroBlockCalloutComponent content={ callout } />
        </AspectRatioBox>
}

HeroBlockComponent.displayName = "CMS-Component: HeroBlock"

export default HeroBlockComponent

export const HeroBlockCalloutComponent : IContentComponent<HeroBlockCallout> = props => {
    return <Box sx={{ opacity: pv(props.content, "calloutOpacity"), m: { xs: 1, md: 2, lg: 3 }}}>
        <Typography variant="body1" component="div" sx={{ color: pv(props.content, "calloutTextColor") }} dangerouslySetInnerHTML={{ __html: pv(props.content, 'calloutContent') ?? "" }}></Typography>
    </Box>
}