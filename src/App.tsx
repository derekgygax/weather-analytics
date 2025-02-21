import { useReducer, useEffect, useState } from "react";

// types
import { WeatherState } from "./types/weatherTypes";

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
const INITIAL_WEATHER: WeatherState = {
  selectedCityWeather: undefined,
  searchHistory: [],
  localCountry: "US"
}

export const App = () => {
  const [weatherState, weatherDispatcher] = useReducer(WeatherReducer, INITIAL_WEATHER);

  // Get the geolocation for where you are
  useEffect(() => {
    const getLocal = async () => {
      try {
        const { weatherData, city } = await getLocalWeather();
        weatherDispatcher({
          type: "setLocalCity",
          payload: {
            city: city,
            data: weatherData,
            country: weatherData.current.sys.country
          }
        });
      } catch (error) {
        // TODO do more!
        console.error(error);
      } finally {
        // setIsCityWeatherLoading(false)
      }
    }
    getLocal();
  }, []);

  return (
    <>
      <Header
        weatherState={weatherState}
        weatherDispatcher={weatherDispatcher}
      />
      <HomePage
        weatherDispatcher={weatherDispatcher}
        weatherState={weatherState}
      />
    </>
  )
}
