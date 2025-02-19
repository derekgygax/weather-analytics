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
  const [loading, setLoading] = useState<boolean>(true);

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
        // TODO do more!
        console.error(error);
      } finally {
        setLoading(false)
      }
    }
    getLocal();
  }, []);

  return (
    <>
      <Header
        handleCityChange={weatherDispatcher}
      />
      {loading ? (
        <LoadingSpinner
          loadingText="Retrieving Current City Weather"
        />
      ) : (
        <HomePage
          weatherState={weather}
        />
      )}
    </>
  )
}
