import type { FunctionComponent, ReactNode, PropsWithChildren } from 'react'
import type { SxProps, Theme } from '@mui/material'
import React from 'react'
import Box from '@mui/material/Box'

export type AspectRatioBoxProps = {
    /**
     * The aspect ratio of the box defined as the fractional outcome of
     * the calculation height / width
     */
    ratio : number

    width ?: string

    background ?: ReactNode

    sx?: SxProps<Theme>
}

export const AspectRatioBox : FunctionComponent<PropsWithChildren<AspectRatioBoxProps>> = props =>
{
    const boxStyles : SxProps<Theme> = { 
        width: props.width, 
        height: 0, 
        paddingBottom: `${props.ratio * 100}%`, 
        position: "relative", 
        overflow: "hidden",
        ...props.sx
    }

    return <Box sx={ boxStyles }>
        { props.background }
        <Box sx={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%"}}>
            { props.children }
        </Box>
    </Box>
}

AspectRatioBox.displayName = "Fixed aspect ratio box"
AspectRatioBox.defaultProps = {
    width: "100%"
}

export default AspectRatioBox