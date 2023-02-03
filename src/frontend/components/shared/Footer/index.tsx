// Type definitions
import type { FunctionComponent } from "react"

// Framework
import React from 'react'
import useCurrentContent from "@framework/current-content"
import { readValue as pv } from '@optimizely/cms/utils'
import { useLayoutSettings } from '../Layout/settings'

// Components
import { Container, Grid, Typography, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Box } from '@mui/material'
import { Bookmark as BookmarkIcon } from '@mui/icons-material'
import { ContentArea } from '@components/shared/Utils/ContentArea'
import Link from 'next/link'

export type FooterProps = {}

export const Footer : FunctionComponent<FooterProps> = props => 
{
    const contentId = useCurrentContent()
    const cmsSettings = useLayoutSettings()
    const links = pv(cmsSettings, "links") ?? []
    const socials = pv(cmsSettings, "socialLinks") ?? []
    const introductionText = pv(cmsSettings, "introduction")

    return <Box component="footer" sx={{ backgroundColor: 'primary.light', py: { xs: 1, md: 2 }, borderTopColor: 'primary.main', borderTopStyle: 'solid', borderTopWidth: '2px', mt: 3 }}><Container maxWidth="xl">
        <Grid container spacing="2">
            { introductionText ?
            <Grid item xs={12} sx={{ textAlign: "center", my: { xs: 1, md: 2, lg: 3 }}}>
                <Typography variant="h5" component="p">{ introductionText }</Typography>
            </Grid>
            : undefined }
            <Grid item xs={4} md={3}>
                <Typography variant="subtitle1">{ pv(cmsSettings, "companyHeader") ?? "" }</Typography>
                <Typography variant="body2">{ pv(cmsSettings, "companyName") ?? "" }</Typography>
                <Typography variant="body2" component="address">{ pv(cmsSettings, "companyAddress") ?? "" }</Typography>
                <Typography variant="body2">{ pv(cmsSettings, "companyPhone") ?? "" }</Typography>
                <Typography variant="body2">{ pv(cmsSettings, "companyEmail") ?? "" }</Typography>
            </Grid>
            <Grid item xs={4} md={2}>
                <Typography variant="subtitle1">{ pv(cmsSettings, "linksHeader") ?? "" }</Typography>
                <List dense>
                { links.map(link => {
                    return  <ListItem key={"link-"+link.href} disablePadding>
                        <Link href={link.href} passHref legacyBehavior>
                            <ListItemButton component="a" title={ link.title } target={ link.target }>
                                <ListItemIcon><BookmarkIcon/></ListItemIcon>
                                <ListItemText primary={ link.text } />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                })}
                </List>
            </Grid>
            <Grid item xs={4} md={2}>
                <Typography variant="subtitle1">{ pv(cmsSettings, "socialHeader") ?? "" }</Typography>
                <List dense>
                { socials.map(link => {
                    return  <ListItem key={"social-"+link.href} disablePadding>
                        <Link href={link.href} passHref legacyBehavior>
                            <ListItemButton component="a" title={ link.title } target={ link.target }>
                                <ListItemIcon><BookmarkIcon/></ListItemIcon>
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
                <Typography mt={2} variant="caption">&copy; { (new Date()).getFullYear() } Remko Jantzen / { pv(cmsSettings, "footerCopyrightText") ?? "" } - Service code: { contentId ?? "00000000-0000-0000-0000-000000000000" }</Typography>
            </Grid>
        </Grid>
    </Container>
    </Box>
}

export default Footer