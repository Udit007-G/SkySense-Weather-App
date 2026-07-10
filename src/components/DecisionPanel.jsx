import {
WiUmbrella,
WiDaySunny,
WiRaindrop,
WiThermometer,
WiStrongWind
} from "react-icons/wi";

import { FaCar } from "react-icons/fa";

function getComfort(temp, humidity){

let score = 10;


if(temp > 35 || temp < 10)
score -= 3;


if(humidity > 75)
score -= 2;


if(humidity > 90)
score -= 1;


return Math.max(score,1);

}

function getWeatherStatus(score){

if(score >= 8)
return {
text:"Excellent Conditions",
emoji:"🟢"
};

if(score >= 5)
return {
text:"Moderate Conditions",
emoji:"🟡"
};

return {
text:"Difficult Conditions",
emoji:"🔴"
};

}



function DecisionPanel({weather}){


if(!weather){
    return null;
}


const temp = weather.main.temp;

const humidity = weather.main.humidity;

const rain =
weather.rain ? true : false;


const comfort =
getComfort(temp,humidity);

const status =
getWeatherStatus(comfort);

return (

<div

className="
mt-6
bg-white/10
rounded-3xl
p-6
text-white
"

>


<div className="
flex
justify-between
items-center
mb-5
">


<h2 className="
text-2xl
font-bold
">

🧠 Today's Decision

</h2>


<div className="
bg-white/25
px-4
py-2
rounded-full
font-bold
">

{status.emoji}

{" "}

{status.text}

</div>


</div>



<div className="
grid
md:grid-cols-2
gap-4
">


<div className="
bg-white/10
rounded-2xl
p-4
flex
items-center
gap-3
">


<WiThermometer
className="text-4xl"
/>

<FaCar className="text-4xl" />

<div>

<p>
Comfort
</p>

<h3 className="font-bold">

{comfort}/10

</h3>

</div>


</div>





<div className="
bg-white/10
rounded-2xl
p-4
flex
items-center
gap-3
">


<WiDaySunny
className="text-4xl"
/>


<div>

<p>
Outdoor Activity
</p>

<h3 className="font-bold">

{

comfort >= 7

?

"Excellent"

:

"Limited"

}

</h3>

</div>


</div>





<div className="
bg-white/10
rounded-2xl
p-4
flex
items-center
gap-3
">


<WiStrongWind
className="text-4xl"
/>


<div>

<p>
Travel
</p>

<h3 className="font-bold">

{

rain

?

"Drive Carefully"

:

"Safe"

}

</h3>

</div>


</div>





<div className="
bg-white/10
rounded-2xl
p-4
flex
items-center
gap-3
">


<WiUmbrella
className="text-4xl"
/>


<div>

<p>
Umbrella
</p>

<h3 className="font-bold">

{

rain

?

"Carry One"

:

"Not Needed"

}

</h3>

</div>


</div>




</div>



<div className="
mt-5
bg-white/10
rounded-xl
p-4
flex
items-center
gap-3
">


<WiRaindrop
className="text-4xl"
/>


<div>

<p>
Clothing
</p>


<h3 className="font-bold">

{

temp > 30

?

"Light cotton clothes"

:

"Comfortable layers"

}

</h3>


</div>


</div>



</div>


)

}


export default DecisionPanel;