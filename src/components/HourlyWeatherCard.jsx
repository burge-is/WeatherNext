const sampleData = {
  dt: 1675760400,
  main: {
    temp: 30.43,
    feels_like: 30.43,
    temp_min: 30.43,
    temp_max: 35.98,
    pressure: 1027,
    sea_level: 1027,
    grnd_level: 1020,
    humidity: 84,
    temp_kf: -3.08,
  },
  weather: [
    { id: 801, main: "Clouds", description: "few clouds", icon: "02n" },
  ],
  clouds: { all: 20 },
  wind: { speed: 2.04, deg: 27, gust: 2.26 },
  visibility: 10000,
  pop: 0,
  sys: { pod: "n" },
  dt_txt: "2023-02-07 09:00:00",
};

const HourlyWeatherCard = (props) => {
  console.log({ test: props });
  return (
    <div
      style={{
        borderRadius: "1rem",
        width: "fit-content",
        minWidth: "45vw",
        maxWidth: "95vw",
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "24px",
        alignItems: "center",
        padding: "4px 8px",
        backgroundColor: "#dddddd58",
        marginBottom: "8px",
      }}
    >
      <h3>
        <strong>{props.dt_txt}</strong>
      </h3>
      <div>
        <div>Hi: {props?.main?.temp_max}&#8457;</div>
        <div>Lo: {props?.main?.temp_min}&#8457;</div>
      </div>
      <div style={{ fontSize: "24px" }}>{props.main.temp} &#8457;</div>
      {props?.weather && (
        <div>
          <img
            src={`http://openweathermap.org/img/wn/${props.weather[0].icon}.png`}
          />
          <div>{props.weather[0].description}</div>
        </div>
      )}
    </div>
  );
};

export default HourlyWeatherCard;
