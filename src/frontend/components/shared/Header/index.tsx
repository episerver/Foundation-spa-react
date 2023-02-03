import type { FunctionComponent, MouseEvent } from "react"
import React, { useState } from 'react'
import { useRouter } from 'next/router'

import { useContents } from '@optimizely/cms'
import { readValue as pv } from '@optimizely/cms/utils'
import { useLayoutSettings } from '../Layout/settings'

import Link from 'next/link'
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, MenuItem } from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'

import Logo from './Logo'
import LanguageMenu from './LanguageMenu'
import UserMenu from './UserMenu'

export type HeaderProps = {}

export const Header : FunctionComponent<HeaderProps> = props => 
{
    const router = useRouter()
    const locale = router.locale ?? router.defaultLocale
    const layoutSettings = useLayoutSettings()
    const topMenu = pv(layoutSettings, "mainMenu") ?? []
    const topMenuItems = useContents(topMenu.map(i => i.contentLink), ["name","url"], undefined, locale, undefined, false)
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const companyName = pv(layoutSettings, "companyName") ?? "Mosey"
    const companyLogo = pv(layoutSettings, "siteLogo") ?? undefined
    const logoHeight = (pv(layoutSettings, "logoHeight") ?? 75)
    const pages : { name: string, href: string }[] = (topMenuItems.data ?? []).map(tmi => {
        return {
            name: pv(tmi, "name") ?? "-",
            href: pv(tmi, "url") ?? "#"
        }
    })

    function removeLastSlash(url: string)
    {
        return (new URL(url, 'http://localhost')).pathname
    }

    return <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Logo companyName={ companyName } companyLogo={ companyLogo } logoHeight={ logoHeight } />

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, order: 1 }}>
                        <IconButton sx={{ display: { xs: 'flex', md: 'none' }}} size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit" >
                            <MenuIcon />
                        </IconButton>
                        <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left' }} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{ display: { xs: 'block', md: 'none' } }} >
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                    <Link href={removeLastSlash(page.href)} passHref legacyBehavior><Typography textAlign="center" component="a">{page.name}</Typography></Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, order: 2 }}>
                        {pages.map((page) => (
                            <Link key={page.name} href={removeLastSlash(page.href)} passHref legacyBehavior>
                                <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                                    {page.name}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0, order: 3 }}>
                        <LanguageMenu />
                        <UserMenu />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
}

export default Header