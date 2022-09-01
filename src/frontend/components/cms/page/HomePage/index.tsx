import type { IContentComponent } from '@optimizely/cms/models'
import type { HomePage } from 'schema'
import { readValue as pv, prefetchContentAreaRecursive } from '@optimizely/cms/utils'
import Head from 'next/head'
import ContentArea from '@components/shared/Utils/ContentArea'

export type HomePageProps = {}

export const HomePageComponent : IContentComponent<HomePage, HomePageProps> = props => 
{
    return <>
        <Head>
            <title>{ props.content?.metaTitle ? pv(props.content, "metaTitle") : `${ pv(props.content, "name") } :: Foundation` }</title>
            { props.content?.css ? <style>{ pv(props.content, "css") }</style> : undefined }
        </Head>
        
        <ContentArea content={ props.content } name="mainContentArea" />
    </>
}

HomePageComponent.getStaticProps = async (content, { locale, inEditMode, api }) => {
    return {
        fallback: await prefetchContentAreaRecursive(content, [{ name: "mainContentArea" }], locale, inEditMode == true, undefined, api)
    }
}

HomePageComponent.getContentFields = () => {
    return [ 'metaTitle', 'name', 'css', 'mainContentArea' ]
}

HomePageComponent.displayName = "CMS-Component: HomePage"

export default HomePageComponent