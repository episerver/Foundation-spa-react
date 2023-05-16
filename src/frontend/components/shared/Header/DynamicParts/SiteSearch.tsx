import type { FunctionComponent, MouseEventHandler, KeyboardEventHandler, KeyboardEvent, MouseEvent, ComponentProps } from 'react'
import type { IContentData } from '@optimizely/cms'
import React, { useState, useRef, useEffect } from 'react'
import { useOptimizelyCms } from '@optimizely/cms'
import { readValue as pv, ContentReference } from '@optimizely/cms/utils'
import { ContentComponent } from '@optimizely/cms/components'
import { useRouter } from 'next/router'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

// Next.JS Components
import Link from 'next/link'

// Material UI Components
import Alert from '@mui/material/Alert'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import LinearProgress from '@mui/material/LinearProgress'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import OutlinedInput from '@mui/material/OutlinedInput'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

// Material UI Icons
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import ArticleIcon from '@mui/icons-material/Article'
import SegmentIcon from '@mui/icons-material/Segment'

export const SiteSearch : FunctionComponent = () =>
{
    const [ isOpen, setOpen ] = useState<boolean>(false)
    const router = useRouter()
    useEffect(() => {
        setOpen(false)
    }, [ router.asPath ])

    function handleClose() {
        setOpen(false)
    }
    function handleOpen() {
        setOpen(true)
    }

    return <>
        <Tooltip title="Search">
            <IconButton size="small" color='inherit' aria-haspopup="true" onClick={ handleOpen }>
                <SearchIcon sx={{ fontSize: '40px' }} />
            </IconButton>
        </Tooltip>
        <SiteSearchDialog isOpen={ isOpen } handleClose={ handleClose } fullscreen />
    </>
}

let searchTimeOut : ReturnType<typeof setTimeout> | undefined = undefined
let lastSearchTerm : string | undefined = undefined

const SiteSearchDialog : FunctionComponent<{ isOpen: boolean, handleClose?: MouseEventHandler<HTMLElement> , fullscreen?: boolean, minChars?: number}> = ({ isOpen, handleClose, fullscreen, minChars }) => 
{
    const { api } = useOptimizelyCms()
    const searchBoxLabel = "Search terms"
    const [ searchTerm, setSearchTerm ] = useState<string>()
    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [ results, setResults ] = useState<IContentData[]>([])
    const [ resultCount, setResultCount ] = useState<number>(0)
    const [ quickViewContent, setQuickViewContent ] = useState<IContentData | undefined>()
    const searchBox = useRef<HTMLInputElement>()
    const minSearchLength = minChars ?? 3
    const router = useRouter()

    useEffect(() => {
        setQuickViewContent(undefined)
    }, [ router.asPath ])

    function onKeyUp()
    {
        const term = searchBox.current?.value ?? ''
        setSearchTerm(term.length >= minSearchLength ? term : '')
    }
    function closeSearch(event: MouseEvent<HTMLElement>)
    {
        setSearchTerm('')
        setResultCount(0)
        setResults([])
        setIsLoading(false)
        handleClose && handleClose(event)
    }
    function openComponent(content: IContentData) 
    {
        setQuickViewContent(content)
    }
    function closeContent()
    {
        setQuickViewContent(undefined)
    }

    useEffect(() => {
        let isCancelled = false
        // Check if we should be loading at all
        if (!searchTerm || !api) return
        if (searchTerm == lastSearchTerm) return

        // Change state
        setIsLoading(true)

        // Clear search request, if not yet sent & store term
        if (searchTimeOut) clearTimeout(searchTimeOut)
        lastSearchTerm = searchTerm

        // Now wait for 500ms to allow other input
        searchTimeOut = setTimeout(() => api
            .basicSearch(searchTerm, undefined, undefined, 10, true)
            .then(x => {
                if (isCancelled) return
                setResultCount(x.totalMatching)
                setResults(x.results)
                setIsLoading(false)
            })
            , 500);

        return () => {
            isCancelled = true
        }
    }, [ api, searchTerm ])

    return <>
        <Dialog open={ isOpen } scroll='paper' fullScreen={ fullscreen }  >
            <AppBar id="scroll-dialog-title" sx={{ position: 'relative' }}>
                <Toolbar>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">Site search { resultCount > 0 ? ` (${ resultCount } results)` : ""}</Typography>
                    <IconButton edge="start" color="inherit" onClick={closeSearch} aria-label="close" >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <DialogContent dividers={true}>
                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                    <InputLabel htmlFor="search-box">{ searchBoxLabel }</InputLabel>
                    <OutlinedInput id="search-box" type="text" endAdornment={ <InputAdornment position="end"><IconButton edge="end"><SearchIcon /></IconButton></InputAdornment> } label={ searchBoxLabel } onKeyUp={ onKeyUp } inputRef={ searchBox } defaultValue={ searchTerm }/>
                </FormControl>
                { isLoading && <LinearProgress />}
                <List sx={{ width: '100%', bgcolor: 'background.paper' }} component="nav" aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">Showing { results.length } of { resultCount } search results for &quot;{ searchTerm }&quot;</ListSubheader>
                    }
                >
                    { results.map(result => {
                        const resultUrl = ContentReference.createContentPath(result)
                        const resultName = pv(result, 'name') ?? "Unnamed content item"
                        const resultDetails = <ListItemText  
                                primary={ resultName } 
                                secondary={ `Kind: ${ (pv(result, 'contentType') ?? ['Unknown'])[0] }, Published: ${ pv(result, 'startPublish') ?? pv(result, 'saved') }`} 
                            />
                        if (resultUrl)
                            return <ListItem key={ result.contentLink.guidValue } onClick={ closeSearch } LinkComponent={ Link } href={ resultUrl ?? '' } >
                                <ListItemAvatar><Avatar><ArticleIcon /></Avatar></ListItemAvatar>
                                { resultDetails }
                            </ListItem>
                        return <ListItem key={ result.contentLink.guidValue } onClick={ () => openComponent(result) } >
                            <ListItemAvatar><Avatar><SegmentIcon /></Avatar></ListItemAvatar>
                            { resultDetails }
                        </ListItem>
                    })}
                </List>
            </DialogContent>
        </Dialog>
        <BlockDialog content={ quickViewContent } closeHandler={ closeContent }/>
    </>
}

const BlockDialog : FunctionComponent<{ content?: IContentData, isOpen?: boolean, closeHandler: () => void }> = ({ content, isOpen, closeHandler }) => {
    const open = content || isOpen ? true : false
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

    return <Dialog open={ open } scroll='paper' maxWidth='md' fullWidth fullScreen={ fullScreen }>
        <AppBar id="scroll-dialog-title" sx={{ position: 'relative' }}>
            <Toolbar>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">Component view: { pv(content, "name") ?? "No content" }</Typography>
                <IconButton edge="start" color="inherit" onClick={closeHandler} aria-label="close" >
                    <CloseIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
        <DialogContent>
            { content ?
                <ContentComponent content={ content } prefix='block' ><Alert severity="info">Loading component { content.contentType.join('/') }</Alert></ContentComponent> :
                <Alert severity="warning">No content selected!</Alert>
            }
        </DialogContent>
    </Dialog>
}

export default SiteSearch