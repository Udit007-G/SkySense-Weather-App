import axios from "axios"


const API_KEY =
import.meta.env.VITE_WEATHER_API_KEY;


export async function getWeather(city){

const response=
await axios.get(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
)

return response.data

}

export async function getForecast(city){

const response = await axios.get(
`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
);

return response.data;

}

export async function getWeatherByLocation(lat,lon){

const response = await axios.get(
`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
);


return response.data;

}