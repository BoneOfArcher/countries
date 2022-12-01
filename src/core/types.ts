import { Url } from "./constants";

export type Country = {
    name: {
        common: string
        nativeName: {
            [key: string]: {
                common: string
                official: string
            }
        }
        official: string
    }
    capital: string
    flags: {
        png: string
        svg: string
    }
    independent: boolean
    population: number
    region: string
}
export type DetailParams = { [Url.detailsName]: string }

type Currencies = {
    [key: string]: {
        name: string
        symbol: string
    }
}
type Languages = { [key: string]: string }
export type NativeName = {
    common: string
    official: string
}
export type CountryName = {
    common: string
    nativeName: {
        [key: string]: NativeName | {}
    }
    official: string
}
type Flags = {
    png: string
    svg: string
}
export type CountryDetails = {
    altSpellings: string[]
    borders: string[]
    capital: string[]
    currencies: Currencies
    languages: Languages
    name: CountryName
    population: number
    region: string
    subregion: string
    tld: string[]
    flags: Flags
}