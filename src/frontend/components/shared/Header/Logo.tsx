import type { FunctionComponent } from "react"
import type { ContentLink, IContent } from "@optimizely/cms/models"
import Link from 'next/link'
import Typography from "@mui/material/Typography"
import { Image } from '@optimizely/next-js/components'
import { useMemo } from 'react'

export type LogoProps = {
    companyLogo ?: ContentLink<IContent>
    companyName : string
    logoHeight ?: number
    logoWidth ?: number
}

export const Logo : FunctionComponent<LogoProps> = ({ companyLogo, companyName, logoHeight, logoWidth }) => 
{
    
    const renderLogoWidth = useMemo(() => logoWidth ?? ((250 / 75) * (logoHeight ?? 75)), [ logoWidth, logoHeight ])
    const renderLogoHeight = logoHeight

    return <Link href="/" passHref legacyBehavior>
        <Typography variant="h6" noWrap component="a" sx={{ 
            mr: {
                xs: 'inherit',
                md: 2
            },
            my: {
                xs: 1
            },
            ml: {
                xs: 'inherit',
                md: 0
            },
            flexGrow: {
                xs: 1,
                md: 0
            },
            order: {
                xs: 2,
                md: 1
            },
            display: 'flex'
        }} >
            { companyLogo ? <Image className="optiReact__site-logo" src={ companyLogo } alt={ companyName} height={ renderLogoHeight } width={ renderLogoWidth } priority /> : companyName }
        </Typography>
    </Link>
}

export default Logo