import type { FunctionComponent, MouseEvent } from 'react'

// Component library
import React, { useState } from 'react'
import { useRouter} from 'next/router'
import { Tooltip, IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material'
import { Language as LanguageIcon, Bookmark as BookmarkIcon, BookmarkBorder as BookmarkBorderIcon } from '@mui/icons-material'

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
    const [anchorElLang, setAnchorElLang] = useState<null | HTMLElement>(null)
    const contentData = useContent(cms.currentContentId)
    const locale = router.locale
    
    const handleOpenLangMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElLang(event.currentTarget);
    }
    const handleCloseLangMenu = () => {
        setAnchorElLang(null);
    }
    const handleLangClick = (event: MouseEvent<HTMLElement>, locale: string) => {
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
            <IconButton onClick={handleOpenLangMenu} sx={{ p: 0 }} color="inherit">
                <LanguageIcon />
            </IconButton>
        </Tooltip>
        <Menu sx={{ mt: '45px' }} id="menu-language" anchorEl={anchorElLang} anchorOrigin={{ vertical: 'top', horizontal: 'right', }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right', }} open={Boolean(anchorElLang)} onClose={handleCloseLangMenu} >
            { SiteInfo.labels.map(label => 
            <MenuItem key={ label.code } onClick={ (e) => handleLangClick(e, label.code) } selected={ locale == label.code }>
                <ListItemIcon><BookmarkBorderIcon /></ListItemIcon>
                <ListItemText>{ label.label }</ListItemText>
            </MenuItem>)}
        </Menu>
    </>
}

export default LanguageMenu;