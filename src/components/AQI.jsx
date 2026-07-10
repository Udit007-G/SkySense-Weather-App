import {
WiDust
} from "react-icons/wi";


function getAQIStatus(value){

if(value===1)
return "Good 🟢";

if(value===2)
return "Fair 🟡";

if(value===3)
return "Moderate 🟠";

if(value===4)
return "Poor 🔴";

return "Very Poor 🟣";

}



function AQI({airQuality}){


if(!airQuality)
return null;


const data =
airQuality.list[0];


const aqi =
data.main.aqi;


const pollution =
data.components;



return(

<div

className="
bg-white/25
backdrop-blur-xl
border
border-white/40
rounded-3xl
p-6
text-white
shadow-xl
w-full
max-w-md
"

>


<h2 className="
text-2xl
font-bold
mb-5
">

🌱 Air Quality

</h2>



<div className="
text-center
mb-5
">


<p className="
text-5xl
font-bold
">

{aqi}/5

</p>


<p className="
text-xl
mt-2
">

{getAQIStatus(aqi)}

</p>


</div>



<div className="
grid
grid-cols-2
gap-3
text-sm
">


<div>
PM2.5
<br/>
<b>
{pollution.pm2_5}
</b>
</div>


<div>
PM10
<br/>
<b>
{pollution.pm10}
</b>
</div>


<div>
CO
<br/>
<b>
{pollution.co}
</b>
</div>


<div>
NO₂
<br/>
<b>
{pollution.no2}
</b>
</div>


</div>



</div>

)

}


export default AQI;