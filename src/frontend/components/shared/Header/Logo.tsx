import type { FunctionComponent } from "react"
import type { ContentLink, IContent } from "@optimizely/cms/models"
import Link from 'next/link'
import Typography from "@mui/material/Typography"
import { Image } from '@optimizely/next-js/components'

export type LogoProps = {
    companyLogo ?: ContentLink<IContent>
    companyName : string
    logoHeight ?: number
    logoWidth ?: number
}

export const Logo : FunctionComponent<LogoProps> = ({ companyLogo, companyName, logoHeight, logoWidth }) => 
{
    logoWidth = logoWidth ?? ((250 / 75) * (logoHeight ?? 75))

    console.log("logoWidth", logoWidth)
    console.log("logoHeight", logoHeight)

    return <Link href="/" passHref>
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
            { companyLogo ? <Image src={ companyLogo } alt={ companyName} height={ logoHeight } width={ logoWidth } /> : companyName }
        </Typography>
    </Link>
}

export default Logo