import { Country } from "./country.interface";
import { Region } from "./region-.type";

export interface CacheStore {
    byCapital: TermCounties;
    byCountry: TermCounties;
    byRegion: RegionCountries;
}

export interface TermCounties {
    term: string;
    countries: Country[];
}

export interface RegionCountries {
    term: Region;
    countries: Region[];
}