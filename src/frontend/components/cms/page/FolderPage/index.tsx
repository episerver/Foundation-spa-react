import type { IContentComponent, IContent } from '@optimizely/cms/models'
import type { FolderPage } from 'schema'
import React, { useState, useEffect, startTransition } from 'react'
import Link from 'next/link'
import { useOptimizelyCms, useContentEditMode } from '@optimizely/cms/context'
import { EditableField } from '@optimizely/cms/components'
import { readValue as pv, createApiId } from '@optimizely/cms/utils'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import { Folder, Pages } from '@mui/icons-material'
import { Breadcrumbs } from '@components/shared'

export const Component : IContentComponent<FolderPage> = ({ content, locale }) =>
{
    const folderName : string = pv(content, "name") || "Unnamed folder"
    const [ children, setChildren ] = useState<IContent[]>([])
    const { api } = useOptimizelyCms()
    const { contentEditable } = useContentEditMode(content)
    const id = content ? createApiId(content) : "-"
    const branch = locale

    useEffect(() => {
        let cancelled = false
        if (!api || id === '-')
            return

        api.getChildren(id, { branch, editMode: false, select: ["name","url"] }).then(data => {
            if (!cancelled) startTransition(() => setChildren(data))
        })
        return () => {
            cancelled = true
        }
    }, [ api, id, branch ])


    return <Box>
        <Breadcrumbs />
        <EditableField field='name' contentEditable={ contentEditable }><Typography variant="h1"><Folder fontSize='inherit' /> { folderName }</Typography></EditableField>
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
            return <Link key={ `folder-${ id }-item-${ childId }` } passHref href={ child.url ?? '#'} legacyBehavior>
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