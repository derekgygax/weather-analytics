
// types
import { CityWeather } from "../../types/weatherTypes"

// styles
import styles from './CurrentWeather.module.scss';

interface CurrentWeatherProps {
  city: string;
  weather: CityWeather
}

export const CurrentWeather = ({ city }: CurrentWeatherProps) => {
  return (
    <>
      <h1 className={styles.title}>{city}</h1>
    </>
  )
}
