import { motion } from "framer-motion";


function AIBox({advice}){


function formatAdvice(text){

    return text
    .split("\n")
    .filter(line=>line.trim() !== "");

}



return(

<motion.div


initial={{
opacity:0,
x:50
}}


animate={{
opacity:1,
x:0
}}


transition={{
duration:0.5
}}


className="

bg-white/20

backdrop-blur-xl

border

border-white/30

rounded-3xl

p-6

text-white

shadow-xl

w-96

"


>


<h2

className="

text-2xl

font-bold

mb-5

"

>

🤖 SkySense AI Assistant

</h2>




<div className="space-y-4">


{

formatAdvice(advice).map(

(line,index)=>(


<div

key={index}

className="

bg-white/10

rounded-xl

p-3

leading-relaxed

"

>

{line}


</div>


)


)

}


</div>



</motion.div>


);


}


export default AIBox;