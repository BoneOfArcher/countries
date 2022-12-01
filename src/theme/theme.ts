import { colors, PaletteMode } from "@mui/material";


export const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === 'light'
                ? {
                    secondary: {
                        main: colors.blueGrey[50]
                    },
                    primary: {
                        main: colors.grey[900]
                    },
                    background: {
                        default: colors.blueGrey[50],
                        paper: colors.blueGrey[50]
                    },
                }
                : {
                    secondary: {
                        main: colors.blueGrey[500]
                    },
                    primary: {
                        main: colors.grey[400]
                    },
                    background: {
                        default: "#202d36",
                        paper: "#2b3743"
                    },
                    text: {
                        secondary: "#9ba2aa"
                    }
                }
        ),
    },
})

