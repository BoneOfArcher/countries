import React, { FC } from 'react';
import { Card, CardContent, CardMedia, Grid, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Country } from "../core/types";
import { StyledLink } from './styled';
import { Url } from "../core/constants";

interface ListItemProps {
    label: string
    value: string | number
}

const ListItem: FC<ListItemProps> = ({label, value}) => (
    <Box>
        <Typography variant={"body2"} color={"text.secondary"} display={"inline"} lineHeight={0}>
            {label}:
        </Typography>
        <Typography variant={"body2"} color={"text.secondary"} display={"inline"}>
            &nbsp;{value}
        </Typography>
    </Box>
)

const CountryCard: FC<Country> = (props) => {
    const {
        name,
        flags,
        region,
        population,
        capital,
    } = props
    console.log('card')
    return (
        <Grid item lg={3} md={4} sm={6} xs={12}>
            <StyledLink to={`${Url.details}/${name.official}`}>
                <Card
                    sx={{
                        height: 305,
                        width: {
                            xs: 305,
                            sm: "100%",
                        },
                        maxWidth: {
                            xs: 300,
                            sm: 300,
                        },
                    }}
                    elevation={4}
                >
                    <CardMedia
                        component={"img"}
                        image={flags.svg}
                        alt={"image"}
                        width={"100%"}
                        sx={{
                            height: {
                                xs: 160,
                            },
                            objectFit: "cover",
                            objectPosition: "center center",
                        }}
                    />
                    <CardContent>
                        <Typography variant={"h5"}>
                            {name.common}
                        </Typography>
                        <Stack mt={1}>
                            <ListItem label={"Population"} value={population}/>
                            <ListItem label={"Region"} value={region}/>
                            <ListItem label={"Capital"} value={capital}/>
                        </Stack>
                    </CardContent>
                </Card>
            </StyledLink>
        </Grid>
    );
};

export default React.memo(CountryCard);