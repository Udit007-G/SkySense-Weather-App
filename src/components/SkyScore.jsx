import { motion } from "framer-motion";


function SkyScore({weather, airQuality}){


if(!weather)
return null;


let score = 100;


const temp = weather.main.temp;
const humidity = weather.main.humidity;


if(temp > 35)
score -= 20;

else if(temp > 30)
score -= 10;


if(humidity > 80)
score -= 15;

else if(humidity > 60)
score -= 5;



if(airQuality){

const aqi =
airQuality.list[0].main.aqi;


score -= (aqi-1)*10;

}


let message;


if(score>=85)
message="Perfect conditions 🌟";

else if(score>=70)
message="Good conditions 👍";

else if(score>=50)
message="Moderate conditions ⚠️";

else
message="Poor conditions 🚨";



return(

<motion.div

initial={{
opacity:0,
scale:0.9
}}

animate={{
opacity:1,
scale:1
}}

className="
bg-white/25
backdrop-blur-xl
border
border-white/40
rounded-3xl
p-6
text-white
shadow-xl
text-center
"

>


<h2 className="
text-xl
font-bold
mb-3
">

🌤 SkySense Score

</h2>



<p className="
text-6xl
font-extrabold
">

{score}

</p>



<p className="
mt-3
text-lg
">

{message}

</p>



</motion.div>

)

}


export default SkyScore;