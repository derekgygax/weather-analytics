
// types
import { CityWeather } from "../../types/weatherTypes"

// styles
import styles from './CurrentWeather.module.scss';

interface CurrentWeatherProps {
  city: string;
  weather: CityWeather
}

export const CurrentWeather = ({ city, weather }: CurrentWeatherProps) => {
  console.log(weather);
  return (
    <>
      <h1 className={styles.title}>{city}</h1>
    </>
  )
}
