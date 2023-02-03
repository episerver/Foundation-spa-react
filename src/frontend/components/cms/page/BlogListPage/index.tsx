import type { IContentComponent, IContentData, IContent, ContentReference } from '@optimizely/cms/models'
import type { IContentDeliveryAPI } from '@optimizely/cms/types'
import type { BlogListPage, BlogItemPage } from 'schema'
import type { FunctionComponent, MouseEvent, ChangeEvent } from 'react'
import { useOptimizelyCms } from '@optimizely/cms/context'
import { readValue as pv, createApiId } from '@optimizely/cms/utils'
import { useState, useEffect, useMemo, Fragment } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { EditableField as Editable } from '@optimizely/cms/components'
import Breadcrumbs from '@components/shared/Breadcrumbs'
import Html from '@components/shared/Utils/HtmlContent'
import ContentArea from '@components/shared/Utils/ContentArea'
import site from 'website.cjs'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Collapse from '@mui/material/Collapse'
import Switch from '@mui/material/Switch'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import LinearProgress from '@mui/material/LinearProgress'
import LabelIcon from '@mui/icons-material/Label'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

function isBlogPost(content: IContent) : content is BlogItemPage
{
    return Array.isArray(content.contentType) && content.contentType.includes("BlogItemPage")
}

function isBlogList(content: IContent) : content is BlogListPage
{
    return Array.isArray(content.contentType) && content.contentType.includes("BlogListPage")
}

function getBaseUrl() : string
{
    try {
        return window.location.href
    } catch (e) {
        return 'http://localhost:3000'
    }
}

export const Component : IContentComponent<BlogListPage> = ({ content, locale }) =>
{
    // UX
    const theme = useTheme()
    const offerCollapse = useMediaQuery(theme.breakpoints.down('md'))

    // Properties
    const title = pv(content, "heading") ?? pv(content, "name") ?? "Unnamed Blog List"
    const metaTitle = pv(content, "metaTitle") ?? `${ pv(content, "name") ?? "Unnamed Blog List" } :: ${ site.name }`
    const [ showFilters, setShowFilters ] = useState<boolean>(false)
    const root = pv(content, "root") ?? content
    const api = useOptimizelyCms()?.api
    const includeAll = pv(content, "includeAllLevels") ?? false
    const [ posts, setPosts ] = useState<BlogItemPage[]>([])
    const [ postsLoading, setPostsLoading ] = useState<boolean>(true)

    function onSetShowFilters(e: ChangeEvent<HTMLInputElement>) {
        setShowFilters(e.target.checked)
    }

    useEffect(() => {
        setPostsLoading(true)
        if (!api) return
        if (!root) return
        const contentId = createApiId(root, true, false)
        getAllBlogPostsRecursive(contentId, api, locale, includeAll).then(postsList => {
            setPosts(postsList)
            setPostsLoading(false)
        })
    }, [ root, api, locale, includeAll ])

    return <Box sx={{ backgroundColor: 'background.default'}}>
        <Head><title>{metaTitle}</title></Head>
        <Breadcrumbs />
        <Typography variant="h1" component="h1" sx={{ textAlign: "center" }}><Editable field="heading" inline>{ title }</Editable></Typography>
        <Typography variant='body1' component="div"><Editable field="mainIntro" html={ pv(content, "mainBody" ) ?? ""} inline/></Typography>
        <ContentArea content={ content } name="mainContentArea" />
        <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={12} md={4} lg={3}>
                <List subheader={
                    <Box sx={{ display: "flex", flexDirection: "row", "justifyContent": "space-between" }}>
                        <Box sx={{ backgroundColor: "transparent", m: 1}}>Filters</Box> 
                        { offerCollapse && <Switch checked={ showFilters } onChange={ onSetShowFilters }/> }
                    </Box>
                } sx={{ backgroundColor: { xs: 'background.paper', md: 'background.default'}, pb: 0, mb: 1 }}>
                    <Collapse in={ (offerCollapse && showFilters) || !offerCollapse } orientation="vertical">{ root && <BlogFilters root={ root } locale={ locale } /> }</Collapse>
                </List>
            </Grid>
            <Grid item xs={12} md={8} lg={9}>
                <Typography variant="h5">Posts</Typography>
                { postsLoading ?
                    <LinearProgress /> :
                    <List>
                    { posts.map(post => {
                        const itemId = `blog-post-item-${ createApiId(post, true, false) }`
                        const postName = pv(post, "name") ?? "Unnamed blog post"
                        const postUrl = pv(post, "url") ?? "#"
                        const imageUrl = new URL(pv(post, "pageImage")?.url ?? "/static/images/avatar/2.jpg", process.env.OPTIMIZELY_DXP_URL ?? 'http://localhost')
                        const teaserText = `Intro: ${ pv(post, "teaserText") ?? "-" }`
                        const teaserButtonText = pv(post, "teaserButtonText") ?? "Read more"
                        imageUrl.searchParams.set("width", "40")
                        imageUrl.searchParams.set("height", "40")
                        const imageSrc = imageUrl.href

                        return <Fragment key={itemId}><ListItem>
                            <ListItemAvatar>
                                <Avatar alt={ postName } src={ imageSrc } />
                            </ListItemAvatar>
                            <ListItemText primary={ postName } secondary={ teaserText }/>
                            <ListItemSecondaryAction>
                                <Tooltip title={ teaserButtonText }>
                                    <Link href={ postUrl } passHref legacyBehavior>
                                        <IconButton color='secondary'><NavigateNextIcon /></IconButton>
                                    </Link>
                                </Tooltip>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        </Fragment>
                    })}
                    </List>
                }
            </Grid>
        </Grid>
    </Box>
}

Component.displayName = "Optimizely Foundation: Blog List Page"

async function getAllBlogPostsRecursive(root: ContentReference, api: IContentDeliveryAPI, locale?: string, recurse: boolean = true) : Promise<BlogItemPage[]>
{
    console.error("Loading posts for", root)
    const apiId = createApiId(root, true, false)
    const pages = await api.getChildren<BlogItemPage>(apiId, { branch: locale, editMode: false, select: ["*"] })
    const childPages = recurse ? await Promise.all(pages.filter(x => isBlogList(x)).map(page => getAllBlogPostsRecursive(page, api, locale))).then(r => r.flatMap(x => x)) : []
    const blogPosts : BlogItemPage[] = pages.concat(childPages).filter(x => isBlogPost(x))
    
    return blogPosts
}

const BlogFilters : FunctionComponent<{ root: ContentReference, locale?: string }> = ({ root, locale }) => 
{
    const [ loading, setLoading] = useState<boolean>(true)
    const [ filters, setFilters ] = useState<BlogListPage[]>([])
    const contentId = createApiId(root, true, false)
    const api = useOptimizelyCms()?.api

    useEffect(() => {
        let cancelled : boolean = false
        if (!api) return
        setLoading(true)

        api.getChildren<BlogListPage>(contentId, { branch: locale, editMode: false, select: ["name", "url"]}).then(allPages => {
            if (cancelled) 
                return
            const listPages = allPages.filter(x => isBlogList(x)) as BlogListPage[]
            setFilters(listPages)
            setLoading(false)
        })

        return () => { cancelled = true }
    }, [ api, contentId, locale ])

    if (loading)
        return <LinearProgress />

    if (filters.length < 1)
        return <ListItemButton disabled>
            <ListItemIcon><LabelIcon /></ListItemIcon>
            <ListItemText primary="No categories" />
        </ListItemButton>


    return <>{filters.map(item => <BlogFilterItem item={item} locale={locale} key={ `blog-filter-${createApiId(item, true, false)}` } /> )}</>

}

const BlogFilterItem : FunctionComponent<{ item: BlogListPage, locale?: string}> = ({item, locale}) => 
{    
    const [ showChildren, setShowChildren ] = useState<boolean>(false)
    function doShowChildren(e: MouseEvent<SVGElement>) { setShowChildren( true ); e.preventDefault(); return false; }
    function doHideChildren(e: MouseEvent<SVGElement>) { setShowChildren( false ); e.preventDefault(); return false; }

    return <><Link href={ pv(item, "url") ?? '#unnamed' } passHref>
            <ListItemButton component="a">
                <ListItemIcon><LabelIcon /></ListItemIcon>
                <ListItemText primary={ pv(item, "name" ) ?? "Unnamed item"} />
                { showChildren ? <ExpandLessIcon onClick={ doHideChildren } /> : <ExpandMoreIcon onClick={ doShowChildren }/> }
            </ListItemButton>
        </Link>
        <Collapse in={ showChildren }>
                <List component="div" disablePadding sx={{ pl: 4 }}>
                    {showChildren && <BlogFilters root={ item } locale={locale} /> }
                </List>
            </Collapse>
        </>
}

export default Component