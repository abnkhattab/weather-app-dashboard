import { useEffect, useState } from "react";
import type { CityData } from "../types/CityData"
import type { WeatherDataAPiResponse } from "../types/WeatherData";

const WeatherCard  = ({city}:{city:CityData}) => {
    const getWeatherDetails = (weathercode: number) => {
    switch (weathercode) {
            case 0:
                return { text: 'Clear Sky', icon: '☀️' };
            case 1:
                return { text: 'Mainly Clear', icon: '🌤️' };
            case 2:
                return { text: 'Partly Cloudy', icon: '⛅' };
            case 3:
                return { text: 'Cloudy', icon: '☁️' };
            case 4:
            case 45:
            case 48:
                return { text: 'Foggy', icon: '🌫️' };
            case 51:
            case 53:
            case 55:
                return { text: 'Drizzle', icon: '🌦️' };
            case 61:
                return { text: 'Light Rain', icon: '🌧️' };
            case 63:
                return { text: 'Moderate Rain', icon: '🌧️' };
            case 65:
                return { text: 'Heavy Rain', icon: '🌧️' };
            case 71:
            case 73:
            case 75:
                return { text: 'Snow fall', icon: '❄️' };
            case 95:
            case 96:
            case 99:
                return { text: 'Thunderstorm', icon: '🌩️' };
            default:
                return { text: 'Unknown Weather', icon: '🌡️' };
        }
    };
    const [weather, setWeather] = useState<WeatherDataAPiResponse | null>(null);
    const weatherInfo = getWeatherDetails(Number(weather?.current_weather?.weathercode ?? 0));
    const fetchWeather = async ()=> {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true`)
        const data:WeatherDataAPiResponse =await response.json();
        setWeather(data);
    }

    useEffect(()=> {
        fetchWeather();
    } , [city]);
    return (
    <div className="flex flex-col gap-4 p-5 rounded-2xl bg-gradient-to-r from-sky-400/10 via-blue-500/5 to-indigo-500/10 backdrop-blur-md border border-white/30 shadow-sm hover:bg-white/20 transition-all duration-300">
        
        {/* قسم اسم المدينة والبلد */}
        <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                {city.name}
                <span className="text-base sm:text-lg text-gray-600 font-medium ml-2">
                    , {city.country}
                </span>
            </h1>
        </div>

        {/* قسم درجة الحرارة وحالة الطقس */}
        <div className="flex items-center justify-between mt-2">
            {/* الحرارة */}
            <p className="text-4xl sm:text-5xl font-extrabold text-gray-800">
                {weather?.current_weather.temperature}
                <span className="text-2xl sm:text-3xl text-gray-500 ml-1 font-medium">
                    {weather?.current_weather_units.temperature}
                </span>
            </p>
            
            {/* أيقونة الطقس والنص */}
            <div className="flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/40 shadow-sm">
                <span className="text-3xl drop-shadow-sm">{weatherInfo.icon}</span> 
                <span className="font-bold text-gray-700 text-xs mt-1 tracking-wide uppercase">
                    {weatherInfo.text}
                </span>
            </div>
        </div>

        {/* قسم سرعة الرياح */}
        <div className="flex flex-wrap items-center mt-2">
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm shadow-sm rounded-xl px-3 py-2 text-sm text-gray-700 font-medium border border-white/40">
                <span className="text-lg">💨</span>
                <span className="text-gray-500">Wind Speed:</span> 
                <span>
                    {weather?.current_weather.windspeed} {weather?.current_weather_units.windspeed}
                </span>
            </div>
        </div>
        
    </div>
);
}

export default WeatherCard
