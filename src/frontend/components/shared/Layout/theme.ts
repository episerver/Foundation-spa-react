import type { ThemeOptions, PaletteOptions, PaletteMode, PaletteColorOptions, Palette, PaletteColor } from '@mui/material'
import type { ResponsiveFontSizesOptions } from '@mui/material/styles/responsiveFontSizes';
import { createTheme as muiCreateTheme, responsiveFontSizes } from "@mui/material"
import { deepmerge } from "@mui/utils"

declare module '@mui/material/styles' {
    interface PaletteOptions {
        purple?: PaletteColorOptions
        green?: PaletteColorOptions
        lightBlue?: PaletteColorOptions
    }
    interface Palette {
        purple?: PaletteColor
        green?: PaletteColor
        lightBlue?: PaletteColor
    }
}
declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides { purple: true, green: true, lightBlue: true }
}

export function createPalette(mode: PaletteMode = "light") : PaletteOptions
{
    const lightPalette : PaletteOptions = {
        mode: "light",
        contrastThreshold: 4.5,
        primary: {
            main: '#080734',
            light: '#E6F3EF',
        },
        secondary: {
            main: '#861dff'
        },
        background: {
            paper: '#F9F9F9',
        },
        purple: {
            main: '#861dff'
        },
        green: {
            main: '#3be081'
        },
        lightBlue: {
            main: '#00ccff'
        }
    }
    const darkPalette : PaletteOptions = {
        mode: "dark",
        contrastThreshold: 4.5,
        primary: {
            main: '#080734',
            light: '#222222'
        },
        secondary: {
            main: '#861dff'
        },
        purple: {
            main: '#861dff'
        },
        green: {
            main: '#3be081'
        }
    }
    return mode === 'light' ? lightPalette : darkPalette
}

export function createTheme(palette: PaletteMode = "light", overrides: ThemeOptions = {}, fontsizeOverrides: ResponsiveFontSizesOptions = {})
{
    const defaultTheme : ThemeOptions = {
        palette: createPalette(palette),
        typography: {
            fontFamily: '"Figtree", "Oxygen", "Helvetica", "Arial", sans-serif',
            fontSize: 16,
            h1: {
                fontSize: '4rem'
            },
            h2: {
                fontSize: '3rem'
            },
            h3: {
                fontSize: '2rem'
            },
            h4: {
                fontSize: '1rem'
            },
        },
        direction: 'ltr',
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    '@import': [
                        'url(\'https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700;800;900&display=swap\'); ',
                        'url(\'https://fonts.googleapis.com/css2?family=Oxygen:wght@400;700&display=swap\')'
                    ],
                    a: {
                        textDecoration: 'none',
                        fontWeight: 'bold'
                    }
                }
            },
            MuiAppBar: {
                defaultProps: {
                    color: "primary"
                },
            },
            MuiButton: {
                defaultProps: {
                    color: "primary",
                },
                styleOverrides: {
                    root: {
                        borderRadius: '50px',
                        textTransform: 'capitalize',
                        paddingRight: '2rem',
                        '&:hover': {
                            '&:after': {
                                transform: 'scale(1)',
                                transition: '50ms',
                                border: '3px solid #ffce00',
                                borderLeft: 0
                            }
                        },
                        '&:after': {
                            pointerEvents: 'none',
                            position: 'absolute',
                            zIndex: 2,
                            top: 0,
                            right: 0,
                            transform: 'translate(-10px) scale(.55)',
                            transformOrigin: 'right',
                            width: '1.25rem',
                            height: '100%',
                            border: '4px solid yellow',
                            borderLeft: 0,
                            borderRadius: '0 2rem 2rem 0',
                            transition: 'cubic-bezier(.2,.98,.63,1) .35s all',
                            content: '""'
                        }
                    }
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: { 
                        display: 'flex',
                        flexFlow: 'column wrap',
                        justifyContent: 'space-between',
                        height: '100%'
                    }
                }
            },
            MuiCardContent: {
                styleOverrides: {
                    root: {
                        flexGrow: 1
                    }
                }
            },
            MuiCardActions: {
                styleOverrides: {
                    root: { 
                        flexGrow: 0
                    } 
                }
            }
        },
        shape: {
            borderRadius: 15,
        }
    }
    const themeOptions = deepmerge<ThemeOptions>(defaultTheme, overrides)
    const fontSizeOptions = deepmerge<ResponsiveFontSizesOptions>({}, fontsizeOverrides)
    return responsiveFontSizes(muiCreateTheme(themeOptions), fontSizeOptions)
}

export type AppTheme = ReturnType<typeof createTheme>

export default createTheme;