import { useDispatch } from 'react-redux';
import { useEffect } from "react";

// redux
import { WeatherDispatch } from './store/store';
import { setLocalCity } from './store/weather-slice';

// API
import { getLocalWeather } from "./lib/weatherApi";

// Would use React router but there is only one page
// pages
import { HomePage } from "./pages/homePage/HomePage";

// components
import { Header } from "./components/header/Header";

export const App = () => {

  const weatherDispatch = useDispatch<WeatherDispatch>();

  // Get the geolocation for where you are
  useEffect(() => {
    const getLocal = async () => {
      try {
        const { weatherData, city } = await getLocalWeather();
        weatherDispatch(setLocalCity({
          city: city,
          data: weatherData,
          country: weatherData.current.sys.country
        }));
      } catch (error) {
        console.error(error);
      }
    }

    getLocal();
  }, []);

  return (
    <>
      <Header />
      <HomePage />
    </>
  )
}
