import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import AIBox from "./components/AIBox";
import { useState } from "react";

import {
  getWeather,
  getForecast,
  getWeatherByLocation
} from "./api";

import { getWeatherAdvice } from "./ai";


function getWeatherTheme(condition){

    if(condition === "Clear"){
        return "from-orange-400 to-yellow-500";
    }

    if(condition === "Clouds"){
        return "from-gray-400 to-gray-700";
    }

    if(condition === "Rain"){
        return "from-blue-700 to-blue-400";
    }

    if(condition === "Snow"){
        return "from-blue-200 to-white";
    }

    if(condition === "Thunderstorm"){
        return "from-gray-900 to-purple-800";
    }

    return "from-blue-400 to-purple-500";

}



function App(){


const [city,setCity] = useState("");

const [weather,setWeather] = useState(null);

const [forecast,setForecast] = useState(null);

const [advice,setAdvice] = useState("");

const [error,setError] = useState("");

const [loading,setLoading] = useState(false);



async function searchWeather(){


try{


setLoading(true);

setError("");

setWeather(null);


const data = await getWeather(city);


setWeather(data);



const forecastData = await getForecast(city);

setForecast(forecastData);

if(!city.trim()){
    setError("Please enter a city name.");
    return;
}

try{

const aiResponse = await getWeatherAdvice(data);

setAdvice(aiResponse);

}

catch(aiError){

console.log("AI Error:",aiError);

setAdvice(
"AI assistant is currently unavailable."
);

}



}

catch(error){

console.log("Weather Error:",error);


setWeather(null);

setForecast(null);

setAdvice("");

setError(
"City not found. Please enter a valid city."
);


}

finally{

setLoading(false);

}


}




async function getLocationWeather(){


navigator.geolocation.getCurrentPosition(


async(position)=>{


try{


setLoading(true);

setError("");

setWeather(null);



const lat = position.coords.latitude;

const lon = position.coords.longitude;



const data = await getWeatherByLocation(lat,lon);



console.log(
"Location Weather:",
data
);



setWeather(data);



const forecastData = await getForecast(data.name);

setForecast(forecastData);



try{


const aiResponse = await getWeatherAdvice(data);

setAdvice(aiResponse);


}

catch(aiError){

console.log(
"AI Error:",
aiError
);


setAdvice(
"AI assistant is currently unavailable."
);


}



}

catch(error){

console.log(
"Location Weather Error:",
error
);


setError(
"Unable to fetch your location weather."
);


}

finally{

setLoading(false);

}


},


(error)=>{


console.log(
"Location Permission Error:",
error
);


setError(
"Location permission denied."
);


}


);


}




return (


<div

className={`

min-h-screen

flex

flex-col

items-center

justify-center

bg-gradient-to-br

${weather 
? getWeatherTheme(weather.weather[0].main) 
: "from-blue-400 to-purple-500"}

p-5

transition-all

duration-700

`}


>


<h1

className="

text-5xl

font-bold

text-white

mb-10

"

>

SkySense AI

</h1>



<div className="flex flex-col items-center mb-10">


<div className="flex gap-3">


<input

className="
px-5
py-3
rounded-xl
outline-none
text-lg
"

type = "text"

value={city}

onChange={(e)=>setCity(e.target.value)}

onKeyDown={(e)=>{

    if(e.key === "Enter"){
        searchWeather();
    }

}}

placeholder="Enter city"

/>



<button


className="

bg-black

text-white

px-6

py-3

rounded-xl

hover:scale-105

transition

"

type="button"

onClick={searchWeather}


>


{
loading 
? "Searching..."
: "Search"
}


</button>




<button


className="

bg-white/30

text-white

px-6

py-3

rounded-xl

hover:scale-105

transition

"


onClick={getLocationWeather}


>


📍 My Location


</button>



</div>




{
error &&

<p

className="

text-red-200

mt-4

font-semibold

"

>

{error}

</p>

}


</div>





<div

className="

flex

flex-col

lg:flex-row

gap-8

items-center

justify-center

w-full

"


>


{

weather &&

<WeatherCard weather={weather}/>


}




{

advice &&

<AIBox advice={advice}/>


}


</div>




{

forecast &&

<Forecast forecast={forecast}/>


}




</div>


);


}



export default App;