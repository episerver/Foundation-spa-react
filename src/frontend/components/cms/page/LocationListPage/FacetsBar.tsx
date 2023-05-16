import type { FunctionComponent } from 'react'
import type { IContent, IContentData } from '@optimizely/cms'
import React, { useEffect, useMemo, useState } from 'react'
import { useOptimizelyCms } from '@optimizely/cms'
import { readValue as pv } from '@optimizely/cms/utils'
import { useRouter } from 'next/router'
import * as LocHelper from './helper'

// Material UI Components
import Collapse from '@mui/material/Collapse'
import LinearProgress from '@mui/material/LinearProgress'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

// Material UI Icons
import FavoriteIcon from '@mui/icons-material/Favorite'
import NewReleasesIcon from '@mui/icons-material/NewReleases'
import PublicIcon from '@mui/icons-material/Public'
import FlagIcon from '@mui/icons-material/Flag'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CheckBoxOutlineBlank from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBox from '@mui/icons-material/CheckBox'

// Context
import type { LocationListPage, LocationItemPage } from 'schema'

export type FacetBarProps = {
    parent: LocationListPage
}

type FilterDefs<T extends IContent = LocationItemPage> = { label: string, prop: keyof T }[]

const FilterDefs : FilterDefs = [
    {label: 'Continent', prop:'continent'}, 
    {label: 'Country', prop:'country'},
    {label: 'Average Temperature', prop:'avgTemp'},
    {label: 'New', prop:'new'},
    {label: 'Promoted', prop:'promoted'}
]
type FilterOptions<T extends IContent = LocationItemPage> = {
    [F in keyof T]?: any[]
}


export const FacetsBar : FunctionComponent<FacetBarProps> = ({ parent }) => {
    const router = useRouter()
    const { api } = useOptimizelyCms()

    const filters = useMemo(() => LocHelper.handleUrlQuery(router.query), [ router.query ])
    const [ options, setOptions ] = useState<FilterOptions>({})
    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [ continentOpen, setContinentOpen ] = useState<boolean>(false)
    const [ countryOpen, setCountryOpen ] = useState<boolean>(false)
    const [ newOpen, setNewOpen ] = useState<boolean>(false)
    const [ promotedOpen, setPromotedOpen ] = useState<boolean>(false)
    
    useEffect(() => {
        if (!api) return
        const extra = LocHelper.filterToOData(filters)
        const filter = LocHelper.createFilter(parent.contentLink.guidValue, extra)
        setIsLoading(true)
        api.search<LocationItemPage>(undefined, filter, undefined, undefined, undefined, true, {
            branch: router.locale ?? router.defaultLocale
        }).then(searchResult => {
            const fo : FilterOptions = {}
            FilterDefs.forEach(d => fo[d.prop] = [])
            searchResult.results.forEach(item => {
                FilterDefs.forEach(lf => {
                    const val = pv(item, lf.prop)
                    if (val && !fo[lf.prop]?.includes(val)) fo[lf.prop]?.push(val)
                })
            })
            setOptions(fo)
            setIsLoading(false)
        })

    }, [ api, filters, parent.contentLink.guidValue, router.locale, router.defaultLocale ])

    function addFilter(property: string, value: string)
    {
        setIsLoading(true)
        const queryName = 'f:'+property
        const newQuery = router.query
        if (newQuery[queryName] && Array.isArray(newQuery[queryName]))
            (newQuery[queryName] as string[]).push(value)
        else if (newQuery[queryName])
            newQuery[queryName] = [newQuery[queryName] as string, value]
        else
            newQuery[queryName] = value
        router.push({ query: newQuery })
    }
    function removeFilter(property: string, value: string)
    {
        setIsLoading(true)
        const queryName = 'f:'+property
        let newQuery = router.query
        if (newQuery[queryName] && Array.isArray(newQuery[queryName]))
            newQuery[queryName] = (newQuery[queryName] as string[]).filter(x => x != value)
        else if (newQuery[queryName])
            delete newQuery[queryName]
        router.push({ query: newQuery })
    }
    function setFilter(property: string, value: string)
    {
        setIsLoading(true)
        const queryName = 'f:'+property
        let newQuery = router.query
        newQuery[queryName] = value
        router.push({ query: newQuery })
    }

    const newYesActive = isActive('new', 'true', filters)
    const newNoActive = isActive('new', 'false', filters)
    const promotedYesActive = isActive('promoted', 'true', filters)
    const promotedNoActive = isActive('promoted', 'false', filters)

    return <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
    >
        { isLoading && <LinearProgress />}
        <ListItemButton onClick={() => setPromotedOpen(x => !x)}>
            <ListItemIcon>
                <FavoriteIcon />
            </ListItemIcon>
            <ListItemText primary="Top Picks" />
            {promotedOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
        <Collapse in={ promotedOpen } timeout="auto" unmountOnExit>
        <List>
            <ListItemButton onClick={ () => promotedYesActive ? removeFilter('promoted', 'true') : setFilter('promoted', 'true' )} disabled={ isLoading }>
                <ListItemIcon>{ promotedYesActive ? <CheckBox /> : <CheckBoxOutlineBlank /> }</ListItemIcon>
                <ListItemText primary="Yes" />
            </ListItemButton>
            <ListItemButton onClick={ () => promotedNoActive ? removeFilter('promoted', 'false') : setFilter('promoted', 'false' )} disabled={ isLoading }>
                <ListItemIcon>{ promotedNoActive ? <CheckBox /> : <CheckBoxOutlineBlank /> }</ListItemIcon>
                <ListItemText primary="No" />
            </ListItemButton>
        </List>
        </Collapse>
        <ListItemButton onClick={() => setNewOpen(x => !x)}>
            <ListItemIcon>
                <NewReleasesIcon />
            </ListItemIcon>
            <ListItemText primary="New" />
            {newOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
        <Collapse in={ newOpen } timeout="auto" unmountOnExit>
        <List>
            <ListItemButton onClick={ () => newYesActive ? removeFilter('new', 'true') : setFilter('new', 'true' )} disabled={ isLoading }>
                <ListItemIcon>{ newYesActive ? <CheckBox /> : <CheckBoxOutlineBlank /> }</ListItemIcon>
                <ListItemText primary="Yes" />
            </ListItemButton>
            <ListItemButton onClick={ () => newNoActive ? removeFilter('new', 'false') : setFilter('new', 'false' )} disabled={ isLoading }>
                <ListItemIcon>{ newNoActive ? <CheckBox /> : <CheckBoxOutlineBlank /> }</ListItemIcon>
                <ListItemText primary="No" />
            </ListItemButton>
        </List>
        </Collapse>
        <ListItemButton onClick={() => setContinentOpen(x => !x)}>
            <ListItemIcon>
                <PublicIcon />
            </ListItemIcon>
            <ListItemText primary="Continent" />
            {continentOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
        <Collapse in={ continentOpen } timeout="auto" unmountOnExit>
            <List>
                { options.continent?.map(itm => {
                    const active = isActive('continent', itm, filters)
                    return <ListItemButton key={`filter-continent-${ itm }`} onClick={ () => active ? removeFilter('continent', itm) : addFilter('continent', itm )} disabled={ isLoading }>
                        <ListItemIcon>{ active ? <CheckBox /> : <CheckBoxOutlineBlank /> }</ListItemIcon>
                        <ListItemText primary={ itm } />
                    </ListItemButton>
                }) }
            </List>
        </Collapse>
        <ListItemButton onClick={() => setCountryOpen(x => !x)}>
            <ListItemIcon>
                <FlagIcon />
            </ListItemIcon>
            <ListItemText primary="Country" />
            {countryOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
        <Collapse in={ countryOpen } timeout="auto" unmountOnExit>
            <List>
                { options.country?.map(itm => {
                    const active = isActive('country', itm, filters)
                    return <ListItemButton key={`filter-country-${ itm }`} onClick={ () => active ? removeFilter('country', itm) : addFilter('country', itm )} disabled={ isLoading }>
                        <ListItemIcon>{ active ? <CheckBox /> : <CheckBoxOutlineBlank /> }</ListItemIcon>
                        <ListItemText primary={ itm } />
                    </ListItemButton>
                }) }
            </List>
        </Collapse>
    </List>
}

function isActive(filter: string, value: any, activeFilters: LocHelper.AppliedFilters) : boolean
{
    return activeFilters.some(x => x.field == filter && (Array.isArray(x.value) ? x.value.includes(value) : x.value == value))
}

export default FacetsBar