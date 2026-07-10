import { motion } from "framer-motion";


function LoadingCard({text}){


return (

<motion.div

initial={{
opacity:0
}}

animate={{
opacity:1
}}

className="
bg-white/20
backdrop-blur-xl
border
border-white/30
rounded-3xl
p-8
text-white
shadow-xl
w-full
flex
flex-col
items-center
justify-center
"


>


<div className="
text-5xl
animate-spin
mb-5
">

🌤️

</div>


<p className="
text-xl
font-semibold
animate-pulse
">

{text}

</p>


</motion.div>

)

}


export default LoadingCard;