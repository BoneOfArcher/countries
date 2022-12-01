import * as React from 'react';
import { useEffect, useState } from "react";
import { Country } from "./core/types";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { Url } from "./core/constants";
import Details from "./pages/Details";
import Navbar from "./Components/Navbar";
import { createTheme, CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";
import { getDesignTokens } from "./theme/theme";


function App() {
    const [countiesList, setCountiesList] = useState<Country[]>()
    const [mode, setMode] = React.useState<PaletteMode>(localStorage.getItem("colorMode") as PaletteMode
        || "light")
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode: PaletteMode) =>
                    prevMode === 'light' ? 'dark' : 'light',
                )
            },
        }), [],
    )
    const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode])
    useEffect(() => {
        localStorage.setItem("colorMode", mode)
    }, [mode])
    return (
        <>
            <ThemeProvider theme={theme}>
                <Navbar toggleMode={colorMode.toggleColorMode}/>
                <CssBaseline/>
                <Routes>
                    <Route index path={"/"}
                           element={<Home countiesList={countiesList} setCountiesList={setCountiesList}/>}/>
                    <Route index path={`/${Url.details}/:${Url.detailsName}`} element={<Details/>}/>
                </Routes>
            </ThemeProvider>

        </>

    );
}

export default App;
