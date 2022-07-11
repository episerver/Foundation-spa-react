import type { FunctionComponent } from "react"
import type { DefaultUser } from "next-auth"
import React from 'react'
import { useSession, signIn } from 'next-auth/react'
import LinearProgress from '@mui/material/LinearProgress'
import Alert from "@mui/material/Alert"

export type ProfilePageProps = {

}

type UserWithRole = DefaultUser & { role?: string }

export const ProfilePage : FunctionComponent<ProfilePageProps> = props => 
{
    const session = useSession()
    
    if (session.status === "unauthenticated")
        signIn()

    if (session.status === "loading")
        return <LinearProgress />

    return <>
        <h1>About me</h1>
        { session.data?.error ? 
            <Alert severity="error">{ (session.data?.error as string | undefined) ?? "Undefined error" }</Alert> : 
            <Alert severity="success">Valid session</Alert>
        }
        <dl>
            <dt>Username:</dt>
            <dd>{ session.data?.user?.name }</dd>
            <dt>E-Mail:</dt>
            <dd>{ session.data?.user?.email }</dd>
            <dt>Roles:</dt>
            <dd><ul>{ ((session.data?.user as UserWithRole)?.role ?? "").split(":").map(role => <li key={`role-${ role }`}>{role}</li>) }</ul></dd>
            <dt>Services:</dt>
            <dd><ul>{ ((session.data?.scope as string | undefined) ?? "").split(" ").map(scope => <li key={`scope-${ scope }`}>{scope}</li>) }</ul></dd>
            <dt>Token:</dt>
            <dd style={{fontSize: "0.6em"}}>{ session.data?.at as string | undefined }</dd>
        </dl>
    </>
}

export default ProfilePage