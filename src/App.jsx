import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import AIBox from "./components/AIBox";
import { useState } from "react";
import { motion } from "framer-motion";
import HourlyForecast from "./components/HourlyForecast";
import WeatherAnimation from "./components/WeatherAnimation";
import CityHistory from "./components/CityHistory";
import AQI from "./components/AQI";
import {
  getWeather,
  getForecast,
  getWeatherByLocation,
  getAirQuality
} from "./api";
import DecisionPanel from "./components/DecisionPanel";
import { getWeatherAdvice } from "./ai";
import BackgroundEffects from "./components/BackgroundEffects";
import CompareCities from "./components/CompareCities";
import LoadingCard from "./components/LoadingCard";
import SkyScore from "./components/SkyScore";


function getWeatherTheme(condition, isNight){

if(isNight){
    return "from-slate-900 via-blue-950 to-black";
}


if(condition === "Clear"){
    return "from-orange-500 via-amber-500 to-sky-600";
}


if(condition === "Clouds"){
    return "from-gray-500 via-slate-400 to-gray-700";
}


if(condition === "Rain"){
    return "from-blue-900 via-blue-700 to-blue-400";
}


if(condition === "Snow"){
    return "from-cyan-200 via-blue-200 to-white";
}


if(condition === "Thunderstorm"){
    return "from-gray-950 via-purple-900 to-indigo-900";
}


return "from-blue-500 to-purple-600";

}

function isNightTime(weather){

const current =
new Date().getTime()/1000;


return current < weather.sys.sunrise ||
current > weather.sys.sunset;

}



function App(){


const [city,setCity] = useState("");

const [weather,setWeather] = useState(null);

const [forecast,setForecast] = useState(null);

const [advice,setAdvice] = useState("");

const [aiLoading,setAiLoading] = useState(false);

const [airQuality,setAirQuality] = useState(null);

const [compareCity,setCompareCity] = useState(null);

const [compareInput,setCompareInput]=useState("");


const [error,setError] = useState("");

const [loading,setLoading] = useState(false);

const [history,setHistory] = useState(()=>{



const saved =
localStorage.getItem("weatherHistory");

return saved
?
JSON.parse(saved)
:
[];

});

function addToHistory(city){


let updated = [

city,

...history.filter(
(item)=>item!==city
)

];


updated = updated.slice(0,5);


setHistory(updated);


localStorage.setItem(
"weatherHistory",
JSON.stringify(updated)
);


}


async function searchWeather(searchCity){

try{


setLoading(true);
setError("");
setWeather(null);


const searchedCity = searchCity || city;


if(!searchedCity.trim()){

setError("Please enter a city name.");

return;

}



const data = await getWeather(searchedCity);


setWeather(data);


addToHistory(data.name);



const forecastData = await getForecast(searchedCity);

setForecast(forecastData);



const aqiData = await getAirQuality(
data.coord.lat,
data.coord.lon
);


setAirQuality(aqiData);



try{

setAiLoading(true);

const aiResponse =
await getWeatherAdvice(data);


setAdvice(aiResponse);


}

catch(aiError){


setAdvice({

summary:"AI service unavailable",

clothing:"Try again later",

activity:"Use current weather data",

health:"Stay safe",

alert:"No AI analysis available"

});


}

finally{

setAiLoading(false);

}



}

catch(error){



setWeather(null);

setForecast(null);

setAdvice("");

setAirQuality(null);


setError(
"City not found. Please enter a valid city."
);


}

finally{

setLoading(false);

}

}

async function compareCitySearch(){


if(!compareInput)
return;


const data =
await getWeather(compareInput);


setCompareCity(data);


addToHistory(data.name);


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

const aqiData = await getAirQuality(
data.coord.lat,
data.coord.lon
);

setAirQuality(aqiData);



addToHistory(data.name);

const forecastData = await getForecast(data.name);

setForecast(forecastData);



try{


const aiResponse = await getWeatherAdvice(data);

setAdvice(aiResponse);


}

catch(aiError){



setAdvice(
"AI assistant is currently unavailable."
);


}



}

catch(error){



setError(
"Unable to fetch your location weather."
);


}

finally{

setLoading(false);

}


},


(error)=>{




setError(
"Location permission denied."
);


}


);


}




return (


<div

className={`

relative

min-h-screen

flex

flex-col

items-center

justify-start

bg-gradient-to-br

${weather 
?
getWeatherTheme(
weather.weather[0].main,
isNightTime(weather)
)
:
"from-blue-400 to-purple-500"}

p-5

transition-all

duration-700

`}


>

{
weather &&

<BackgroundEffects
condition={weather.weather[0].main}
/>

}

{
weather &&

<WeatherAnimation

condition={
weather.weather[0].main
}

/>

}

<div className="relative z-10">

{
weather &&

<motion.div

animate={{
y:[0,-20,0],
opacity:[0.4,0.8,0.4]
}}

transition={{
duration:4,
repeat:Infinity
}}

className="
absolute
top-20
right-20
text-8xl
"

>

{
weather.weather[0].main==="Rain"
?
"🌧️"
:
weather.weather[0].main==="Clouds"
?
"☁️"
:
"☀️"
}

</motion.div>

}


<motion.h1

initial={{
opacity:0,
y:-30
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:0.7
}}

className="
text-4xl
md:text-6xl
font-extrabold
text-white
mb-10
drop-shadow-xl
"

>

🌤 SkySense AI 

</motion.h1>



<div className="flex flex-col items-center mb-10">


<div className="
flex
flex-col
items-center
gap-4
w-full
">


{/* Search Inputs */}

<div className="
flex
flex-col
lg:flex-row
gap-3
w-full
justify-center
items-center
">


<input

value={city}

onChange={(e)=>setCity(e.target.value)}

onKeyDown={(e)=>{

if(e.key==="Enter"){
searchWeather();
}

}}

className="
px-5
py-4
rounded-2xl
bg-white/90
text-gray-900
w-full
md:w-[350px]
shadow-xl
"

placeholder="Search city..."

 />




<input

value={compareInput}

onChange={(e)=>setCompareInput(e.target.value)}

onKeyDown={(e)=>{

if(e.key==="Enter"){
compareCitySearch();
}

}}

placeholder="Compare with city..."

className="
px-5
py-4
rounded-2xl
bg-white/90
text-gray-900
w-full
md:w-[300px]
shadow-xl
"

/>


</div>



{/* Recent Compare Cities */}




{/* Action Buttons */}

<div className="
flex
gap-3
flex-wrap
justify-center
">


<button

onClick={searchWeather}

className="
px-6
py-4
rounded-2xl
bg-white
text-gray-900
font-bold
shadow-xl
hover:scale-105
transition
"

>

Search

</button>



<button

onClick={compareCitySearch}

className="
px-6
py-4
rounded-2xl
bg-white
text-gray-900
font-bold
shadow-xl
hover:scale-105
transition
"

>

Compare

</button>



<button

onClick={getLocationWeather}

className="
px-6
py-4
rounded-2xl
bg-white/30
text-white
font-bold
shadow-xl
hover:scale-105
transition
"

>

📍 My Location

</button>


</div>


</div>

<CityHistory

cities={history}

onSelect={(selectedCity)=>{

setCity(selectedCity);

searchWeather(selectedCity);

}}


onCompare={(selectedCity)=>{

setCompareInput(selectedCity);

compareCitySearch();

}}

/>


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




<motion.div

initial={{
opacity:0,
y:40
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:0.6
}}

className="
w-full
max-w-7xl
grid
grid-cols-1
md:grid-cols-2
lg:grid-cols-12
gap-6
items-start
mt-8
"

>

{/* LEFT COLUMN */}

<div className="
lg:col-span-3
space-y-6
">


{
airQuality &&

<AQI airQuality={airQuality}/>

}

{

weather &&

<SkyScore

weather={weather}

airQuality={airQuality}

/>

}


{
weather &&

<DecisionPanel weather={weather}/>

}


</div>




{/* WEATHER CARD */}

<div className="
lg:col-span-4
">


{

loading ?

<LoadingCard text="Fetching weather data..."/>


:

weather &&

<WeatherCard weather={weather}/>


}


</div>


{/* AI */}

<div className="
lg:col-span-5
">


{
advice &&

<AIBox

advice={advice}

loading={aiLoading}

/>

}


</div>



</motion.div>

{

weather &&
compareCity &&

<CompareCities

city1={weather}

city2={compareCity}

/>

}

{

forecast &&


<div className="
w-full
max-w-7xl
"> 
<motion.div



initial={{
opacity:0,
y:30
}}

animate={{
opacity:1,
y:0
}}

transition={{
delay:0.3
}}

>

<HourlyForecast forecast={forecast}/>

</motion.div>

</div>

}

{

forecast &&

<div className="
w-full
max-w-7xl
">
<motion.div

initial={{
opacity:0,
y:30
}}

animate={{
opacity:1,
y:0
}}

transition={{
delay:0.3
}}

>

<Forecast forecast={forecast}/>

</motion.div>
</div>
}


</div>

</div>

);


}




export default App;