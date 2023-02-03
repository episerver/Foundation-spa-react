import type { IContentComponent } from '@optimizely/cms/models'
import type { StandardPage } from 'schema'

import { readValue as pv, prefetchContentAreaRecursive } from '@optimizely/cms/utils'
import { EditableField } from '@optimizely/cms/components'
import { ContentArea } from '@components/shared/Utils'
import Head from 'next/head'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Breadcrumbs from '@components/shared/Breadcrumbs'
import StructuredHtml from '@framework/foundation/cms/structuredhtml'

const defaultName = "Standard Page"

export const StandardPageComponent : IContentComponent<StandardPage> = props =>
{
    const pageTitle = pv(props.content, "metaTitle") ?? `${ pv(props.content, "name") ?? defaultName } :: Mosey Health`
    //const pageImage = pv(props.content, 'pageImage')?.url
    const pageBody = pv(props.content, 'mainBody') ?? ""
    const pageHeading = pv(props.content, 'name') ?? defaultName

    return <Box sx={{marginBlockStart: "0.67em"}}>
        <Head>
            <title>{ pageTitle }</title>
            <style>{ pv(props.content, "css") }</style>
        </Head>
        <Breadcrumbs />
        <EditableField field='name'><Typography variant="h1">{ pageHeading }</Typography></EditableField>
        <EditableField field='mainBody'><StructuredHtml propertyData={ props.content?.mainBody } /></EditableField>
        <ContentArea content={ props.content } name="mainContentArea"/>
    </Box>
}

StandardPageComponent.getStaticProps = async (content, { locale, inEditMode, api }) => {
    return {
        fallback: await prefetchContentAreaRecursive(content, [{ name: "mainContentArea" }], locale, inEditMode == true, undefined, api)
    }
}

StandardPageComponent.getContentFields = () => {
    return [ 'metaTitle', 'name', 'css', 'mainContentArea', 'mainBody' ]
}

StandardPageComponent.displayName = "Optimizely Foundation: Standard Page"

export default StandardPageComponent