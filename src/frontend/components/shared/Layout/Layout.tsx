import type { FunctionComponent,PropsWithChildren } from 'react'
import React from 'react'
import { Container } from '@mui/material'
import { Header, Footer } from '..'

export type LayoutProps = {
    contentId ?: string
}

export const Layout : FunctionComponent<PropsWithChildren<LayoutProps>> = props => 
{
    return <>
        <Header />
        <Container maxWidth="xl">
            { props.children }
        </Container>
        <Footer contentId={ props.contentId } />
    </>
}

export default Layout