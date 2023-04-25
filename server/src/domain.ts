
import axios from 'axios';
import twilio from 'twilio';


export const getLocation = async () => {
const ans = await axios.get('http://ip-api.com/json/?fields=61439')
  return ans.data
}

export const getWeather = async (lat: string, lon: string) => {
const appid = process.env.OPEN_WEATHER_API_KEY
const url = `https://api.openweathermap.org/data/2.5/weather?APPID=${appid}&lat=${lat}&lon=${lon}&units=metric`
const ans = await axios.get(url)
return ans.data;
}

export const sendMessageToWhatsApp = async (message: string) => {
  const client = twilio(process.env.SID, process.env.AUTH_TOKEN);

  client.messages
    .create({
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:+972544825785',
      body: messageToSendToWhatsApp(message),
    })
    .then((message: any) => console.log(message))
    .catch((error: Error) => console.log(error));
}

const messageToSendToWhatsApp = (message: any) => {
  return `The weather for today at ${message.name} is ${message.weather[0].description}\nThe temperature is ${message.main.temp} ℃\nThe max temperature is ${message.main.temp_max} ℃\nThe min temperature is ${message.main.temp_min} ℃\nThe wind speed is ${message.main.temp_min} m/sec\n`
}