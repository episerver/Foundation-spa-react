import type { ContentAreaItemContainer } from '@optimizely/cms/components'
import React from 'react'
import Grid, { GridProps } from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Loader from './Loader'

export const StyledContentAreaItem : ContentAreaItemContainer = props =>
{
    let content = props.dataIsLoading || props.componentIsLoading ? <Loader /> : props.children

    const gridItemProps : GridProps = {}

    switch (props.displayOption)
    {
        case "displaymode-one-quarter":
            gridItemProps.xs = 6
            gridItemProps.lg = 3
            break;
        case "displaymode-one-sixth":
            gridItemProps.xs = 4
            gridItemProps.md = 2
            break;
        case "displaymode-one-third":
            gridItemProps.xs = 4
            break;
        case "displaymode-two-thirds":
            gridItemProps.xs = 8
            break;
        case "displaymode-half":
            gridItemProps.xs = 12
            gridItemProps.md = 6
            break;
        case "displaymode-screen":
        case "displaymode-full":
        default:
            gridItemProps.xs = 12
            break
    }

    if (props.displayOption == "displaymode-screen")
        content = <Box sx={{
            position: "relative",
            width: "calc(100vw - 18px)",
            padding: "0px",
            left: "50%",
            transform: "translate(-50%,0)"
        }}>{ content }</Box>

    //console.log("FE ContentAreaItem:", props.dataEpiBlockId);
    if (props.dataEpiBlockId)
        return <Grid item { ...gridItemProps } data-displayoption={ props.displayOption } data-epi-block-id={ `${ props.dataEpiBlockId }` }>{ content }</Grid>

    return <Grid item { ...gridItemProps } data-displayoption={ props.displayOption }>{ content }</Grid>
}

StyledContentAreaItem.displayName = "Foundation Decoupled: ContentArea Item"

export default StyledContentAreaItem