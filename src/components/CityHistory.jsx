import { motion } from "framer-motion";
import { FaHistory, FaStar } from "react-icons/fa";


function CityHistory({cities, onSelect, onCompare}){


if(cities.length===0)
return null;


return(

<div className="
w-full
max-w-5xl
mt-6
text-white
">


<h2 className="
text-2xl
font-bold
mb-4
flex
items-center
gap-2
">

<FaHistory/>

Recent Searches

</h2>



<div className="
flex
gap-3
overflow-x-auto
pb-3
">


{

cities.map((city,index)=>(


<div className="
flex
gap-2
items-center
">


<button

onClick={()=>onSelect(city)}

className="
bg-white/20
px-4
py-2
rounded-full
"

>

{city}

</button>



<button

onClick={()=>onCompare(city)}

className="
bg-white/10
px-3
py-2
rounded-full
"

>

⚖️

</button>


</div>


))

}


</div>


</div>

)

}


export default CityHistory;