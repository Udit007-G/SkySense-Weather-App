import { motion } from "framer-motion";
import {
FaBrain,
FaTshirt,
FaRunning,
FaHeartbeat,
FaExclamationTriangle
} from "react-icons/fa";


function getSectionIcon(title){

if(title === "Summary")
return (
<FaBrain className="text-purple-300"/>
);


if(title === "Clothing")
return (
<FaTshirt className="text-yellow-300"/>
);


if(title === "Activity")
return (
<FaRunning className="text-green-300"/>
);


if(title === "Health")
return (
<FaHeartbeat className="text-red-300"/>
);


if(title === "Alert")
return (
<FaExclamationTriangle className="text-orange-300"/>
);


return (
<FaBrain className="text-purple-300"/>
);

}



function AIBox({advice, loading}){


if(!advice)
return null;

if(loading){

return(

<div

className="
bg-white/25
backdrop-blur-xl
border
border-white/40
rounded-3xl
p-8
text-white
drop-shadow-lg
shadow-xl
w-full
"


>

<div className="
flex
items-center
gap-4
text-2xl
font-bold
">

🤖 SkySense AI

</div>


<p className="
mt-6
opacity-80
animate-pulse
">

Analyzing weather patterns...

</p>


<div className="
flex
gap-2
mt-4
">


<span className="
w-3
h-3
bg-white
rounded-full
animate-bounce
">
</span>


<span className="
w-3
h-3
bg-white
rounded-full
animate-bounce
delay-150
">
</span>


<span className="
w-3
h-3
bg-white
rounded-full
animate-bounce
delay-300
">
</span>


</div>


</div>

)

}


const sections = [

{
title:"Summary",
value:advice.summary
},

{
title:"Clothing",
value:advice.clothing
},

{
title:"Activity",
value:advice.activity
},

{
title:"Health",
value:advice.health
},

{
title:"Alert",
value:advice.alert
}

];



return(

<motion.div

initial={{
opacity:0,
x:30
}}

animate={{
opacity:1,
x:0
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
p-6
text-white
drop-shadow-lg
shadow-xl
w-full
"


>


<div className="
flex
items-center
gap-3
mb-6
">


<div className="
text-4xl
">

🤖

</div>


<div>

<h2 className="
text-3xl
font-bold
">

SkySense AI

</h2>


<p className="
text-sm
opacity-70
">

Personal weather intelligence

</p>


</div>


</div>





<div className="
space-y-4
">


{

sections.map((section,index)=>{


const title = section.title;

const content = section.value;



return(

<motion.div

key={index}

whileHover={{
scale:1.02
}}

className="
bg-white/10
rounded-2xl
p-4
border
border-white/20
"

>


<div className="
flex
items-center
gap-4
mb-3
text-xl
font-bold
">


<span className="
text-3xl
drop-shadow-lg
">

{getSectionIcon(title)}

</span>


{title}

</div>



<p className="
text-sm
leading-relaxed
opacity-90
">

{section.value}

</p>



</motion.div>


)


})

}



</div>



</motion.div>


)

}


export default AIBox;