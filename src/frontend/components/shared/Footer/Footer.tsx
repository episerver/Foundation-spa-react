// Type definitions
import type { FunctionComponent } from "react"
import type { LayoutSettings } from 'schema'

// Framework
import React from 'react'
import { useSettings } from '@framework/foundation/cms/settings'
import { readValue as pv } from '@optimizely/cms/utils'

// Components
import { Container, Grid, Typography, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { ContentArea } from '@components/shared/Utils/ContentArea'
import Link from 'next/link'

export type FooterProps = {
    contentId ?: string
}

export const Footer : FunctionComponent<FooterProps> = props => 
{
    const cmsSettings = useSettings<LayoutSettings>('LayoutSettings').data?.settings
    const links = pv(cmsSettings, "links") ?? []
    const socials = pv(cmsSettings, "socialLinks") ?? []

    return <Container maxWidth="xl" component="footer">
        <Grid container spacing="2">
            <Grid item xs={12} sx={{ textAlign: "center"}}>
                <Typography variant="h6" component="p">{ pv(cmsSettings, "introduction") ?? "" }</Typography>
            </Grid>
            <Grid item xs={4} md={3}>
                <Typography variant="subtitle1">{ pv(cmsSettings, "companyHeader") ?? "" }</Typography>
                <Typography variant="body2">{ pv(cmsSettings, "companyName") ?? "" }</Typography>
                <Typography variant="body2" component="address">{ pv(cmsSettings, "companyAddress") ?? "" }</Typography>
                <Typography variant="body2">{ pv(cmsSettings, "companyPhone") ?? "" }</Typography>
                <Typography variant="body2">{ pv(cmsSettings, "companyEmail") ?? "" }</Typography>
            </Grid>
            <Grid item xs={4} md={2}>
                <Typography variant="subtitle1">{ pv(cmsSettings, "linksHeader") ?? "" }</Typography>
                <List>
                { links.map(link => {
                    return  <ListItem key={"link-"+link.href} disablePadding>
                        <Link href={link.href} passHref>
                            <ListItemButton component="a" title={ link.title } target={ link.target }>
                                <ListItemText primary={ link.text } />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                })}
                </List>
            </Grid>
            <Grid item xs={4} md={2}>
                <Typography variant="subtitle1">{ pv(cmsSettings, "socialHeader") ?? "" }</Typography>
                <List>
                { socials.map(link => {
                    return  <ListItem key={"social-"+link.href} disablePadding>
                        <Link href={link.href} passHref>
                            <ListItemButton component="a" title={ link.title } target={ link.target }>
                                <ListItemText primary={ link.text } />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                })}
                </List>
            </Grid>
            <Grid item xs={12} md={5}>
                <ContentArea content={ cmsSettings } name="contentArea" />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Typography mt={2} variant="caption">&copy; { (new Date()).getFullYear() } Remko Jantzen / { pv(cmsSettings, "footerCopyrightText") ?? "" } - Service code: { props.contentId }</Typography>
            </Grid>
        </Grid>
    </Container>
}

export default Footer