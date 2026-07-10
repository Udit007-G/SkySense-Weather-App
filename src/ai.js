import Groq from "groq-sdk";


const groq = new Groq({

apiKey: import.meta.env.VITE_GROQ_API_KEY,

dangerouslyAllowBrowser:true

});



export async function getWeatherAdvice(weather){


const prompt = `

You are SkySense AI, an intelligent weather assistant.

Analyze the weather data and return ONLY valid JSON.

Do not add markdown.
Do not add explanations.

Return exactly this format:

{
"summary":"",
"clothing":"",
"activity":"",
"health":"",
"alert":""
}


Weather data:

City: ${weather.name}

Temperature:
${weather.main.temp} °C

Feels like:
${weather.main.feels_like} °C

Humidity:
${weather.main.humidity}%

Wind:
${weather.wind.speed}

Condition:
${weather.weather[0].description}


`;



const response = await groq.chat.completions.create({

messages:[

{
role:"user",
content:prompt
}

],

model:"llama-3.1-8b-instant",

});


const aiText =
response.choices[0].message.content;


const cleaned =
aiText.replace(
/```json|```/g,
""
)
.trim();



return JSON.parse(cleaned);


}