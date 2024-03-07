import type { IContentComponent } from '@optimizely/cms/models'
import { readValue as pv, prefetchContentAreaRecursive } from '@optimizely/cms/utils'
import { TwoColumnLandingPage } from 'schema'
import { ContentArea } from '@components/shared/Utils'
import Head from 'next/head'
import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid';
import { EditableField } from '@optimizely/cms/components'
import StructuredHtml from '@framework/foundation/cms/structuredhtml'
import site from 'website.cjs'

export const TwoColumnLandingPageComponent : IContentComponent<TwoColumnLandingPage> = props => 
{
    const pageTitle = `${ pv(props.content, "name") ?? "TwoColumnLandingPage Page" } :: ${ site.name }`

    let leftCol =  pv(props.content, "leftColumn") ?? 6
    let rightCol = pv(props.content, "rightColumn") ?? 6


    return <>
        <Head>
            <title>{ pageTitle }</title>
            <style>{ pv(props.content, "css") }</style>
            <meta name="x-epi-page-type" content='Optimizely Landing Page'/>
        </Head>
        <Grid container spacing={2}>
            <Grid item xs={12}>       
                <ContentArea content={ props.content } name="topContentArea" />
            </Grid>
            <Grid item xs={12}>
                <EditableField field='mainBody'><StructuredHtml propertyData={ props.content?.mainBody } /></EditableField>
            </Grid>
            <Grid item xs={leftCol}>
                <ContentArea content={ props.content } name="mainContentArea"/>
            </Grid>
            <Grid item xs={rightCol}>
                <ContentArea content={ props.content } name="rightContentArea" />
            </Grid>
        </Grid>
    </>
}

TwoColumnLandingPageComponent.getStaticProps = async (content, { locale, inEditMode, api, loader }) => {
    return {
        fallback: await prefetchContentAreaRecursive(content, [{ name: "mainContentArea" },{ name: "topContentArea" },{ name: "rightContentArea" }], locale, inEditMode == true, undefined, api, loader)
    }
}

TwoColumnLandingPageComponent.displayName = "Two Column Landing Page"

export default TwoColumnLandingPageComponent