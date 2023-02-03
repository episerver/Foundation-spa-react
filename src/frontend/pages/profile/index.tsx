import type { FunctionComponent } from "react"
import type { DefaultUser, } from "next-auth"
import React, { useState } from "react"
import { useSession, signIn } from 'next-auth/react'
import LinearProgress from '@mui/material/LinearProgress'
import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import ListItemIcon from "@mui/material/ListItemIcon"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import CardActions from "@mui/material/CardActions"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Switch from "@mui/material/Switch"

import { Person, Email, Group, Edit, LockOpen, Password } from "@mui/icons-material"
import { useRouter } from "next/router"

export type ProfilePageProps = {

}

type UserWithRole = DefaultUser & { role?: string }
type EnhancedSessionData = (NonNullable<ReturnType<typeof useSession>['data']> & { at?: string, error?: string, scope?: string }) | null
type EnhancedSessionHook = Omit<ReturnType<typeof useSession>, 'data'> & { data: EnhancedSessionData }

export const ProfilePage : FunctionComponent<ProfilePageProps> = props => 
{
    const { status: sessionStatus, data : sessionData } : EnhancedSessionHook = useSession()
    const router = useRouter()
    const [ showDetails, setShowDetails ] = useState<boolean>(false)

    function onDetailsChanged(event: React.ChangeEvent<HTMLInputElement>)
    {
        setShowDetails(event.target.checked)
    }
    function onEditProfile() 
    {
        const profileUrl = new URL(`${ (process.env as any).OPTIMIZELY_DXP_ADMIN_PREFIX }/EPiServer.Cms.UI.Settings/settings`, process.env.OPTIMIZELY_DXP_URL)
        router.push(profileUrl.href)
    }
    
    if (sessionStatus === "unauthenticated")
        signIn()

    if (sessionStatus === "loading")
        return <LinearProgress />

    return <>
        <Typography variant="h1">Dashboard</Typography>
        { sessionData?.error ? 
            <Alert severity="error" sx={{mb: 3}}>{ (sessionData?.error as string | undefined) ?? "Undefined error" }</Alert> : 
            <Alert severity="success" sx={{mb: 3}}>Valid session</Alert>
        }
        <Box sx={{mb: 3}}>
            <Typography>
                <Switch checked={ showDetails } onChange={ onDetailsChanged }/> Show technical information
            </Typography>
        </Box>
        <Grid container spacing={3}>
            <Grid item xs={12} md={6} sx={{ height: '100%'}}>
                <Card>
                    <CardHeader title="Profile" subheader="The data we have on you"/>
                    <CardContent>
                        <List>
                            <ListItem>
                                <ListItemIcon><Person /></ListItemIcon>
                                <ListItemText primary={ sessionData?.user?.name ?? "Not authenticated" } secondary="Your username / login" />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><Email /></ListItemIcon>
                                <ListItemText primary={ sessionData?.user?.email ?? "Not authenticated" } secondary="This is where we'll message you when we need your attention" />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><Password /></ListItemIcon>
                                <ListItemText primary="********" secondary="Rest assured, even we cannot read your password" />
                            </ListItem>
                        </List>
                    </CardContent>
                    <CardActions>
                        <Button color="secondary" variant="contained" onClick={ onEditProfile } startIcon={ <Edit/> }>Edit profile</Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} md={6} sx={{ height: '100%'}}>
                <Card>
                    <CardHeader title="Groups" subheader="These are the groups you belong to"/>
                    <CardContent>
                        <List>
                        { ((sessionData?.user as UserWithRole)?.role ?? "").split(":").map(role => role.trim()).sort().map(role => <ListItem key={`role-${ role }`}>
                                <ListItemIcon><Group /></ListItemIcon>
                                <ListItemText primary={ role ?? "Not authenticated" } />
                            </ListItem>) }
                        </List>
                    </CardContent>
                </Card>
            </Grid>
            { showDetails ?
            <Grid item xs={12} md={6} sx={{ height: '100%'}}>
                <Card>
                    <CardHeader title="Services" subheader="These are the services you've authenticated for the website"/>
                    <CardContent>
                        <List>
                        { ((sessionData?.scope as string | undefined) ?? "").split(" ").map(scope => <ListItem key={`scope-${ scope }`}>
                                <ListItemIcon><LockOpen /></ListItemIcon>
                                <ListItemText primary={ scope ?? "Not authenticated" } />
                            </ListItem>) }
                        </List>
                    </CardContent>
                </Card>
            </Grid> : undefined }
            { showDetails ?
            <Grid item xs={12} md={6} sx={{ height: '100%'}}>
                <Card>
                    <CardHeader title="Token" subheader="This is how you identify yourself with our services, sharing this with anyone is just not a good idea."/>
                    <CardContent>
                        <Typography variant="body2" sx={{ fontSize: "0.5rem" }}>{ sessionData?.at as string | undefined }</Typography>
                    </CardContent>
                </Card>
            </Grid> : undefined }
        </Grid>
    </>
}

export default ProfilePage