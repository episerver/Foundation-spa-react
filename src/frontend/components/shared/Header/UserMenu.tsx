import type { FunctionComponent, MouseEvent } from 'react'
import { useState } from 'react'
import { Tooltip, IconButton, Avatar, Menu, MenuItem, Typography } from '@mui/material'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'

const settings = ['Preferences'];

export type UserMenuProps = {}

export const UserMenu : FunctionComponent<UserMenuProps> = props => 
{
    const { data: session, status } = useSession()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl);

    
    const handleOpen = (event: MouseEvent<HTMLElement>) => {
        switch (status) {
            case "authenticated":
                setAnchorEl(event.currentTarget)
                break;
            case "loading":
                // @Add notifications
                break;
            default:
                signIn()
                break;
        }
    };

    const handleSignOut = () => {
        handleClose()
        signOut()
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    return <>
        <Tooltip title={ session?.user?.name ? `Settings for ${ session?.user?.name }` : "Open settings"}>
            <IconButton onClick={handleOpen} size="small" color='inherit' aria-controls={open ? 'user-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined}>
                <Avatar alt={ session?.user?.name ?? "Login please"} src={ session?.user?.image ?? "/static/images/avatar/2.jpg"} />
            </IconButton>
        </Tooltip>
        <Menu 
            anchorEl={anchorEl}
            id="user-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 20,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
            <MenuItem key="dashboard">
                <Link href="/profile" passHref={true} ><Typography textAlign="center">Dashboard</Typography></Link>
            </MenuItem>
            {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleClose}>
                    <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
            ))}
            <MenuItem key="logout" onClick={handleSignOut}>
                <Typography textAlign="center">Logout</Typography>
            </MenuItem>
        </Menu>
    </>
}

export default UserMenu