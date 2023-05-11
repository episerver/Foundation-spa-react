import type { IContentComponent } from '@optimizely/cms/models'
import { readValue as pv, prefetchContentAreaRecursive } from '@optimizely/cms/utils'
import { LandingPage } from 'schema'
import { ContentArea } from '@components/shared/Utils'
import Head from 'next/head'
import React from 'react'
import Box from '@mui/material/Box'
import { EditableField } from '@optimizely/cms/components'
import StructuredHtml from '@framework/foundation/cms/structuredhtml'
import site from 'website.cjs'

export const LandingPageComponent : IContentComponent<LandingPage> = props => 
{
    const pageTitle = `${ pv(props.content, "name") ?? "Landing Page" } :: ${ site.name }`

    return <>
        <Head>
            <title>{ pageTitle }</title>
            <style>{ pv(props.content, "css") }</style>
            <meta name="x-epi-page-type" content='Optimizely Landing Page'/>
        </Head>
        <Box sx={{marginBlockStart: "0.67em"}}>
            <ContentArea content={ props.content } name="topContentArea" />
            <EditableField field='mainBody'><StructuredHtml propertyData={ props.content?.mainBody } /></EditableField>
            <ContentArea content={ props.content } name="mainContentArea"/>
        </Box>
    </>
}

LandingPageComponent.getStaticProps = async (content, { locale, inEditMode, api, loader }) => {
    return {
        fallback: await prefetchContentAreaRecursive(content, [{ name: "mainContentArea" },{ name: "topContentArea" }], locale, inEditMode == true, undefined, api, loader)
    }
}

LandingPageComponent.displayName = "Single Column Landing Page"

export default LandingPageComponent