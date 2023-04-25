import cron from 'node-cron';
import axios from 'axios';



export const sendWeatherWhatsAppCallApi = () =>  {
  axios.get('https://weather-whatsapp-service-8.onrender.com/sendWeatherWhatsApp')
    .then(response => {
      console.log(response.data); // or do something else with the response
    })
    .catch(error => {
      console.error(error);
    });
}

