import type { FunctionComponent, MouseEvent } from 'react'

// Component library
import React, { useState } from 'react'
import { useRouter} from 'next/router'
import { Tooltip, IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material'
import { Language as LanguageIcon, FlagOutlined as BookmarkBorderIcon } from '@mui/icons-material'

// Optimizely
import { useOptimizely, useContent } from '@optimizely/cms';

// Implementation assets
import SiteInfo from 'website.cjs'

export type LanguageMenuProps = {

}

function getLocaleHomepage(locale: string)
{
    if (!SiteInfo?.locales?.includes(locale))
        return '/'

    const domains : { domain: string, defaultLocale: string }[] = SiteInfo?.localeDomains || []
    const domain = domains.filter(x => x.defaultLocale === locale)
    if (domain && domain.length > 0)
        return domain[0].domain

    if (!SiteInfo?.primaryDomain)
        return `/${ locale }/`

    const langUrl = (new URL('/'+locale, SiteInfo.primaryDomain)).href
    return langUrl
}

export const LanguageMenu : FunctionComponent<LanguageMenuProps> = props =>
{
    const router = useRouter()
    const cms = useOptimizely()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const contentData = useContent(cms.currentContentId)
    const locale = router.locale
    const open = Boolean(anchorEl);
    
    const handleOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }
    const handleClick = (event: MouseEvent<HTMLElement>, locale: string) => {
        var languageUrl = new URL(getLocaleHomepage(locale))

        const contentLinks = contentData?.data?.existingLanguages?.filter(x => x.name == locale) ?? []
        if (contentLinks && contentLinks.length > 0 && contentLinks[0].link)
            languageUrl = new URL(contentLinks[0].link)

        const path = languageUrl.pathname;
        router.push(path, path, { locale });
        return false;
    }

    return <>
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
            { SiteInfo.labels.map(label => 
            <MenuItem key={ label.code } onClick={ (e) => handleClick(e, label.code) } selected={ locale == label.code }>
                <ListItemIcon><BookmarkBorderIcon /></ListItemIcon>
                <ListItemText>{ label.label }</ListItemText>
            </MenuItem>)}
        </Menu>
    </>
}

export default LanguageMenu;