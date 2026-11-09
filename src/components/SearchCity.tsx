import React, { useRef, useState } from "react"
import type { CityData, CityDataAPiResponse } from "../types/CityData"
type Props = {
    handleAddCity: (city:CityData) => void
}

const SearchCity = ({handleAddCity}: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [results,setResults] = useState<CityData[]>([])
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value

        if (newQuery.length < 3) {
            setResults ([]);
            return;
        }
        const fetchCities = async ()=> {
            const response = await fetch (`https://geocoding-api.open-meteo.com/v1/search?name=${newQuery}`)
            const data:CityDataAPiResponse = await response.json();
            setResults(data.results ?? [])
        }
        fetchCities()
    }

    const handleAddCityClick = (city:CityData)=> {
        handleAddCity(city);
        setResults([]);
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }

    
    return (
        <div>
            <div>
                <input
                    onChange={handleSearch}
                    type="search"
                    placeholder="🔍 Search for a city..."
                    className="w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-400/10 via-blue-500/5 to-indigo-500/10
                    backdrop-blur-md border border-white/30 text-gray-800 placeholder-gray-400 text-sm shadow-sm outline-none 
                    transition-all duration-200 focus:bg-white/80 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
                    ref={inputRef}
                />
                {results.length > 0 &&<div className="flex flex-col gap-2 border border-gray-200 p-2 rounded-md">
                    {results.map((result:CityData)=> (
                        <div onClick={()=> handleAddCityClick(result)} className="hover:bg-gray-100 cursor-pointer p-2 rounded-md select-none" 
                        key={result.id}>{result.name} , {result.country}</div>
                    ))}
                </div>}
            </div>
        </div>
    )
}

export default SearchCity
