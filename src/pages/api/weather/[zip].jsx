// pages/api/hello.js
import { createRouter, expressWrapper } from "next-connect";
import cors from "cors";
import { isValidUSZip } from "../../../utils/zip.utils";

// Default Req and Res are IncomingMessage and ServerResponse
// You may want to pass in NextApiRequest and NextApiResponse
const router = createRouter();

router
  .use(expressWrapper(cors()))
  .use(async (req, res, next) => {
    const start = Date.now();

    if (isValidUSZip(req.query.zip)) {
      await next(); // call next in chain
    } else {
      res.status(400).send({
        error: "Invalid Zip Code",
        error_code: 400,
        error_message: "Invalid Zip Code",
        error_time: Date.now() - start,
      });
    }

    const end = Date.now();
    console.log(`Request took ${end - start}ms`);
  })
  .get(async (req, res) => {
    const zip = req.query.zip;

    const { lat, lon } = await getGeoData(zip);
    const forecast = await getForecast(lat, lon);

    res.send({ data: { forecast } });
  });

// create a handler from router with custom
// onError and onNoMatch
export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});

async function getGeoData(zip) {
  const geoCodeURL = `http://api.openweathermap.org/geo/1.0/zip?zip=${zip},US&appid=${process.env.OPENWEATHERMAP_API_KEY}`;
  const geoResponse = await fetch(geoCodeURL);
  const geoJSON = await geoResponse.json();
  if (geoJSON.cod === "404") {
    throw new Error(`Geo Code for ${zip} not found`);
  }

  return geoJSON;
}

async function getForecast(lat, lon) {
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=imperial`;
  const forecast = await fetch(forecastURL);
  const forecastJSON = await forecast.json();

  return forecastJSON;
}
