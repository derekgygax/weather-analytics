import { useReducer, useEffect } from "react";

// types
import { Weather } from "./types/weatherTypes";

// API
import { getLocalWeather } from "./lib/weatherApi";

// reducers
import { WeatherReducer } from "./reducers/WeatherReducer";

// Would use React router but there is only one page
// pages
import { HomePage } from "./pages/homePage/HomePage";

// components
import { Header } from "./components/header/Header";

// reducer initial state
const INITIAL_WEATHER: Weather = {
  current: undefined,
  searchHistory: []
}

export const App = () => {
  const [weather, weatherDispatcher] = useReducer(WeatherReducer, INITIAL_WEATHER);

  // Get the geolocation for where you are
  useEffect(() => {
    const getLocal = async () => {
      try {
        const { weatherData, city } = await getLocalWeather();
        weatherDispatcher({
          type: "changeCurrent",
          payload: {
            city: city,
            data: weatherData
          }
        });
      } catch (error) {
        // TODO DO SOMETHING HERE!!!
      }
    }
    getLocal();
  }, []);

  return (
    <>
      <Header
        handleCityChange={weatherDispatcher}
      />
      <HomePage
        weather={weather}
      />
    </>
  )
}
