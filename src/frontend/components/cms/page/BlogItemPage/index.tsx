import type { IContentComponent } from '@optimizely/cms/models'
import type { BlogItemPage } from 'schema'
import { EditableField, ContentComponent } from '@optimizely/cms/components'
import { readValue as pv } from '@optimizely/cms/utils'
import StructuredHtml from '@framework/foundation/cms/structuredhtml'
import factory from '@components/shared/Utils/factory'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Head from 'next/head'
import React from 'react'
import { Breadcrumbs } from '@components/shared'

export const Component : IContentComponent<BlogItemPage> = ({ content, locale }) =>
{
    if (!content)
        return null

    const metaTitle = pv(content, "metaTitle") ?? pv(content, "name") ?? "Unnamed blog post"
    const metaDescription = pv(content, "pageDescription") ?? ""
    const css = pv(content, "css")
    const pageImage = pv(content, "pageImage")

    return <Grid container sx={{ justifyContent: "space-between" }}>    
        <Head>
            <title>{ metaTitle }</title>
            <meta name="description" content={ metaDescription } />
            { css && <style>{ css }</style> }
        </Head>
        
        { pageImage && <Grid item xs={12}><ContentComponent content={ pageImage } locale={ locale } /></Grid> }
        <Grid item xs={12}><EditableField field='name'><Typography variant='h1'>{ pv(content, "name") ?? "Unnamed blog post" }</Typography></EditableField></Grid>
        <Grid item><Typography variant='body2' sx={{ my: 2 }}>Published by: <EditableField field='author' inline>{ pv(content, "author") ?? "Anonymous author" }</EditableField></Typography></Grid>
        <Grid item sx={{ pb: 2 }}><Breadcrumbs /></Grid>
        <Grid item><Typography variant='body2' sx={{ my: 2 }}>Published at: <EditableField field='startPublish' inline>{ (new Date(Date.parse(pv(content, "startPublish") ?? ''))).toLocaleString() }</EditableField></Typography></Grid>
        <Grid item xs={12}><EditableField field='mainBody'><StructuredHtml propertyData={ content.mainBody } componentFactory={factory} component='div' /></EditableField></Grid>
    </Grid>
}

Component.displayName = "Optimizely Foundation: Blog Item Page"

export default Component