import type { IContent, IContentData, IContentComponent } from '@optimizely/cms/models'
import { EditableField } from '@optimizely/cms'
import { readValue as pv, normalizeUrl as nu } from '@optimizely/cms/utils'
import { Typography, Grid, Toolbar, Card, CardContent, CardActions, Button } from '@mui/material'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { LocationListPage, LocationItemPage } from 'schema'
import siteInfo from 'website.cjs'

const INITIAL_PAGE_SIZE = 8

export type AdditionalProps = {
    locations: IContentData[]
    parents: IContentData[]
    location_count: number
}

export const LocationListPageComponent : IContentComponent<LocationListPage, AdditionalProps> = props => {
    
    const title = `${ props.content?.name } :: ${ siteInfo.name }`

    return <div className='location-list-page'>
        <Head>
            <title>{ title }</title>
        </Head>
        <Typography variant='h2' component='h1'>
            <EditableField field='name' inline >{ pv(props.content, 'name') ?? 'Location list page' }</EditableField>
        </Typography>
        <Typography variant='body1' component='div'><EditableField field='mainBody' html={ pv(props.content, 'mainBody') || '' }></EditableField></Typography>
        <Grid container>
            <Grid item xs={12} md={3}>
                <Typography variant='h6' component='p'>Filters</Typography>
                <Typography variant='body2' component='p'>ContentSearch API does not support retrieving filters</Typography>
            </Grid>
            <Grid item xs={12} md={9}>
                <Toolbar>Toolbar...</Toolbar>
                <Grid container spacing={2}>
                { (props?.locations ?? []).map(loc => {
                    return <Grid item xs={6} md={3} key={`loc-list-page-card-${ loc.contentLink.guidValue }`}><Card sx={{ 
                        height: "100%", 
                        justifyContent: "space-between",
                        display: "grid",
                        alignContent: "space-between",
                        alignItems: "stretch",
                        justifyItems: "stretch" }}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">{ pv(loc, 'name') || '' }</Typography>
                            <Typography variant="body2" color="text.secondary">{ pv(loc, "mainIntro") }</Typography>
                        </CardContent>
                        <CardActions>
                            <Link href={ nu(loc.url ?? loc.contentLink.url ?? '#') } passHref legacyBehavior>
                                { /* @ts-expect-error React18 types causing issues here */ }
                                <Button size="small" color="primary" variant="contained" component="a">Discover { loc.name }</Button>
                            </Link>
                        </CardActions>
                    </Card></Grid>
                })}
                </Grid>
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
    const filter = `ContentType/any(t:t eq 'LocationItemPage') and parentLink/guidValue eq '${ content.contentLink.guidValue }'`
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