import React, { FC } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Container,
    Grid,
    Paper,
    Stack,
    Typography
} from "@mui/material";
import { useCountry, useCountryByCodes } from "../core/request";
import { useNavigate, useParams } from "react-router-dom";
import { DetailParams, NativeName } from "../core/types";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import CircularProgress from '@mui/material/CircularProgress';
import { StyledLink } from '../Components/styled';
import { Url } from "../core/constants";


interface BorderListProps {
    borders?: string[]
}

const BorderList: FC<BorderListProps> = ({borders}) => {
    const [bordersCountries, loading] = useCountryByCodes(borders)
    if (loading) return <CircularProgress color="inherit"/>
    return (
        <Grid container gap={1}>
            {bordersCountries?.map(border => (
                <StyledLink to={`/${Url.details}/${border.name.official.toLowerCase()}`} key={border.name.official}>
                    <Chip
                        label={border.name.common}

                        size={"small"}
                        clickable
                        sx={{
                            borderRadius: 1,
                            padding: "4px 6px"
                        }}
                    />
                </StyledLink>
            ))}
        </Grid>
    )
}


interface ListItemProps {
    label: string,
    value?: string | number
}

const ListItem: FC<ListItemProps> = ({value, label}) => (
    <Box sx={{maxWidth: 200}}>
        <Typography variant={"subtitle2"} display={"inline"}>
            {label}:
        </Typography>
        <Typography variant={"body1"} display={"inline"}>
            &nbsp; {value}
        </Typography>
    </Box>
)

const Details = () => {
    const params = useParams<DetailParams>()
    const [country, loading] = useCountry(params.name as string)
    const navigate = useNavigate()


    const nativeNameList = country
        ? Object.values(country.name.nativeName) as NativeName[]
        : undefined
    const nativeName = nativeNameList?.length
        ? nativeNameList[0].official
        : country?.name.common
    const capitals = country
        ? Object.values(country.capital).join(", ")
        : undefined
    const currents = country
        ? Object.values(country.currencies).map(currency => currency.name).join(", ")
        : undefined
    const languages = country
        ? Object.values(country.languages).join(", ")
        : undefined
    const borders = country
        ? Object.values(country.borders)
        : undefined
    return (
        <Container>
            <Grid
                container
                mt={10}
                direction={"column"}
                alignItems={{xs: "center", md: "initial"}}
            >
                {loading
                    ? <CircularProgress color="inherit"/>
                    : <Card
                        variant={"outlined"}
                        sx={{
                            mt: 4,
                            backgroundColor: "background.default",
                            wrap: "wrap",
                            alignItems: {xs: "flex-start", md: "center"},
                            border: "none",
                            gap: {xs: 0, md: 6,},
                            maxWidth: {sm: 550, md: "100%"},
                        }}
                    >
                        <Button
                            onClick={() => navigate(-1)}
                            variant={"outlined"}
                            startIcon={<KeyboardBackspaceIcon/>}
                        >
                            Back
                        </Button>
                        <Grid
                            container
                            mt={4}
                            flexWrap={{xs: "wrap", md: "nowrap"}}
                            alignItems={"center"}
                            gap={7}
                        >
                            <Paper elevation={4} sx={{height: "fit-content"}}>
                                <CardMedia
                                    sx={{
                                        maxWidth: 500,
                                        maxHeight: 310,
                                        width: "100%",
                                        flexShrink: 3,
                                    }}
                                    component={"img"}
                                    image={country?.flags.svg}
                                    alt={country?.name.common}
                                />
                            </Paper>
                            <CardContent sx={{gap: 6, maxWidth: 490, flexShrink: 3}}>
                                <Grid
                                    container
                                    maxWidth={{sm: 400, md: 550}}
                                    direction={"column"}
                                    gap={3}
                                >
                                    <Typography variant={"h4"}>
                                        {country?.name.official}
                                    </Typography>
                                    <Grid
                                        container
                                        justifyContent={"space-between"}
                                        gap={1}
                                    >
                                        <Stack>
                                            <ListItem label={"Native name"} value={nativeName}/>
                                            <ListItem label={"Population"} value={country?.population}/>
                                            <ListItem label={"Region"} value={country?.region}/>
                                            <ListItem label={"Sub Region"} value={country?.subregion}/>
                                            <ListItem label={`Capital`} value={capitals}/>
                                        </Stack>
                                        <Stack>
                                            <ListItem label={"Top Level Domain"} value={country?.tld[0]}/>
                                            <ListItem label={"Currencies"} value={currents}/>
                                            <ListItem label={"Languages"} value={languages}/>
                                        </Stack>
                                    </Grid>
                                    <Grid container wrap={"nowrap"} gap={1} alignItems={"center"}>
                                        <Typography
                                            flexShrink={0}
                                            display={"inline"}
                                            noWrap
                                            variant={"subtitle2"}
                                        >
                                            Border Countries: {!country?.borders.length ? "none" : null}
                                        </Typography>
                                        {country?.borders.length ? <BorderList borders={borders}/> : null}
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Grid>
                    </Card>
                }
            </Grid>
        </Container>
    );
};

export default Details;