import type { IContentComponent } from '@optimizely/cms/models'
import type { LocationItemPage } from 'schema'
import type { SxProps } from '@mui/system'
import type { AppTheme as Theme } from '@components/shared/Layout/theme'

import { readValue as pv, ContentReference } from '@optimizely/cms/utils'
import { useEditMode } from '@optimizely/cms'

// Components
import { EditableField as Editable, ContentComponent } from '@optimizely/cms/components'
import ContentArea from '@components/shared/Utils/ContentArea'
import Image from 'next/image'
import Head from 'next/head'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListSubheader from '@mui/material/ListSubheader'
import ListItemText from '@mui/material/ListItemText'
import Box from '@mui/material/Box'
import XHtmlContent from '@framework/foundation/cms/structuredhtml'
import componentFactory from '@components/shared/Utils/factory'

export const Component : IContentComponent<LocationItemPage> = ({ content, locale }) =>
{
    const locationName = pv(content, "name" ) ?? "Unknown location"
    const imageLink = pv(content, "image")
    const imageUrl = imageLink && ContentReference.createContentUrl(imageLink, true)
    const videoLink = pv(content, "teaserVideo")
    const { isEditable, inEditMode } = useEditMode()

    const hasHeader = imageLink || videoLink
    const headerBackground = !hasHeader ? <></> : <Box sx={{ position: 'absolute', width: '100%', paddingBottom: '30%', left: '0', top: 'auto', zIndex: '-10' }} >
        { videoLink && <ContentComponent content={ videoLink } contentType={["video","media","VideoFile"]} /> }
        { imageUrl && !videoLink && <Image src={ imageUrl } alt={`An impression of ${ locationName }`} fill style={{ objectFit: 'cover' }} /> }
        <Box sx={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(255,255,255,0)', background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,1) 100%)' }}/>
    </Box>

    const introStyles : SxProps<Theme> = hasHeader ? {
        color: 'whitesmoke',
        textShadow: '1px 1px 3px black'
    } : {}
    const gridStyles : SxProps<Theme> = hasHeader ? 
        { mt: '2em', backgroundColor: 'rgba(255,255,255,0.7)', borderTopRightRadius: '1em', borderTopLeftRadius: '1em', boxShadow: '0px -10px 10px rgba(0,0,0,0.5)', p: '1em'} :
        { mt: '2em' }

    return <>
        { headerBackground }
        <div className='location-item-page'>
            <Head>
                <title>{ locationName }</title>
            </Head>
            <Editable field="name"><Typography variant='h1' sx={{ ...introStyles, pt: imageUrl ? 4 : 2 }}>{ locationName }</Typography></Editable>
            <Typography variant='body1' sx={ introStyles }><Editable field="mainIntro" inline>{ pv(content, "mainIntro" ) ?? "" }</Editable></Typography>
            <Grid container sx={ gridStyles } columnSpacing={2}>
                <Grid item xs={3}>
                    <List 
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} 
                        component="nav" 
                        aria-labelledby='details-subheader' 
                        subheader=
                        {
                            <ListSubheader component="div" id="details-subheader" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>About { locationName }</ListSubheader> 
                        }
                    >
                        <ListItem component="div">
                            <ListItemText secondary="Country" primary={ <Editable field="country" inline>{ pv(content, "country") ?? ""}</Editable> } />
                        </ListItem>
                        <ListItem component="div">
                            <ListItemText secondary="Continent" primary={ <Editable field="continent" inline>{ pv(content, "continent") ?? "" }</Editable> } />
                        </ListItem>
                        <ListItem component="div">
                            <ListItemText secondary="Latitude" primary={ <Editable field="latitude" inline>{ (pv(content, "latitude") ?? 0).toLocaleString(locale, { maximumFractionDigits: 6 }) }</Editable> } />
                        </ListItem>
                        <ListItem component="div">
                            <ListItemText secondary="Longitude" primary={ <Editable field="longitude" inline>{ (pv(content, "longitude") ?? 0).toLocaleString(locale, { maximumFractionDigits: 6 }) }</Editable> } />
                        </ListItem>
                        { (inEditMode || isEditable || pv(content, "avgTemp")) && <ListItem component="div">
                            <ListItemText secondary="Average Temp" primary={ <Editable field="avgTemp" inline>{ `${ (pv(content, "avgTemp") ?? 0).toLocaleString(locale) } Celcius` }</Editable> } />
                        </ListItem> }
                        { (inEditMode || isEditable || pv(content, "airportInitials")) && <ListItem component="div">
                            <ListItemText secondary="Airport" primary={ <Editable field="airportInitials" inline>{ pv(content, "airportInitials") ?? "" }</Editable> } />
                        </ListItem> }
                        { (inEditMode || isEditable || pv(content, "yearlyPassengers")) && <ListItem component="div">
                            <ListItemText secondary="Passengers" primary={ <Editable field="yearlyPassengers" inline>{ (pv(content, "yearlyPassengers") ?? 0).toLocaleString(locale) }</Editable> } />
                        </ListItem> }
                    </List>
                    <ContentArea content={ content } name="leftContentArea" />
                </Grid>
                <Grid item xs={9}>
                    <ContentArea content={ content } name="mainContentArea" />
                    <Editable field="mainBody">
                        <XHtmlContent propertyData={ content?.mainBody } componentFactory={ componentFactory } />
                    </Editable>
                </Grid>
            </Grid>
        </div>
    </>
}
Component.getContentFields = undefined
Component.displayName = "Optimizely Foundation: LocationItemPage"

export default Component