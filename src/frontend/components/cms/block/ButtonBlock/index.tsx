import type { IContentComponent } from "@optimizely/cms/models"
import type { ButtonBlock } from "../../../../schema"
import React from 'react'
import { readValue as pv } from '@optimizely/cms/utils'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Link from 'next/link'

export const ButtonBlockComponent : IContentComponent<ButtonBlock> = ({ content, locale }) =>
{
    const buttonLink = (new URL(pv(content, "buttonLink") ?? "/", 'http://localhost')).pathname
    const buttonText = pv(content, "buttonText")
    const buttonCaption = pv(content, "buttonCaption")
    const buttonComponent = buttonLink ? "a" : "button"

    let button = <Button component={ buttonComponent} variant="contained" color="secondary">{ buttonText }</Button>
    if (buttonLink)
        button = <Link href={ buttonLink } passHref legacyBehavior>{ button }</Link>

    if (buttonCaption)
        button = <Tooltip title={ buttonCaption }>{ button }</Tooltip>

    return button
}

ButtonBlockComponent.getContentFields = context => ['buttonLink','buttonText','buttonCaption']
ButtonBlockComponent.displayName = "CMS-Component: ButtonBlock"

export default ButtonBlockComponent