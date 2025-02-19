import { CityWeather } from "../../types/weatherTypes"


interface CurrentWeatherProps {
  city: string | undefined;
  weather: CityWeather | undefined
}

export const CurrentWeather = ({ city }: CurrentWeatherProps) => {
  return (
    <>
      <h1>{city}</h1>
    </>
  )
}
