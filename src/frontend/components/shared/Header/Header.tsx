import type { FunctionComponent, MouseEvent } from "react"
import type { LayoutSettings } from 'schema'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from "next-auth/react"

import { useSettings } from '@framework/foundation/cms/settings'
import { useContents } from '@optimizely/cms'
import { readValue as pv } from '@optimizely/cms/utils'

import Link from 'next/link'
import { Image } from '@optimizely/next-js/components'
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'

import LanguageMenu from './LanguageMenu'
import SiteInfo from 'website.cjs'

const settings = ['Preferences'];

export type HeaderProps = {}

export const Header : FunctionComponent<HeaderProps> = props => 
{
    const router = useRouter()
    const locale = router.locale ?? router.defaultLocale
    const cmsSettings = useSettings<LayoutSettings>('LayoutSettings', locale, SiteInfo.id)
    const layoutSettings = cmsSettings.data?.settings
    const topMenu = pv(layoutSettings, "mainMenu") ?? []
    const topMenuItems = useContents(topMenu.map(i => i.contentLink), ["name","url"], undefined, locale, undefined, false)
    const { data: session, status } = useSession()
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        switch (status) {
            case "authenticated":
                setAnchorElUser(event.currentTarget)
                break;
            case "loading":
                // @Add notifications
                break;
            default:
                signIn()
                break;
        }
    };
    const handleSignOutButton = () => {
        handleCloseUserMenu()
        signOut()
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const companyName = pv(layoutSettings, "companyName") ?? "Mosey"
    const companyLogo = pv(layoutSettings, "siteLogo") ?? undefined
    const logoHeight = (pv(layoutSettings, "logoHeight") ?? 75) + 'px'
    const pages : { name: string, href: string }[] = (topMenuItems.data ?? []).map(tmi => {
        return {
            name: pv(tmi, "name") ?? "-",
            href: pv(tmi, "url") ?? "#"
        }
    })

    function removeLastSlash(url: string)
    {
        return url.replace(/\/$/, "")
    }

    return <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link href="/" passHref>
                        <Typography variant="h6" noWrap component="a" sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }} >
                            { companyLogo ? <Image src={ companyLogo } alt={ companyName} height={logoHeight} width={250} /> : companyName }
                        </Typography>
                    </Link>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit" >
                            <MenuIcon />
                        </IconButton>
                        <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left' }} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{ display: { xs: 'block', md: 'none' } }} >
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                    <Link href={removeLastSlash(page.href)} passHref><Typography textAlign="center" component="a">{page.name}</Typography></Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Link href="/" passHref>
                        <Typography variant="h6" noWrap component="a" sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} >
                            { companyLogo ? <Image src={ companyLogo } alt={ companyName} height={logoHeight} width={250} /> : companyName }
                        </Typography>
                    </Link>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Link key={page.name} href={removeLastSlash(page.href)} passHref>
                                <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                                    {page.name}
                                </Button>
                            </Link>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <LanguageMenu />
                        <Tooltip title={ session?.user?.name ? `Settings for ${ session?.user?.name }` : "Open settings"}>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={ session?.user?.name ?? "Login please"} src={ session?.user?.image ?? "/static/images/avatar/2.jpg"} />
                            </IconButton>
                        </Tooltip>
                        <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{ vertical: 'top', horizontal: 'right', }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right', }} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu} >
                            <MenuItem key="dashboard">
                                <Link href="/profile" passHref={true} ><Typography textAlign="center">Dashboard</Typography></Link>
                            </MenuItem>
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                            <MenuItem key="logout" onClick={handleSignOutButton}>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
}

export default Header