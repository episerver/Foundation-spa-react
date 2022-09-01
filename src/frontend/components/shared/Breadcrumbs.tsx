import type { FunctionComponent } from "react"
import type { IContent } from '@optimizely/cms/models'
import React, { useState, useEffect } from 'react'
import { useOptimizely } from "@optimizely/cms"
import { useRouter } from "next/router"
import MuiBreadcrumbs from "@mui/material/Breadcrumbs"
import Box from "@mui/material/Box"
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { readValue as pv, createApiId } from '@optimizely/cms/utils'

export type BreadcrumbsProps = {}

export const Breadcrumbs : FunctionComponent<BreadcrumbsProps> = props => 
{
    const opti = useOptimizely()
    const router = useRouter()
    const api = opti.api
    const contentId = opti.currentContentId
    const branch = router.locale ?? router.defaultLocale ?? opti.defaultBranch
    const [ crumbs, setCrumbs ] = useState<IContent[]>([])

    useEffect(() => {
        let isCancelled = false
        if (!api || !contentId || !branch)
            return

        api.getAncestors(contentId, { branch, editMode: false, select: ["name", "url"] }).then(data => {
            if (!isCancelled) setCrumbs(data.reverse().slice(1))
        })
        //console.error(api, contentId, branch)

        return () => {
            isCancelled = true
        }
    }, [ api, contentId, branch ])


    return <Box sx={{ mt: { xs: 1, md: 2 }, p: 0 }}><MuiBreadcrumbs aria-label="breadcrumb">
        { crumbs.slice(0,-1).map(crumb => {
            const crumbId = createApiId(crumb)
            const name = pv(crumb, "name") ?? "Unnamed page"
            return <Link key={ `breadcrumb-${ crumbId }` } passHref href={ crumb.url ?? "#" }>
                <MuiLink sx={{ fontSize: '0.8rem'}} underline="hover" color="inherit">{ name }</MuiLink>
            </Link>
        }) }
        <Typography color="text.primary" sx={{ fontSize: '0.8rem'}}>{ pv(crumbs.slice(-1)[0], "name") ?? "Unnamed page" }</Typography>
    </MuiBreadcrumbs></Box>
}

export default Breadcrumbs