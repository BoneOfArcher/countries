import React, { FC, useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Country } from "../core/types";
import {
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import CountryCard from "../Components/CountryCard";
import { useAllCountries } from "../core/request";
import InfiniteScroll from "react-infinite-scroll-component";

const regionOptions = ['Oceania', 'Americas', 'Antarctic', 'Africa', 'Europe', 'Asia']

interface HomeProps {
    countiesList?: Country[]
    setCountiesList: React.Dispatch<React.SetStateAction<Country[] | undefined>>
}

const Home: FC<HomeProps> = (props) => {
    const {
        countiesList,
        setCountiesList
    } = props
    const [countries, setCountries] = useState(countiesList)
    const [visibleCountries, setVisibleCountries] = useState<Country[]>([])
    const [region, setRegion] = useState("")
    const [searchCountry, setSearchCountry] = useState("")
    const [data, loading] = useAllCountries(Boolean(countiesList))

    const setStartVisibleCountries = (data?: Country[]) => {
        setVisibleCountries(() => {
            const visibleCountries = [...data || []]
            visibleCountries.length = visibleCountries.length > 20
                ? 20
                : visibleCountries.length
            return visibleCountries
        })
    }
    useEffect(() => {
        if (countries) return
        if (!loading) {
            setCountries(data)
            setCountiesList(data)
            setStartVisibleCountries(data)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])
    useEffect(() => {
        if (!countiesList) return
        console.log(searchCountry)
        let newCountries = region || searchCountry
            ? countiesList?.filter(country => {
                return country.name.common.toLowerCase().includes(searchCountry.toLowerCase())
                    && (region
                        ? country.region.toLowerCase() === region.toLowerCase()
                        : true)
            })
            : [...countiesList]
        setCountries(newCountries)
        setStartVisibleCountries(newCountries)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [region, searchCountry])

    const setNextVisibleCountries = () => {
        const newCountries = countries?.slice(visibleCountries.length, visibleCountries.length + 20)
        const newVisibleCountries = visibleCountries.concat(newCountries || [])
        setVisibleCountries(newVisibleCountries)
    }

    const regionChangeHandler = (event: SelectChangeEvent) => {
        setRegion(event.target.value)
    }
    const searchChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setSearchCountry(event.target.value.toLowerCase())
    }
    return (
        <Container>
            <Box
                mt={5}
                component={"form"}
                display={"flex"}
                alignItems={{xs: "initial", sm: "center",}}
                gap={{xs: 3, sm: "initial",}}
                flexDirection={{xs: "column", sm: "row",}}
                justifyContent={{xs: "initial", sm: "space-between",}}
            >
                <TextField
                    value={searchCountry}
                    placeholder={"Search for a country"}
                    onChange={searchChangeHandler}
                    variant={"outlined"}
                />
                <FormControl variant="filled" sx={{m: 1, minWidth: 120, maxWidth: 150}}>
                    <InputLabel id={"region-label"}>Region</InputLabel>
                    <Select
                        labelId={"region-label"}
                        id={"region-select"}
                        value={region}
                        onChange={regionChangeHandler}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {regionOptions.map(region => <MenuItem value={region} key={region}>{region}</MenuItem>)}
                    </Select>
                </FormControl>
            </Box>
            <Box mt={5}>
                {loading
                    ? <CircularProgress color={"inherit"}/>
                    : <InfiniteScroll
                        next={setNextVisibleCountries}
                        hasMore={visibleCountries.length < (countries?.length || 0)}
                        loader={<CircularProgress color={"inherit"}/>}
                        dataLength={visibleCountries.length}
                        style={{padding: "6px"}}
                    >
                        <Grid
                            container
                            spacing={1}
                            columnSpacing={1}
                            rowSpacing={4}
                            direction={{xs: "column", sm: "row"}}
                            alignItems={{xs: "center", sm: "initial",}}
                        >
                            {visibleCountries?.map(country => (
                                <CountryCard key={country.name.official} {...country}/>
                            ))}
                        </Grid>
                    </InfiniteScroll>
                }

            </Box>
        </Container>
    );
};

export default Home;