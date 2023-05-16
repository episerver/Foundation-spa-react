import type { IContent, IContentData, IContentComponent } from '@optimizely/cms/models'
import { EditableField, useOptimizelyCms } from '@optimizely/cms'
import { readValue as pv, createApiId, ContentReference } from '@optimizely/cms/utils'
import dynamic from 'next/dynamic'
import React, { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import StructuredHtml from '@framework/foundation/cms/structuredhtml'

// Next.JS Components
import Head from 'next/head'
import Link from 'next/link'

// Material UI Components
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Toolbar from '@mui/material/Toolbar'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import LinearProgress from '@mui/material/LinearProgress'

// Context information
import { LocationListPage, LocationItemPage } from 'schema'
import siteInfo from 'website.cjs'
import * as LocTools from './helper'

// Lazy load components
const Pagination = dynamic(() =>import('@mui/material/Pagination'), { ssr: false })
const FacetsBar = dynamic(() => import('./FacetsBar'), { ssr: false })
const DropdownButton = dynamic(() => import('./DropdownButton'), { ssr: false })

const INITIAL_PAGE_SIZE = 6

export type AdditionalProps = {
    locations: IContentData[]
    parents: IContentData[]
    location_count: number
}

export const LocationListPageComponent : IContentComponent<LocationListPage, AdditionalProps> = props => {
    const router = useRouter()
    const { api } = useOptimizelyCms()
    const filters = useMemo(() => LocTools.handleUrlQuery(router.query), [ router.query ])
    const contentId = useMemo(() => props.content ? createApiId(props.content, true, false) : undefined, [props.content])
    const [ locations, setLocations ] = useState<LocationItemPage[]>(props.locations as LocationItemPage[] ?? [])
    const [ totalResults, setTotalResults ] = useState<number>(props.locations?.length ?? 0)
    const [ pageSize, setPageSize ] = useState<number>(INITIAL_PAGE_SIZE)
    const [ pageNumber, setPageNumber ] = useState<number>(1)
    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [ orderBy, setOrderBy ] = useState<string | undefined>(undefined)
    
    const title = `${ props.content?.name ?? "Location List Page" } :: ${ siteInfo.name }`
    const pageCount = Math.ceil(totalResults / pageSize)


    useEffect(() => {
        let cancelled = false
        if (!api) return
        if (!contentId) return
        setIsLoading(true)
        const extra = LocTools.filterToOData(filters)
        const filter = LocTools.createFilter(contentId, extra)
        const skip = (pageNumber - 1)*pageSize

        api
            .search<LocationItemPage>(undefined, filter, orderBy, skip, pageSize, true, {
                branch: router.locale ?? router.defaultLocale,
                editMode: false
            })
            .then(results => {
                if (cancelled) return
                setTotalResults(results.totalMatching)
                setLocations(results.results)
                if (Math.ceil(results.totalMatching / pageSize) < pageNumber)
                    setPageNumber(1)
                setIsLoading(false)
            })

        return () => { cancelled = true }
    }, [ api, filters, contentId, router.locale, router.defaultLocale, pageSize, pageNumber, orderBy ])

    return <div className='location-list-page'>
        <Head>
            <title>{ title }</title>
            <meta name="x-epi-page-type" content='Optimizely Location List Page'/>
        </Head>
        <Typography variant='h2' component='h1'>
            <EditableField field='name' inline >{ pv(props.content, 'name') ?? 'Location list page' }</EditableField>
        </Typography>
        <Typography variant='body1' component='div'>
            <EditableField field='mainBody'><StructuredHtml propertyData={ props.content?.mainBody } /></EditableField>
        </Typography>
        <Grid container>
            <Grid item xs={12} md={3}>
                { props.content && <FacetsBar parent={ props.content } /> }
            </Grid>
            <Grid item xs={12} md={9}>
                <Toolbar>
                    <Typography variant='body2' sx={{ flexGrow: 2 }}>Found { totalResults } matching locations</Typography>
                    <DropdownButton options={[{value: undefined, label: "Default"},{value: "name asc", label: "Name"},{ value: "avgTemp desc", label: "Warmest first" },{ value: "avgTemp asc", label: "Coldest first" }]} value={orderBy} label="Order by" onChange={(e,v) => setOrderBy(v)} />
                    <DropdownButton options={[{value: 6, label: '6'},{value: 12, label: '12'},{value: 24, label: '24'}]} value={ pageSize } label="Page size" onChange={(e,v) => setPageSize(v)} />
                </Toolbar>
                {isLoading && <LinearProgress />}
                <Grid container spacing={2}>
                { locations.map(loc => {
                    const locationUrl = ContentReference.createContentPath(loc)
                    const locationImage = pv(loc, 'pageImage') ?? pv(loc, 'image')
                    const locationImageUrl = locationImage && ContentReference.createContentUrl(locationImage, true)
                    const buttonText = pv(loc, 'teaserButtonText') ?? `Discover ${ loc.name }`
                    return <Grid item xs={12} md={4} key={`loc-list-page-card-${ loc.contentLink.guidValue }`}><Card sx={{ 
                        height: "100%", 
                        justifyContent: "space-between",
                        display: "grid",
                        alignContent: "space-between",
                        alignItems: "stretch",
                        justifyItems: "stretch" }}>
                        { locationImageUrl && <CardMedia
                            sx={{ height: 140 }}
                            image={ locationImageUrl }
                            title={ pv(loc, 'name') ?? '' }

                        />}
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">{ pv(loc, 'name') || '' }</Typography>
                            <Typography variant="body2" color="text.secondary">{ pv(loc, "mainIntro") }</Typography>
                        </CardContent>
                        <CardActions>
                            <Link href={ locationUrl ?? '#' } passHref legacyBehavior>
                                <Button size="small" color="primary" variant="contained" component="a" sx={{ ml: 'auto', mr: 'auto' }}>{ buttonText }</Button>
                            </Link>
                        </CardActions>
                    </Card></Grid>
                })}
                </Grid>
                <Stack spacing={2} mt={2}><Pagination count={pageCount} page={pageNumber} onChange={ (e,v) => setPageNumber(v) } shape="rounded" sx={{  marginLeft: "auto", marginRight: "auto" }}/></Stack>
            </Grid>
        </Grid>
    </div>
}

LocationListPageComponent.getStaticProps = async (content, context) => {
    type GetChildOpts = Required<Parameters<typeof context.api.getChildren>>[1]
    const options : GetChildOpts = {
        branch: context.locale,
        editMode: context.inEditMode ?? false
    }
    const filter = LocTools.createFilter(content.contentLink.guidValue); // `ContentType/any(t:t eq 'LocationItemPage') and parentLink/guidValue eq '${ content.contentLink.guidValue }'`
    const orderBy = `name asc`
    const search_results = await context.api.search<LocationItemPage>(undefined, filter, orderBy, 0, INITIAL_PAGE_SIZE, true, {
        ...options,
        select: ["name", "url", "mainIntro"],
    }).catch(e => {
        return {
            totalMatching: 0,
            results: []
        }
    })
    const parents = (await context.api.getAncestors<IContent>(content.contentLink.guidValue, {
        ...options,
        select: ["name", "url"]
    }).catch(e => { return [] } )) ?? null
    
    return {
        locations: search_results.results.map(x => { 
            var mapped : Pick<LocationItemPage, keyof IContent | 'mainIntro' > = {
                contentLink: x.contentLink,
                contentType: x.contentType,
                language: x.language,
                name: x.name,
                mainIntro: x.mainIntro ?? ""
            }
            return mapped
        }),
        location_count: search_results.totalMatching,
        parents
    }
}

LocationListPageComponent.displayName = "CMS-Component: LocationListPage"

export default LocationListPageComponent