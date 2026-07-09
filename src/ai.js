import Groq from "groq-sdk";


const groq = new Groq({

apiKey:
import.meta.env.VITE_GROQ_API_KEY,

dangerouslyAllowBrowser:true

});



export async function getWeatherAdvice(weather){


const prompt = `

You are a helpful weather assistant.

Give short practical advice based on this weather:

City:
${weather.name}

Temperature:
${weather.main.temp}°C

Feels like:
${weather.main.feels_like}°C

Condition:
${weather.weather[0].description}

Humidity:
${weather.main.humidity}%


Give response in this format and reply nothing extra:

👕 What to wear:
(one sentence)

🏃 Outdoor activity:
(one sentence)

💧 Health tip:
(one sentence)

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


return response.choices[0].message.content;


}