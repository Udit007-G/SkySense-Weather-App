import { motion } from "framer-motion";

function Blob({size,left,top,color,duration}){

return(

<motion.div

animate={

{
x:[0,40,-30,0],
y:[0,-30,30,0],
scale:[1,1.15,0.95,1]
}

}

transition={

{
duration,
repeat:Infinity,
ease:"easeInOut"
}

}

className="absolute rounded-full blur-3xl opacity-25"

style={

{
width:size,
height:size,
left,
top,
background:color
}

}

/>

);

}



function BackgroundEffects({condition}){

let colors={

c1:"#60A5FA",
c2:"#3B82F6",
c3:"#A855F7"

};


if(condition==="Clear"){

colors={

c1:"#FDBA74",
c2:"#FACC15",
c3:"#60A5FA"

};

}

else if(condition==="Rain"){

colors={

c1:"#1E3A8A",
c2:"#2563EB",
c3:"#0EA5E9"

};

}

else if(condition==="Clouds"){

colors={

c1:"#9CA3AF",
c2:"#6B7280",
c3:"#CBD5E1"

};

}

else if(condition==="Thunderstorm"){

colors={

c1:"#312E81",
c2:"#4C1D95",
c3:"#111827"

};

}



return(

<div className="absolute inset-0 overflow-hidden pointer-events-none">

<Blob
size={350}
left="-120px"
top="-80px"
color={colors.c1}
duration={12}
/>

<Blob
size={450}
left="65%"
top="10%"
color={colors.c2}
duration={18}
/>

<Blob
size={300}
left="25%"
top="70%"
color={colors.c3}
duration={15}
/>

</div>

);

}

export default BackgroundEffects;