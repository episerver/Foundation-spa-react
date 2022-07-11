import type { IContentComponent, IContent, PropertyLink, PropertyLongString, PropertyXhtmlString, PropertyContentReference } from '@optimizely/cms/models'
import type { PageListBlock } from 'schema'
import React from 'react'
import { readValue as pv } from '@optimizely/cms/utils'
import { EditableField } from '@optimizely/cms/components'
import useContentAction from '@framework/foundation/cms/contentactions'

import Link from 'next/link'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

type IContentTeaser = IContent & {
    pageImage ?: PropertyContentReference
    teaserImage ?: PropertyContentReference
    teaserRation ?: PropertyLongString
    teaserText ?: PropertyXhtmlString
    teaserTextAlignment ?: PropertyLongString
    teaserColorTheme ?: PropertyLongString
    teaserButtonText ?: PropertyLongString
    teaserButtonStyle ?: PropertyLongString
}

export type PageListIndexActionResponse<E = any> = {error: E}|{
    current: IContent
    pages: IContentTeaser[]
    count: number
}

function isErrorResponse<E = any>(toTest: any) : toTest is {error: E}
{
    return typeof(toTest) === 'object' && toTest !== null ? toTest.error != undefined && toTest.error != null : false
}

export const PageListBlockComponent : IContentComponent<PageListBlock> = props => {
    const pageList = useContentAction<PageListIndexActionResponse>(props.content ?? "-1", "index", { urlParams: {select: "name,url,pageImage,teaserImage,teaserRatio,teaserText,teaserTextAlignment,teaserColorTheme,teaserButtonText,teaserButtonStyle"}})
    const data = pageList?.data ?? { error: "No data" }
    const pages = isErrorResponse(data) ? [] : data.pages
    
    const heading = pv(props.content, 'heading')
    return <Box>
        <Typography component="div" variant='h4' ><EditableField field='' inline>{ heading ?? '' }</EditableField></Typography>
        <Grid container direction="row" justifyContent="space-around" alignItems="stretch" spacing={2}>
        { pages.map(teaser => {
            const image = pv(teaser, 'pageImage')?.url
            const name = pv(teaser, 'name') ?? 'Content name'
            const url = pv(teaser, 'url') || '/'
            return <Grid item key={ `teaser-${ props.content?.contentLink.id }-${ teaser.contentLink.id }` } xs={6} md={4}>
        <Card sx={{ height: '100%' }}>
            { image ? <CardMedia component="img" height="140" image={ image } alt={ name} /> : <></> }
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">{ name }</Typography>
                <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{__html: pv(teaser, 'teaserText') ?? ''}} />
            </CardContent>
            <CardActions>
                <Link passHref href={url}>
                    <Button size="small">{ pv(teaser, 'teaserButtonText') ?? 'Continue reading' }</Button>
                </Link>
            </CardActions>
            </Card>
        </Grid>})}
        </Grid>
    </Box>
}

export default PageListBlockComponent