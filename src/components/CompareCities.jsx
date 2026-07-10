import { motion } from "framer-motion";


function CompareCities({city1, city2}){


if(!city1 || !city2)
return null;



function getComfort(weather){

let score=10;


if(weather.main.temp>35)
score-=3;


if(weather.main.humidity>80)
score-=2;


return score;

}



const comfort1 =
getComfort(city1);


const comfort2 =
getComfort(city2);



return(

<motion.div

initial={{
opacity:0,
y:30
}}

animate={{
opacity:1,
y:0
}}

className="
mt-8
bg-white/25
backdrop-blur-xl
border
border-white/30
rounded-3xl
p-6
text-white
shadow-xl
w-full
max-w-5xl
"


>


<h2 className="
text-3xl
font-bold
mb-6
">

⚖️ City Comparison

</h2>



<div className="
grid
grid-cols-2
gap-5
">


<div className="
bg-white/10
rounded-2xl
p-5
text-center
">


<h3 className="
text-2xl
font-bold
">

{city1.name}

</h3>


<p className="
text-5xl
font-bold
mt-4
">

{Math.round(city1.main.temp)}°C

</p>



<p className="mt-3">

💧 {city1.main.humidity}%

</p>


<p>

🧠 Comfort {comfort1}/10

</p>


</div>





<div className="
bg-white/10
rounded-2xl
p-5
text-center
">


<h3 className="
text-2xl
font-bold
">

{city2.name}

</h3>


<p className="
text-5xl
font-bold
mt-4
">

{Math.round(city2.main.temp)}°C

</p>



<p className="mt-3">

💧 {city2.main.humidity}%

</p>


<p>

🧠 Comfort {comfort2}/10

</p>


</div>



</div>




<div className="
mt-6
text-center
text-xl
font-bold
">

🏆 Better Conditions:

{" "}

{

comfort1 > comfort2

?

city1.name

:

city2.name

}

</div>



</motion.div>

)

}


export default CompareCities;