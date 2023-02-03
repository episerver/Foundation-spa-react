import type { FunctionComponent } from "react"
import type { IContent } from '@optimizely/cms/models'
import React, { useState, useEffect, startTransition } from 'react'
import { useOptimizelyCms } from "@optimizely/cms/context"
import useContent from "@optimizely/cms/use-content"
import useCurrentContent from '@framework/current-content'
import { useRouter } from "next/router"
import MuiBreadcrumbs from "@mui/material/Breadcrumbs"
import Box from "@mui/material/Box"
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { readValue as pv, createApiId } from '@optimizely/cms/utils'

export type BreadcrumbsProps = {}

export const Breadcrumbs : FunctionComponent<BreadcrumbsProps> = () => 
{
    const { api, defaultBranch } = useOptimizelyCms()
    const router = useRouter()
    const contentId = useCurrentContent() ?? '-'
    const branch = router.locale ?? router.defaultLocale ?? defaultBranch
    const [ crumbs, setCrumbs ] = useState<IContent[]>([])
    // Yes, filtering by name/url sounds like a good idea here, but it will typically
    // introduce a secondary request. The page itself already has triggerd the content
    // without filters to be loaded.
    const content = useContent(contentId, undefined, undefined, branch)
    const ancestorsId = content?.data?.contentLink

    useEffect(() => {
        let isCancelled = false
        if (!api || !ancestorsId || !branch)
            return

        api.getAncestors(ancestorsId, { branch, editMode: false, select: ["name", "url"] }).then(data => {
            if (!isCancelled) startTransition(() => setCrumbs(data.reverse().slice(1)))
        })
        //console.error(api, contentId, branch)

        return () => {
            isCancelled = true
        }
    }, [ api, ancestorsId, branch ])


    return <Box sx={{ mt: { xs: 1, md: 2 }, p: 0 }}>
        <MuiBreadcrumbs aria-label="breadcrumb">
        { crumbs.map(crumb => {
            const crumbId = createApiId(crumb)
            const name = pv(crumb, "name") ?? "Unnamed page"
            const href = new URL(crumb.url ?? '/', 'http://localhost/').pathname
            return <Link key={ `breadcrumb-${ crumbId }` } passHref href={ href } legacyBehavior>
                <MuiLink sx={{ fontSize: '0.8rem'}} underline="hover" color="inherit">{ name }</MuiLink>
            </Link>
        }) }
            <Typography color="text.primary" sx={{ fontSize: '0.8rem'}}>{ pv(content?.data ?? undefined, "name") ?? "Unnamed page" }</Typography>
        </MuiBreadcrumbs>
    </Box>
}

export default Breadcrumbs