import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

console.log(process.env.REACT_APP_WEATHER_API);

function App() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API}&q=${location}&days=4&aqi=yes&alerts=yes`
        );

        setWeather(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    if (location) {
      fetchData();
    }
  }, [location]);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div className="divBox">
      <div className="app-container">
        <h1 className="app-title">Weather App</h1>
        <div className="inp-container">
          <input
            type="text"
            className="inp-location"
            placeholder="Please enter city name"
            value={location}
            onChange={handleLocationChange}
          />
        </div>
      </div>

      {weather && (
        <div className="weather-container">
          {weather.forecast.forecastday.map((day) => (
            <div className="day-container" key={day.date}>
              <h2 className="date">{day.date}</h2>
              <img className="weather-icon" src={day.day.condition.icon} />
              <p>{day.day.maxtemp_c}</p>
              <p>{day.day.condition.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
