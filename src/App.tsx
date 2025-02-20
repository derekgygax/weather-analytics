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
import { LoadingSpinner } from "./components/loadingSpinner/LoadingSpinner";

// reducer initial state
const INITIAL_WEATHER: WeatherState = {
  selectedCityWeather: undefined,
  searchHistory: []
}

export const App = () => {
  const [weather, weatherDispatcher] = useReducer(WeatherReducer, INITIAL_WEATHER);
  const [isCityWeatherLoading, setIsCityWeatherLoading] = useState<boolean>(true);

  // Get the geolocation for where you are
  useEffect(() => {
    const getLocal = async () => {
      try {
        const { weatherData, city } = await getLocalWeather();
        weatherDispatcher({
          type: "changeCurrentCity",
          payload: {
            city: city,
            data: weatherData
          }
        });
      } catch (error) {
        // TODO do more!
        console.error(error);
      } finally {
        setIsCityWeatherLoading(false)
      }
    }
    getLocal();
  }, []);

  return (
    <>
      <Header
        weatherDispatcher={weatherDispatcher}
        isCityWeatherLoading={isCityWeatherLoading}
        setIsCityWeatherLoading={setIsCityWeatherLoading}
      />
      {isCityWeatherLoading ? (
        <LoadingSpinner
          loadingText="Retrieving City Weather"
        />
      ) : (
        <HomePage
          weatherState={weather}
        />
      )}
    </>
  )
}
