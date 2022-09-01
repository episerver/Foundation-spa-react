import type { IContentComponent } from '@optimizely/cms/models'
import { readValue as pv, prefetchContentAreaRecursive } from '@optimizely/cms/utils'
import { LandingPage } from 'schema'
import { ContentArea } from '@components/shared/Utils'
import Head from 'next/head'
import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { EditableField } from '@optimizely/cms/components'

export const LandingPageComponent : IContentComponent<LandingPage> = props => 
{
    const pageTitle = `${ pv(props.content, "name") ?? "Landing Page" } :: Mosey Health`
    const pageImage = pv(props.content, 'pageImage')?.url
    const pageBody = pv(props.content, 'mainBody') ?? undefined

    return <>
        <Head>
            <title>{ pageTitle }</title>
            <style>{ pv(props.content, "css") }</style>
        </Head>
        <Box sx={{marginBlockStart: "0.67em"}}>
            <ContentArea content={ props.content } name="topContentArea" />
            { pageBody ? <EditableField field='mainBody' >
                <Typography dangerouslySetInnerHTML={{__html: pageBody}} variant="body1" />
                </EditableField> : <></>}
            <ContentArea content={ props.content } name="mainContentArea"/>
        </Box>
    </>
}

LandingPageComponent.getStaticProps = async (content, { locale, inEditMode, api }) => {
    return {
        fallback: await prefetchContentAreaRecursive(content, [{ name: "mainContentArea" },{ name: "topContentArea" }], locale, inEditMode == true, undefined, api)
    }
}

LandingPageComponent.displayName = "Single Column Landing Page"

export default LandingPageComponent