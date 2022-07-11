import type { IContentComponent } from '@optimizely/cms/models'
import type { LocationItemPage } from 'schema'

import { readValue as pv } from '@optimizely/cms/utils'

// Components
import { EditableField as Editable } from '@optimizely/cms/components'
import ContentArea from '@components/shared/Utils/ContentArea'
import Head from 'next/head'
import { Typography, Grid, List, ListItem, ListItemText } from '@mui/material'

export const Component : IContentComponent<LocationItemPage> = props =>
{
    const { content } = props
    const locationName = pv(content, "name" ) ?? "Unknown location"
    return <div className='location-item-page'>
        <Head>
            <title>{ locationName }</title>
        </Head>
        <Editable field="name"><Typography variant='h1'>{ locationName }</Typography></Editable>
        <Typography variant='body1'><Editable field="mainIntro" inline>{ pv(content, "mainIntro" ) ?? "" }</Editable></Typography>
        <Grid container sx={{ marginTop: "2em"}}>
            <Grid item xs={3}>
                <Typography variant='h5' component='div'>Information</Typography>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} >
                    <ListItem>
                        <ListItemText id="switch-list-label-wifi" secondary="Country" primary={ <Editable field="country" inline>{ pv(content, "country") ?? ""}</Editable> } />
                    </ListItem>
                    <ListItem>
                        <ListItemText id="switch-list-label-wifi" secondary="Continent" primary={ <Editable field="continent" inline>{ pv(content, "continent") ?? "" }</Editable> } />
                    </ListItem>
                    <ListItem>
                        <ListItemText id="switch-list-label-wifi" secondary="Latitude" primary={ <Editable field="latitude" inline>{ (pv(content, "latitude") ?? 0).toLocaleString(props.locale, { maximumFractionDigits: 6 }) }</Editable> } />
                    </ListItem>
                    <ListItem>
                        <ListItemText id="switch-list-label-wifi" secondary="Longitude" primary={ <Editable field="longitude" inline>{ (pv(content, "longitude") ?? 0).toLocaleString(props.locale, { maximumFractionDigits: 6 }) }</Editable> } />
                    </ListItem>
                    <ListItem>
                        <ListItemText id="switch-list-label-wifi" secondary="Average Temp" primary={ <Editable field="avgTemp" inline>{ `${ (pv(content, "avgTemp") ?? 0).toLocaleString(props.locale) } Celcius` }</Editable> } />
                    </ListItem>
                    <ListItem>
                        <ListItemText id="switch-list-label-wifi" secondary="Airport" primary={ <Editable field="airportInitials" inline>{ pv(content, "airportInitials") ?? "" }</Editable> } />
                    </ListItem>
                    <ListItem>
                        <ListItemText id="switch-list-label-wifi" secondary="Passengers" primary={ <Editable field="yearlyPassengers" inline>{ (pv(content, "yearlyPassengers") ?? 0).toLocaleString(props.locale) }</Editable> } />
                    </ListItem>
                </List>
                <ContentArea content={ content } name="leftContentArea" />
            </Grid>
            <Grid item xs={9}>
                <ContentArea content={ content } name="mainContentArea" />
                <Typography variant='body2' component='div'>
                    <Editable field="mainBody" html={pv(content, "mainBody" ) ?? ""}></Editable>
                </Typography>
            </Grid>
        </Grid>
    </div>
}

Component.displayName = "Optimizely Foundation: LocationItemPage"

export default Component