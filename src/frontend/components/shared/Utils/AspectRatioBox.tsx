import type { FunctionComponent, ReactNode, PropsWithChildren } from 'react'
import type { SxProps, Theme } from '@mui/material'
import React from 'react'
import Box from '@mui/material/Box'
import { ResponsiveStyleValue } from '@mui/system'

export type AspectRatioBoxProps = {
    /**
     * The aspect ratio of the box defined as the fractional outcome of
     * the calculation height / width
     */
    ratio : ResponsiveStyleValue<number>

    width ?: string

    background ?: ReactNode

    className ?: string

    sx?: SxProps<Theme>
}

export const AspectRatioBox : FunctionComponent<PropsWithChildren<AspectRatioBoxProps>> = props =>
{
    const paddingBottom : ResponsiveStyleValue<string> | undefined =
        typeof(props.ratio) == 'number' ? `${ props.ratio * 100 }%` : 
        props.ratio == null ? '0%' : 
        Array.isArray(props.ratio) ? props.ratio.map(ratio => `${ (ratio ?? 0) * 100 }%`) :
        ((ratioMap) => { const outputData : Record<string, string>= {}; Object.getOwnPropertyNames(ratioMap).forEach(bp => { outputData[bp] = `${ (ratioMap[bp] ?? 0) * 100 }%`}); return outputData; })(props.ratio)

    const boxStyles : SxProps<Theme> = { 
        width: props.width, 
        height: 0, 
        paddingBottom, 
        position: "relative", 
        overflow: "hidden",
        ...props.sx
    }

    const className = ['aspect-ratio-box', props.className ].filter(x=>x).join(' ')

    return <Box sx={ boxStyles } className={ className }>
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