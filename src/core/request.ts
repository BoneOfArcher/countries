import { Country, CountryDetails } from "./types";
import { Api } from "./constants";
import axios, { AxiosError } from "axios";
import { makeUseAxios, RefetchFunction } from "axios-hooks";


const useAxios = makeUseAxios({
    axios: axios.create({baseURL: Api.baseURL})
})


export const useAllCountries = (
    manual: boolean = false
): [(Country[] | undefined), boolean, (AxiosError<any, any> | null), RefetchFunction<any, Country[]>] => {
    const [{data, loading, error}, refetch] = useAxios<Country[]>({
            url: Api.allCountries,
            params: {
                fields: "name,capital,flags,region,population"
            }
        },
        {manual}
    )
    data?.sort((a, b) => a.name.common > b.name.common ? 1 : -1)

    return [data, loading, error, refetch]
}


export const useCountry = (
    country: string
): [CountryDetails | undefined, boolean, AxiosError<any, any> | null, RefetchFunction<any, CountryDetails[]>] => {
    const [{data, loading, error}, refetch] = useAxios<CountryDetails[]>({
            url: `${Api.singleCountry}/${country}`,
            params: {
                fields: "borders,name,population,region,subregion,capital,tld,currencies,languages,flags"
            }
        },
    )
    return [data ? data[0] : undefined, loading, error, refetch]
}

export const useCountryByCodes = (
    codes?: string[]
): [(Pick<CountryDetails, "name">[] | undefined), boolean, (AxiosError<any, any> | null), RefetchFunction<any, Pick<CountryDetails, "name">[]>] => {

    const [{data, loading, error}, refetch] = useAxios<Pick<CountryDetails, "name">[]>({
            url: `${Api.countriesNamesByCode}`,
            params: {
                codes: codes?.join(",").toLowerCase(),
                fields: "name"
            }
        },
    )
    return [data, loading, error, refetch]
}