import { motion } from "framer-motion";

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




function DetailCard({icon,title,value}){

return(

<div

className="
bg-white/20
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

bg-white/20

backdrop-blur-xl

border

border-white/30

rounded-3xl

p-8

w-96

text-white

shadow-xl

"

>



<h2

className="
text-3xl
font-bold
text-center
"

>

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
text-[110px]
flex
justify-center
my-4
"

>

{
getWeatherIcon(condition)
}

</motion.div>





<h1

className="
text-6xl
font-bold
text-center
"

>

{Math.round(weather.main.temp)}°C

</h1>





<p className="text-center mt-3">

Feels like {Math.round(weather.main.feels_like)}°C

</p>




<p className="text-center capitalize">

{weather.weather[0].description}

</p>






<div

className="
grid
grid-cols-2
gap-4
mt-8
"

>



<DetailCard

icon={<WiHumidity/>}

title="Humidity"

value={`${weather.main.humidity}%`}

/>




<DetailCard

icon={<WiStrongWind/>}

title="Wind"

value={`${convertWind(weather.wind.speed)} km/h`}

/>




<DetailCard

icon={<WiBarometer/>}

title="Pressure"

value={`${weather.main.pressure} hPa`}

/>




<DetailCard

icon={<WiRaindrop/>}

title="Rain"

value={getPrecipitation(weather)}

/>




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