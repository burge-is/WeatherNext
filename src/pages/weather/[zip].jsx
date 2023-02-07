import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import WeatherLoader from "../../components/WeatherLoader";
import HourlyWeatherCard from "../../components/HourlyWeatherCard";
import Link from "next/link";
import { isValidUSZip } from "../../utils/zip.utils";

// move this into a process.env variable so it can be changed
// based on where we deploy this app, hard-coded for now
const API_URL = "https://weathernext.burge-is.repl.co";

const WeatherForZip = () => {
  const router = useRouter();

  const { zip } = router.query;
  const [forecastData, setForecastData] = useState(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!router.query.zip) return;
    if (forecastData) return;

    setHasError(!isValidUSZip(router.query.zip));

    const weatherAPI = `${API_URL}/api/weather/${router.query.zip}`;
    fetch(weatherAPI).then(async (res) => {
      try {
        const { data } = await res.json();
        setForecastData(data);
        setHasError(false);
      } catch (err) {
        setHasError(true);
      }
    });
  }, [zip]);

  return (
    <div>
      <Link href="/weather/">
        <a style={{ position: "sticky", top: "8px", left: "0px" }}>
          <button style={{ marginTop: "12px", padding: "8px 12px" }}>
            {" "}
            Return to Search
          </button>
        </a>
      </Link>
      {forecastData ? (
        <div>
          <h1
            style={{
              position: "sticky",
              top: "3rem",
              backgroundColor: "#dddddddd",
            }}
          >
            Weather for {forecastData?.forecast?.city?.name || zip}
          </h1>
          {forecastData.forecast.list.map((fc, i) => (
            <HourlyWeatherCard {...fc} />
          ))}
        </div>
      ) : (
        <WeatherLoader
          loadingText={zip && `Loading weather for zip code: ${zip}.`}
        />
      )}

      {hasError && (
        <h2 style={{ color: "#B33A3A" }}>Invalid zip code: {zip}</h2>
      )}
    </div>
  );
};

export default WeatherForZip;
