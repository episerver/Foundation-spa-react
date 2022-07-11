import type { IContentComponent } from '@optimizely/cms/models'
import type { TeaserBlock } from 'schema'
import React from 'react'
import { readValue as pv } from '@optimizely/cms/utils'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link'
import { HtmlContent } from '@components/shared/Utils'

function rls(inp: string) {
    return inp.replace(/\/$/, "")
}

export const TeaserBlockComponent : IContentComponent<TeaserBlock> = props => {
    const imageUrl = pv(props.content, "image")?.url
    const backgroundColor = pv(props.content, "backgroundColor") ?? undefined
    const opacity = pv(props.content, "blockOpacity") ?? undefined
    const headingColor = pv(props.content, "headingColor") ?? undefined
    const linkUrl = pv(props.content, "link")?.url

    return <Card sx={{
            backgroundColor,
            opacity,
            height: '100%'
        }}>
            { imageUrl ? <CardMedia component="img" height="140" image={ imageUrl } alt=""/> : <></> }
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ color: headingColor }}>{ pv(props.content, "heading") }</Typography>
                <Typography variant="body2" color="text.secondary" component="div">
                    <HtmlContent html={ pv(props.content, "text") ?? "" } />
                </Typography>
            </CardContent>
            { linkUrl ? <CardActions>
                <Link href={ rls(linkUrl) } passHref>
                    <Button size="medium" variant="outlined">Discover { (pv(props.content, "heading") ?? "").toLocaleLowerCase() } services</Button>
                </Link>
            </CardActions> : <></> }
        </Card>
}

TeaserBlockComponent.getContentFields = () => ['image','backgroundColor','blockOpacity','headingColor','link','text','heading']
TeaserBlockComponent.displayName = "Foundation: Teaser Block"

export default TeaserBlockComponent