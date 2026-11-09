import Header from "./components/Header"
import SearchCity from "./components/SearchCity"
import { useState } from "react"
import type { CityData } from "./types/CityData"
import WeatherCard from "./components/WeatherCard"

const App = () => {
  const [cities,setCities] = useState<CityData[]>([])
  const handleAddCity = (city:CityData) => {
    setCities(prev => [...prev , city])
  }
  return (
    <div className="flex flex-col gap-4 px-8 py-6">
      <Header/>
      <SearchCity handleAddCity ={handleAddCity}/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cities.map ((city) => (
          <WeatherCard key={city.id} city={city}/>
        ))}
      </div>
    </div>
  )
}

export default App
