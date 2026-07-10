import {
WiDaySunny,
WiCloudy,
WiRain,
WiThunderstorm
} from "react-icons/wi";


function getIcon(condition){

if(condition.includes("Clear"))
return <WiDaySunny/>;

if(condition.includes("Cloud"))
return <WiCloudy/>;

if(condition.includes("Rain"))
return <WiRain/>;

if(condition.includes("Thunder"))
return <WiThunderstorm/>;

return <WiCloudy/>;

}



function HourlyForecast({forecast}){


const hourly =
forecast.list.slice(0,8);



return(

<div className="
mt-8
w-full
max-w-5xl
">


<h2 className="
text-3xl
font-bold
text-white
mb-5
">

Today's Timeline

</h2>



<div className="
flex
gap-4
overflow-x-auto
pb-4
">


{

hourly.map((item)=>(


<div

key={item.dt}

className="
min-w-[120px]
bg-white/20
backdrop-blur-xl
border
border-white/30
rounded-3xl
p-5
text-white
text-center
shadow-xl
"

>


<p className="font-bold">

{

new Date(item.dt_txt)
.toLocaleTimeString(
[],
{
hour:"2-digit"
}
)

}

</p>



<div className="
text-5xl
flex
justify-center
my-3
">

{
getIcon(
item.weather[0].main
)
}

</div>



<h3 className="
text-2xl
font-bold
">

{
Math.round(item.main.temp)
}°C

</h3>



<p className="text-sm">

Feels {Math.round(item.main.feels_like)}°

</p>



</div>


))

}


</div>


</div>

)

}


export default HourlyForecast;