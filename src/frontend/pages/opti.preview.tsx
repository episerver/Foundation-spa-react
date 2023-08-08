import type { OptimizelyCmsPageProps } from '@optimizely/next-js/cms-page'
import type { NextPage, GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
import { EditMode } from '@optimizely/cms/utils'
import { getServerSession } from "./api/auth/[...nextauth]"
import ContentComponent from '@optimizely/cms/content-component'

const DEBUG_ENABLED = process.env.NODE_ENV != 'production'

type EditPageProps = Omit<OptimizelyCmsPageProps, 'fallback'>
type EditPageServerProps = OptimizelyCmsPageProps & { baseType: string }
type EditPageInitialProps = EditPageProps

/**
 * Retrieve the server side rendering props for the edit pages (which are always
 * server side rendered. This takes the base implemenation and adds the Foundation
 * settings to it.
 * 
 * @param       ctx     The context for the server side rendering.
 * @returns     The parameters neeeded for server side rendering
 */
export const getServerSideProps : GetServerSideProps<EditPageServerProps> = async ({ req, defaultLocale, locale, params, query, res }) => {
    // Get Edit Mode information, return "Not Found" if no information present
    const editContext = EditMode.getEditModeInfo(req.url)
    if (!editContext) return { notFound: true }
    if (!editContext.isPreviewActive) return { notFound: true }

    // Get Authentication information, redirect to login if there's no session
    const session = (await getServerSession(req, res))
    if (!session) {
        var loginUrl = new URL('/api/auth/signin', process.env.NEXTAUTH_URL ?? 'http://localhost:3000/')
        loginUrl.searchParams.set('callbackUrl', req.url?.toString() ?? '')
        return {
            redirect: {
                destination: loginUrl.toString(),
                permanent: false
            }
        }
    }

    // Get information for client side render
    const contentBranch = locale ?? defaultLocale ?? 'en'
    const contentId = editContext.contentReference
    const inEditMode = false // In preview, Edit Mode is always disabled!

    // If the content ID is not resolved or "0", return not found
    if (!contentId || contentId == '0')
        return { notFound: true }

    return { 
        props: {
            locale: contentBranch,
            contentId,
            inEditMode,
            baseType: 'Page'
        }
    }
}

export const OptiEditPage : NextPage<EditPageProps, EditPageInitialProps> = ({ locale, contentId, inEditMode, ...remainingProps }) => {
    const [ cId, refreshContent ] = useState<string | undefined>()
    useEffect(() => {
        refreshContent(contentId)
    }, [ contentId ])

    if (DEBUG_ENABLED) {
        console.group("Rendering Optimizely Edit Page")
        console.log("Content ID:", contentId)
        console.log("Locale:", locale)
        console.log("Context Mode:", inEditMode ? 'Edit' : 'Preview')
        console.log("Rendering:", cId)
        console.log("Remaining props:", remainingProps)
        console.groupEnd()
    }

    if (!cId)
        return <div className='error'>No Content Selected</div>
    
    return <ContentComponent content={ cId } locale={ locale } contentType={[ "page", "UnknownTypePage" ]} />
}

export default OptiEditPage