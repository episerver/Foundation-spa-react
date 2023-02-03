// React
import type { FunctionComponent, MouseEvent } from 'react'
import React, { Fragment, useState } from 'react'

// Next.JS & SWR
import { useRouter} from 'next/router'

// Material UI
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import LanguageIcon from '@mui/icons-material/Language'
import BookmarkBorderIcon from '@mui/icons-material/FlagOutlined'

// Optimizely
import type { WebsiteInfo } from '@optimizely/cms/models'
import { withErrorBoundary } from '@optimizely/cms/error-boundary'
import { useContent } from '@optimizely/cms/use-content'
import { useWebsite } from '@optimizely/cms/use-website'

// Framework
import useCurrentContent from '@framework/current-content'

// Implementation assets
import DefaultSiteInfo from 'website.cjs'

export type LanguageMenuProps = {

}

function getLocaleHomepage(locale: string, siteInfo?: WebsiteInfo)
{
    if (!siteInfo?.locales?.includes(locale))
        return '/'

    const domains : { domain: string, defaultLocale: string }[] = siteInfo?.localeDomains || []
    const domain = domains.filter(x => x.defaultLocale === locale)
    if (domain && domain.length > 0)
        return domain[0].domain

    if (!siteInfo?.primaryDomain)
        return `/${ locale }/`

    const langUrl = (new URL('/'+locale, siteInfo.primaryDomain)).href
    return langUrl
}

export const LanguageMenu : FunctionComponent<LanguageMenuProps> = props =>
{
    const router = useRouter()
    const contentId = useCurrentContent() ?? "-"
    const locale = router.locale ?? router.defaultLocale
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const contentData = useContent(contentId)
    const website = useWebsite(DefaultSiteInfo, locale)
    const open = Boolean(anchorEl);
    
    const handleOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }
    const handleClick = (event: MouseEvent<HTMLElement>, locale: string) => {
        var languageUrl = new URL(getLocaleHomepage(locale, website?.data))
        if (contentData?.data) {
            const contentLinks = contentData?.data?.existingLanguages?.filter(x => x.name == locale) ?? []
            if (contentLinks && contentLinks.length > 0 && contentLinks[0].link)
                languageUrl = new URL(contentLinks[0].link)
        }

        const path = languageUrl.pathname;
        router.push(path, path, { locale });
        return false;
    }

    return <Fragment>
        <Tooltip title="Select language">
            <IconButton onClick={handleOpen} size="small" color='inherit' aria-controls={open ? 'language-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined}>
                <LanguageIcon sx={{ fontSize: '40px' }} />
            </IconButton>
        </Tooltip>
        <Menu 
            anchorEl={anchorEl}
            id="language-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 20,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
            <MenuItem selected={ false } divider={ true } disabled={ true }>Language:</MenuItem>
            { website?.data?.labels.map(label => 
            <MenuItem key={ label.code } onClick={ (e) => handleClick(e, label.code) } selected={ locale == label.code }>
                <ListItemIcon><BookmarkBorderIcon /></ListItemIcon>
                <ListItemText>{ label.label }</ListItemText>
            </MenuItem>) }
        </Menu>
    </Fragment>
}

const LanguageMenuFallback : FunctionComponent<{}> = () => <IconButton size="small" color='inherit' aria-haspopup="false"><LanguageIcon sx={{ fontSize: '40px' }} /></IconButton>

export const LanguageMenuWithErrorBoundary = withErrorBoundary(LanguageMenu, <LanguageMenuFallback />)

export default LanguageMenuWithErrorBoundary;