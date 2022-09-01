import type { IContentComponent, IContent } from '@optimizely/cms/models'
import type { FolderPage } from 'schema'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useOptimizely } from '@optimizely/cms'
import { readValue as pv, createApiId } from '@optimizely/cms/utils'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import { Folder, Pages } from '@mui/icons-material'
import { Breadcrumbs } from '@components/shared'

export const Component : IContentComponent<FolderPage> = props =>
{
    const folderName : string = pv(props.content, "name") || "Unnamed folder"
    const [ children, setChildren ] = useState<IContent[]>([])
    const api = useOptimizely()?.api
    const id = props.content ? createApiId(props.content) : "-"
    const branch = props.locale

    useEffect(() => {
        let cancelled = false
        if (!api || id === '-')
            return

        api.getChildren(id, { branch, editMode: false, select: ["name","url"] }).then(data => {
            if (!cancelled) setChildren(data)
        })
        return () => {
            cancelled = true
        }
    }, [ api, id, branch ])


    return <Box>
        <Breadcrumbs />
        <Typography variant="h1"><Folder fontSize='inherit' /> { folderName }</Typography>
        <Typography variant="body1">This is a listing of all assets available under { folderName }</Typography>
        <List>
            { children.map(child => {
                const childId = createApiId(child)
                const type = child.contentType.slice(-1)[0]
                let icon = <Pages />
                switch (type) 
                {
                    case 'FolderPage':
                        icon = <Folder />
                        break;
                }
            return <Link key={ `folder-${ id }-item-${ childId }` } passHref href={ child.url ?? '#'}>
                <ListItemButton component="a">
                    <ListItemIcon>{ icon }</ListItemIcon>
                    <ListItemText primary={ pv(child, "name") ?? "Unnamed item"} secondary={ child.contentType?.join(' > ') ?? "Unknown type"} />
                </ListItemButton>
            </Link>
            })}
        </List>
    </Box>
}

Component.displayName = "Optimizely Foundation: FolderPage"

export default Component