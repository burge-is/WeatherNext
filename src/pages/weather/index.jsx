import Link from "next/link";
import React from "react";
import { isValidUSZip } from "../../utils/zip.utils";
import { useState, useMemo } from "react";

const WeatherHome = () => {
  const [zip, setZip] = useState("1" || "");

  const handleZipChange = (event) => {
    setZip(event.target.value);
  };

  const isValidZip = useMemo(() => isValidUSZip(zip), [zip]);

  return (
    <div className="weather-home">
      <div className="weather-home-title">
        <h1>Weather Forecaster</h1>
        <h2>Enter a zip code to forecast the weather</h2>
      </div>
      <label htmlFor="zip">Zip Code: </label>
      <input
        id="zip"
        type="text"
        className="weather-home-zip"
        placeholder="Zip Code"
        onChange={handleZipChange}
      />
      <Link as={`/weather/${zip}`} href="/weather/[zip]">
        <a style={{ cursor: isValidZip ? "pointer" : "not-allowed" }}>
          <button disabled={!isValidZip}>Look up</button>
        </a>
      </Link>
    </div>
  );
};

export default WeatherHome;
