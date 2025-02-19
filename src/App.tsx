// types
import { Weather } from "./types/weatherTypes"

import { Header } from "./components/header/Header"
import { HomePage } from "./components/homePage/HomePage"
import { useReducer } from "react"
import { WeatherReducer } from "./reducers/WeatherReducer"

const INITIAL_WEATHER: Weather = {
  current: undefined,
  searchHistory: {}
}

export const App = () => {
  const [weather, weatherDispacter] = useReducer(WeatherReducer, INITIAL_WEATHER);

  return (
    <>
      <Header
        handleCityChange={weatherDispacter}
      />
      <HomePage
        weather={weather}
      />
    </>
  )
}
