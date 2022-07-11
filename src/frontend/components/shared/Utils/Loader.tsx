import type { FunctionComponent as FC } from 'react'
import React from 'react'
import Container from '@mui/material/Container'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'

export type LoaderProps = {
    guidValue ?: string
}

export const Loader : FC<LoaderProps> = props => 
{
    const avatar = <CircularProgress variant='indeterminate'  />

    return <Container maxWidth="xs" sx={{marginY: "2rem"}} >
        <Card data-guid={ props.guidValue } variant="elevation" raised={true} >
            <CardHeader avatar={ avatar } title="Loading content ..." subheader="Which waiting beverage do you prefer?" titleTypographyProps={{variant: 'h5'}}/>
            <CardContent>
                <Typography variant='body2'>Looking at a spinner is the perfect timing to get yourself a refil of your favourite waiting beverage. Maybe, and just maybe, you could summon the courage to try a new waiting beverage and discover a new favourite.</Typography>
            </CardContent>
        </Card>
    </Container>
}

export default Loader