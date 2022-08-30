import type { FunctionComponent,PropsWithChildren } from 'react'
import React from 'react'
import { Container, ThemeProvider, CssBaseline } from '@mui/material'
import { Header, Footer } from '..'
import createTheme from './theme'

export type LayoutProps = {
    contentId ?: string
}

export const Layout : FunctionComponent<PropsWithChildren<LayoutProps>> = props => 
{
    return <ThemeProvider theme={ createTheme('light') }>
        <CssBaseline />
        <Header />
        <Container maxWidth="xl">
            { props.children }
        </Container>
        <Footer contentId={ props.contentId } />
    </ThemeProvider>
}

export default Layout