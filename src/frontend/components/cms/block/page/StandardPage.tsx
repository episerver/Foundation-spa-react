import type { IContentComponent } from '@optimizely/cms/models'
import type { StandardPage } from 'schema'

import { readValue as pv } from '@optimizely/cms/utils'
import Link from 'next/link'
import { Typography, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material'
import { HtmlContent } from '@components/shared/Utils'

const defaultName = "Standard Page"

function rls(inp: string) {
    return inp.replace(/\/$/, "")
}

export const StandardPageBlockComponent : IContentComponent<StandardPage> = props =>
{
    const imageUrl = pv(props.content, "pageImage")?.url
    const backgroundColor = pv(props.content, "backgroundColor") ?? undefined
    const opacity = 1.0 //pv(props.content, "blockOpacity") ?? undefined
    const headingColor = pv(props.content, "titleColor") ?? undefined
    const linkUrl = pv(props.content, "url") ?? '#'
    const headingText = pv(props.content, "name") ?? defaultName

    return <Card sx={{
            backgroundColor,
            opacity,
            height: '100%'
        }}>
            { imageUrl ? <CardMedia component="img" height="140" image={ imageUrl } alt=""/> : <></> }
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ color: headingColor }}>{ headingText }</Typography>
                <Typography variant="body2" color="text.secondary" component="div">
                    <HtmlContent html={ pv(props.content, "teaserText") ?? "" } />
                </Typography>
            </CardContent>
            { linkUrl ? <CardActions>
                <Link href={ rls(linkUrl) } passHref>
                    <Button size="medium" variant="outlined">Continue reading: { headingText.toLocaleLowerCase() }</Button>
                </Link>
            </CardActions> : <></> }
        </Card>
}

StandardPageBlockComponent.displayName = "Optimizely Foundation: Standard Page Block"

StandardPageBlockComponent.getContentFields = () => {
    return [ 'pageImage', 'backgroundColor', 'titleColor', 'url', 'name', 'teaserText' ]
}

export default StandardPageBlockComponent