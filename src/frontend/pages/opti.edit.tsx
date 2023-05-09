import { readValue as pv, EditMode } from '@optimizely/cms/utils'
import { getServerSideProps as baseGetServerSideProps } from '@optimizely/next-js/cms-page'
import { getServerSession } from "./api/auth/[...nextauth]"

const DEBUG_ENABLED = process.env.NODE_ENV != 'production'

/**
 * Retrieve the server side rendering props for the edit pages (which are always
 * server side rendered. This takes the base implemenation and adds the Foundation
 * settings to it.
 * 
 * @param       ctx     The context for the server side rendering.
 * @returns     The parameters neeeded for server side rendering
 */
export const getServerSideProps : typeof baseGetServerSideProps = async ({ req, defaultLocale, locale, params, query, res }) => {
    // Get Edit Mode information, return "Not Found" if no information present
    const editContext = EditMode.getEditModeInfo(req.url)
    if (!editContext) return { notFound: true }

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
    if (DEBUG_ENABLED) console.log("Site - Edit Page", req.url)
    const contentBranch = locale ?? defaultLocale ?? 'en'
    const contentId = editContext.contentReference
    const inEditMode = !editContext.isPreviewActive

    // If the content ID is not resolved or "0", return not found
    if (!contentId || contentId == '0')
        return { notFound: true }

    if (DEBUG_ENABLED) console.log("Site - Page Mode", contentId, inEditMode ? "Edit" : "Preview", editContext)

    return { 
        props: {
            locale: contentBranch,
            contentId,
            fallback: {},
            inEditMode
        }
    }
}

/**
 * Reexport the base component for rendering
 */
export { OptimizelyCmsPage as CmsPage, OptimizelyCmsPage as default } from '@optimizely/next-js/components'