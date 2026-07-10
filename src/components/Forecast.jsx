import {
WiDaySunny,
WiCloudy,
WiRain,
WiThunderstorm,
WiSnow
} from "react-icons/wi";


function getForecastIcon(condition){

if(condition.includes("Clear"))
return <WiDaySunny/>;


if(condition.includes("Cloud"))
return <WiCloudy/>;


if(condition.includes("Rain"))
return <WiRain/>;


if(condition.includes("Thunder"))
return <WiThunderstorm/>;


if(condition.includes("Snow"))
return <WiSnow/>;


return <WiCloudy/>;

}



function Forecast({forecast}){


const dailyForecast = forecast.list.filter(
(item,index)=>index%8===0
);



return(

<div className="
mt-10
w-full
max-w-5xl
">


<h2 className="
text-3xl
font-bold
text-white
mb-6
">

5 Day Forecast

</h2>



<div className="
grid
grid-cols-2
md:grid-cols-5
gap-5
">


{

dailyForecast.map((item)=>(


<div

key={item.dt}

className="

bg-white/20

backdrop-blur-xl

border

border-white/30

rounded-3xl

p-5

text-white

text-center

shadow-xl

hover:scale-105

transition

"

>



<p className="
font-semibold
text-lg
">

{
new Date(item.dt_txt)
.toLocaleDateString(
"en-US",
{
weekday:"short"
}
)
}

</p>




<div className="
text-6xl
flex
justify-center
my-3
">

{

getForecastIcon(
item.weather[0].main
)

}

</div>




<h2 className="
text-4xl
font-bold
">

{
Math.round(item.main.temp)
}°C

</h2>



<p className="
capitalize
opacity-90
mt-2
">

{
item.weather[0].description
}

</p>



<div className="
mt-4
space-y-2
text-sm
opacity-90
">


<p>

🌡 Feels:
{
Math.round(item.main.feels_like)
}°C

</p>


<p>

💧 Humidity:
{
item.main.humidity
}%

</p>


<p>

💨 Wind:
{
Math.round(item.wind.speed*3.6)
} km/h

</p>


</div>


</div>


))


}


</div>



</div>

);


}


export default Forecast;