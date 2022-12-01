import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { Container, useTheme } from "@mui/material";
import { FC } from "react";
import { Url } from "../core/constants";
import { StyledLink } from './styled';

interface NavbarProps {
    toggleMode: () => void
}

const Navbar: FC<NavbarProps> = ({toggleMode}) => {
    const theme = useTheme()
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" color={"inherit"}>
                <Container>
                    <Toolbar disableGutters sx={{justifyContent: "space-between"}}>
                        <StyledLink to={Url.home}>
                            <Typography variant={"h5"} component={"div"} sx={{flexGrow: 1}}>
                                Where In The World?
                            </Typography>
                        </StyledLink>
                        <Button
                            color={"inherit"}
                            startIcon={theme.palette.mode === "light" ? <WbSunnyIcon/> : <NightlightRoundIcon/>}
                            onClick={() => toggleMode()}
                        >
                            {theme.palette.mode} Mode
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
};

export default Navbar;