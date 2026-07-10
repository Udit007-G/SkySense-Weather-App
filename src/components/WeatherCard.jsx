import { motion } from "framer-motion";
import DecisionPanel from "./DecisionPanel";

import {
WiDaySunny,
WiCloudy,
WiRain,
WiSnow,
WiThunderstorm,
WiFog,
WiHumidity,
WiStrongWind,
WiBarometer,
WiRaindrop
} from "react-icons/wi";



function getWeatherIcon(condition){

switch(condition){

case "Clear":
return <WiDaySunny />;

case "Clouds":
return <WiCloudy />;

case "Rain":
case "Drizzle":
return <WiRain />;

case "Snow":
return <WiSnow />;

case "Thunderstorm":
return <WiThunderstorm />;

case "Mist":
case "Fog":
case "Haze":
return <WiFog />;

default:
return <WiCloudy />;

}

}



function convertWind(speed){

return Math.round(speed * 3.6);

}



function getPrecipitation(weather){

if(weather.rain){

return `${weather.rain["1h"] || 0} mm`;

}

if(weather.snow){

return `${weather.snow["1h"] || 0} mm`;

}

return "No rain";

}



function formatTime(timestamp){

const date = new Date(timestamp * 1000);

return date.toLocaleTimeString([],{

hour:"2-digit",
minute:"2-digit"

});

}




function getComfort(temp,humidity){

let score=10;


if(temp>35 || temp<10)
score-=3;


if(humidity>80)
score-=2;


if(humidity>90)
score-=1;


return score;

}



function getActivity(score){

if(score>=8)
return "Excellent for outdoor activities";

if(score>=5)
return "Good, but stay hydrated";

return "Avoid long outdoor exposure";

}





function DetailCard({icon,title,value}){


return(

<div

className="
bg-white/25
backdrop-blur-md
rounded-2xl
p-4
w-32
h-28
flex
flex-col
items-center
justify-center
shadow-lg
"

>

<div className="text-3xl mb-2">

{icon}

</div>


<p className="text-sm opacity-80">

{title}

</p>


<p className="font-bold">

{value}

</p>


</div>

);

}





function WeatherCard({weather}){


const condition = weather.weather[0].main;


const temp = Math.round(weather.main.temp);

const comfort = getComfort(
temp,
weather.main.humidity
);



return(

<motion.div


initial={{
opacity:0,
y:50
}}


animate={{
opacity:1,
y:0
}}


transition={{
duration:0.5
}}


className="

bg-white/25

backdrop-blur-xl

border

border-white/40

rounded-3xl

p-8

w-full
max-w-md

text-white

shadow-xl

"

>



<h2 className="
text-3xl
font-bold
text-center
">

{weather.name}

</h2>





<motion.div

animate={{

y:[0,-10,0]

}}

transition={{

duration:2,

repeat:Infinity

}}

className="
text-[90px]
flex
justify-center
my-4
"

>

{getWeatherIcon(condition)}

</motion.div>





<h1 className="
text-5xl
font-bold
text-center
">

{temp}°C

</h1>




<p className="
text-center
mt-3
">

Feels like {Math.round(weather.main.feels_like)}°C

</p>




<p className="
text-center
capitalize
">

{weather.weather[0].description}

</p>




<div className="
flex
justify-between
items-center
bg-white/10
rounded-2xl
p-4
mt-5
">


<div>

<p className="text-sm opacity-70">
Humidity
</p>

<p className="font-bold text-xl">
{weather.main.humidity}%
</p>

</div>



<div>

<p className="text-sm opacity-70">
Wind
</p>

<p className="font-bold text-xl">
{weather.wind.speed} km/h
</p>

</div>



<div>

<p className="text-sm opacity-70">
Pressure
</p>

<p className="font-bold text-xl">
{weather.main.pressure}
</p>

</div>


</div>





<div className="

mt-8

bg-white/10

rounded-2xl

p-3

text-center

">


<h3 className="
text-lg
font-bold
">

🧠 Weather Intelligence

</h3>



<p className="mt-3">

Comfort Score:
<span className="font-bold">

{" "}
{comfort}/10

</span>

</p>



<p className="mt-2">

🏃 {getActivity(comfort)}

</p>


</div>





<div

className="
flex
justify-between
mt-8
text-center
"

>


<div>

<p>

🌅 Sunrise

</p>

<p className="font-bold">

{formatTime(weather.sys.sunrise)}

</p>

</div>



<div>

<p>

🌇 Sunset

</p>


<p className="font-bold">

{formatTime(weather.sys.sunset)}

</p>


</div>



</div>




</motion.div>

);


}


export default WeatherCard;