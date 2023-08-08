import type { FunctionComponent, PropsWithChildren } from 'react'
import React from 'react'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import { PaletteMode, ThemeProvider } from '@mui/material'
//import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../Header'
import Footer from '../Footer'
import createTheme from './theme'

export type LayoutProps = {}

export const Layout : FunctionComponent<PropsWithChildren<LayoutProps>> = props => 
{
    // Automatic theme switcher
    let themeMode : PaletteMode = 'light'

    /* const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    startTransition(() => {
        themeMode = prefersDarkMode ? 'dark' : 'light'
    })*/

    // Basic Layout Structure
    return <ThemeProvider theme={ createTheme(themeMode) }>
        <CssBaseline />
        <Header />
        <Container maxWidth="xl">
            { props.children }
        </Container>
        <Footer />
    </ThemeProvider>
}

export default Layout