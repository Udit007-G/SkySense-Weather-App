import { motion } from "framer-motion";


function WeatherAnimation({condition}){


if(condition === "Rain"){

return (

<div className="
absolute
inset-0
overflow-hidden
pointer-events-none
">

{

Array.from({length:40}).map((_,i)=>(

<motion.div

key={i}

initial={{
y:-100,
x:Math.random()*window.innerWidth
}}

animate={{
y:window.innerHeight+200
}}

transition={{

duration:
1+Math.random()*1.5,

repeat:Infinity,

delay:
Math.random()*2,

ease:"linear"

}}

className="
absolute
w-[2px]
h-20
bg-white/40
"

style={{

left:`${Math.random()*100}%`

}}

>


</motion.div>


))

}


</div>

)

}



if(condition === "Clouds"){

return(

<div className="
absolute
inset-0
overflow-hidden
pointer-events-none
">


<motion.div

animate={{

x:[-200,window.innerWidth+200]

}}

transition={{

duration:25,

repeat:Infinity,

ease:"linear"

}}

className="
absolute
top-20
text-8xl
drop-shadow-2xl
opacity-30
"

>

☁️

</motion.div>



<motion.div

animate={{

x:[window.innerWidth,-200]

}}

transition={{

duration:35,

repeat:Infinity,

ease:"linear"

}}

className="
absolute
top-60
text-7xl
opacity-20
"

>

☁️

</motion.div>


</div>

)

}




if(condition === "Clear"){

return(

<div className="
absolute
top-10
right-10
pointer-events-none
">


<motion.div

animate={{

scale:[1,1.2,1],

rotate:360

}}

transition={{

duration:8,

repeat:Infinity

}}

className="
text-9xl
opacity-40
"

>

☀️

</motion.div>


</div>

)

}



if(condition==="Thunderstorm"){

return(

<div className="
absolute
inset-0
pointer-events-none
">

<motion.div

animate={{

opacity:[0,1,0]

}}

transition={{

duration:0.3,

repeat:Infinity,

repeatDelay:3

}}

className="
absolute
text-9xl
top-20
right-20
"

>

⚡

</motion.div>


</div>

)

}



return null;


}


export default WeatherAnimation;