import {
WiDaySunny,
WiCloudy,
WiRain
} from "react-icons/wi";

function getForecastIcon(condition){


if(condition.includes("Clear"))
return <WiDaySunny/>;


if(condition.includes("Cloud"))
return <WiCloudy/>;


if(condition.includes("Rain"))
return <WiRain/>;


return <WiCloudy/>;


}

function Forecast({forecast}){


return(

<div className="
mt-8
w-full
max-w-4xl
">


<h2 className="
text-3xl
font-bold
text-white
mb-5
">

5 Day Forecast

</h2>


<div className="
grid
grid-cols-2
md:grid-cols-5
gap-4
">


{
forecast.list
.filter((item,index)=>index%8===0)
.map((item)=>(
    

<div

key={item.dt}

className="
bg-white/20
backdrop-blur-lg
rounded-2xl
p-5
text-white
text-center
"

>


<p>

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


<h2 className="text-3xl">

{
Math.round(item.main.temp)
}°C

</h2>


<div className="capitalize">

{
item.weather[0].description
}

<div className="text-5xl">

{
getForecastIcon(
item.weather[0].main
)
}

</div>

</div>



</div>


))


}


</div>


</div>

)

}


export default Forecast;