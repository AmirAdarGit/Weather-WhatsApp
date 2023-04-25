import express, { Request, Response, Router } from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv'
import { getLocation, getWeather, sendMessageToWhatsApp } from "./domain";
import cron from 'node-cron';
import { sendWeatherWhatsAppCallApi } from "./cron";

dotenv.config()
const app = express();
app.use(bodyParser.json());
const router: Router = express.Router();
app.use('/', router);
cron.schedule('32 15 * * *', sendWeatherWhatsAppCallApi, {
  timezone: "Asia/Jerusalem"
});
router.get('/sendWeatherWhatsApp', async (req: Request, res: Response) => {
  try {
    const location = await getLocation()
    const weather = await getWeather(location.lat, location.lon)
    await sendMessageToWhatsApp(weather)
    res.json("ok!").status(200)
  } catch (e) {
    res.status(500)
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    res.json("ok!").status(200)
  } catch (e) {
    res.status(500)
  }
});

export default app;