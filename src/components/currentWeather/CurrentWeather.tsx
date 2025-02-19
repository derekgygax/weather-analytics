
// types
import { Title } from "../../layouts/title/Title";
import { CityWeather } from "../../types/weatherTypes"
import { AtmosphericDetail } from "../atmosphericDetail/AtmosphericDetail";
import { SkyConditions } from "../skyConditions/SkyConditions";
import { TemperatureMetric } from "../temperatureMetric/TemperatureMetric";

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
      <Title
        level={1}
        title={city}
      />
      <section className={styles.weatherDetailsContainer}>
        <TemperatureMetric />
        <SkyConditions />
        <AtmosphericDetail />
      </section>
    </>
  )
}
