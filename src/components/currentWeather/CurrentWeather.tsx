import { CityWeather } from "../../types/weatherTypes"


interface CurrentWeatherProps {
  weather: CityWeather
}

export const CurrentWeather = ({ weather: { city, weather } }: CurrentWeatherProps) => {
  return (
    <>
      <h1>{city}</h1>
    </>
  )
}
