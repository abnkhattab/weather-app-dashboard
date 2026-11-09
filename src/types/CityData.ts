export type CityDataAPiResponse = {
    results: CityData[];
}

export type CityData = {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    elevation: number;
    feature_code: string;
    country_code:string;
    admin1_id: number;
    time_zone:string;
    population: number;
    country_id: number;
    country: string;
    admin1: string;
}