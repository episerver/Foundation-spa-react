import type { IContentComponent } from '@optimizely/cms/models'
import type { TextBlock } from 'schema'
import { readValue } from '@optimizely/cms/utils'
import { EditableField } from '@optimizely/cms/components'
import React from 'react';
import Typography from '@mui/material/Typography'

export const TextBlockComponent : IContentComponent<TextBlock> = props => {
    const backgroundColor = readValue(props.content, "backgroundColor") || undefined
    const opacity = readValue(props.content, "blockOpacity") ?? 1
    const mainBody = readValue(props.content, "mainBody") ?? ''
    const classes : string[] = []
    const margin = readValue(props.content, 'margin')
    if (margin) classes.push(margin)
    const padding = readValue(props.content, 'padding')
    if (padding) classes.push(padding)

    return <EditableField field='mainBody'><Typography variant='body1'
        component='div'
        style={{ backgroundColor, opacity }}
        className={ classes.join (' ') }
        dangerouslySetInnerHTML={{ __html: mainBody }}
    /></EditableField>
}

TextBlockComponent.displayName = "CMS-Component: TextBlock"

export default TextBlockComponent