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
import StructuredHtml from '@framework/foundation/cms/structuredhtml'
import componentFactory from '@components/shared/Utils/factory'

export const TeaserBlockComponent : IContentComponent<TeaserBlock> = props => {
    let imageUrl = pv(props.content, "image")?.url
    const backgroundColor = pv(props.content, "backgroundColor") ?? undefined
    const opacity = pv(props.content, "blockOpacity") ?? undefined
    const headingColor = pv(props.content, "headingColor") ?? undefined
    const rawLinkUrl = pv(props.content, "link")?.url
    const linkUrl = rawLinkUrl ? new URL(rawLinkUrl, 'http://localhost').pathname : undefined
    const buttonText = `Discover ${ (pv(props.content, "heading") ?? "").toLocaleLowerCase() } services`

    if (imageUrl) {
        let imgUrl = new URL(imageUrl)
        imgUrl.searchParams.set('height', '90')
        imgUrl.searchParams.set('width', '450')
        imgUrl.searchParams.set('quality', '80')
        imgUrl.searchParams.set('rmode', 'pad')
        imageUrl = imgUrl.href
    }

    return <Card sx={{ backgroundColor, opacity }}>
            { imageUrl ? <CardMedia image={ imageUrl } sx={{ flexGrow: 0, pb: '20%', mt: 2, backgroundSize: "contain" }} /> : <></> }
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ color: headingColor }}>{ pv(props.content, "heading") }</Typography>
                <StructuredHtml propertyData={ props.content?.text } componentFactory={ componentFactory } />
            </CardContent>
            { linkUrl ? <CardActions>
                <Link href={ linkUrl } passHref legacyBehavior>
                    <Button size="medium" variant="contained" color="secondary">{ buttonText }</Button>
                </Link>
            </CardActions> : <></> }
        </Card>
}

TeaserBlockComponent.getContentFields = () => ['image','backgroundColor','blockOpacity','headingColor','link','text','heading']
TeaserBlockComponent.displayName = "Foundation: Teaser Block"

export default TeaserBlockComponent