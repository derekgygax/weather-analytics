
// types
import { Title } from "../../layouts/title/Title";
import { Metric } from "../../types/commonTypes";
import { CurrentWeatherType } from "../../types/weatherTypes"
import { AtmosphericDetail } from "../atmosphericDetail/AtmosphericDetail";
import { SkyConditions } from "../skyConditions/SkyConditions";
import { TemperatureMetric } from "../temperatureMetric/TemperatureMetric";

import { kelvinToFahrenheit, formatTemperature } from "../../lib/utils";

// styles
import styles from './CurrentWeather.module.scss';

const FAHRENHEIT_COUNTRIES: string[] = ["BS", "BZ", "KY", "PW", "US", "MM"];


interface CurrentWeatherProps {
  city: string;
  currentWeather: CurrentWeatherType
}

export const CurrentWeather = ({ city, currentWeather }: CurrentWeatherProps) => {
  console.log(currentWeather);
  const degreeType = FAHRENHEIT_COUNTRIES.includes(currentWeather.sys.country) ? "F" : "C";

  const tempMetrics: Metric[] = [
    {
      label: "Temperature",
      value: `${formatTemperature(kelvinToFahrenheit(currentWeather.main.temp), degreeType)}`
    },
    {
      label: "Feels Like",
      value: `${formatTemperature(kelvinToFahrenheit(currentWeather.main.feels_like), degreeType)}`
    },
    {
      label: "High",
      value: `${formatTemperature(kelvinToFahrenheit(currentWeather.main.temp_max), degreeType)}`
    },
    {
      label: "Low",
      value: `${formatTemperature(kelvinToFahrenheit(currentWeather.main.temp_min), degreeType)}`
    },
    {
      label: "Humidity",
      value: `${currentWeather.main.humidity}%`
    }
  ];

  const skyConditions = currentWeather.weather.length > 0 ? {
    main: currentWeather.weather[0].main,
    description: currentWeather.weather[0].description,
    icon: currentWeather.weather[0].icon
  } : {
    main: "No Weather",
    description: "It's pretty bleak without any weather",
    icon: "50d"
  };

  return (
    <>
      <Title
        level={1}
        title={city}
      />
      <section className={styles.weatherDetailsContainer}>
        <TemperatureMetric
          currentTemp={currentWeather.main.temp}
          humidity={currentWeather.main.humidity}
          metrics={tempMetrics}
        />
        <SkyConditions
          conditions={skyConditions}
        />
        <AtmosphericDetail />
      </section>
    </>
  )
}
