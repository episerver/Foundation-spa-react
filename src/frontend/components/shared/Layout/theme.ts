import type { ThemeOptions, PaletteOptions, PaletteMode } from '@mui/material'
import type { ResponsiveFontSizesOptions } from '@mui/material/styles/responsiveFontSizes';
import { createTheme as muiCreateTheme, responsiveFontSizes } from "@mui/material"
import { deepmerge } from "@mui/utils"

export function createPalette(mode: PaletteMode = "light") : PaletteOptions
{
    return {
        mode,
        ...( 
            mode === "light" ? {
                primary: {
                    //main: '#61a0a8',
                    //dark: '#27747e',
                    main: '#27747e',
                    light: '#e6f3ef'
                },
                secondary: {
                    //main: '#f50057',
                    main: '#4C3B4D'
                }
            } : {

            }
        )
    }
}

export function createTheme(palette: PaletteMode = "light", overrides: ThemeOptions = {}, fontsizeOverrides: ResponsiveFontSizesOptions = {})
{
    const defaultTheme : ThemeOptions = {
        palette: createPalette(palette),
        typography: {
            fontFamily: '"Oxygen", "Helvetica", "Arial", sans-serif',
        },
        components: {
            MuiAppBar: {
                defaultProps: {
                    color: "primary"
                },
            }
        },
        shape: {
            borderRadius: 0
        }
    }
    const themeOptions = deepmerge<ThemeOptions>(defaultTheme, overrides)
    const fontSizeOptions = deepmerge<ResponsiveFontSizesOptions>({}, fontsizeOverrides)
    return responsiveFontSizes(muiCreateTheme(themeOptions), fontSizeOptions)
}

export default createTheme;