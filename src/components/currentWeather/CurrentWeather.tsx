
// utiles
import { kelvinToFahrenheit, formatTemperature, isNightTime, capitalizeAsTitle, kelvinToCelsius } from "../../lib/utils";

// types
import { Metric } from "../../types/commonTypes";
import { CurrentWeatherType } from "../../types/weatherTypes"

// layouts
import { Title } from "../../layouts/title/Title";

// components
import { AtmosphericDetail } from "../atmosphericDetail/AtmosphericDetail";
import { SkyConditions } from "../skyConditions/SkyConditions";
import { TemperatureMetric } from "../temperatureMetric/TemperatureMetric";

// styles
import styles from './CurrentWeather.module.scss';

const FAHRENHEIT_COUNTRIES: string[] = ["BS", "BZ", "KY", "PW", "US", "MM"];

const getTempValueString = (tempK: number, country: string) => {
  if (FAHRENHEIT_COUNTRIES.includes(country)) {
    return formatTemperature(kelvinToFahrenheit(tempK), "F");
  } else {
    return formatTemperature(kelvinToCelsius(tempK), "C");
  }
}

interface CurrentWeatherProps {
  city: string;
  currentWeather: CurrentWeatherType
}

export const CurrentWeather = ({ city, currentWeather }: CurrentWeatherProps) => {

  const tempMetrics: Metric[] = [
    {
      label: "Temperature",
      value: getTempValueString(currentWeather.main.temp, currentWeather.sys.country)
    },
    {
      label: "Feels Like",
      value: getTempValueString(currentWeather.main.feels_like, currentWeather.sys.country)
    },
    {
      label: "High",
      value: getTempValueString(currentWeather.main.temp_max, currentWeather.sys.country)
    },
    {
      label: "Low",
      value: getTempValueString(currentWeather.main.temp_min, currentWeather.sys.country)
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
        title={capitalizeAsTitle(city)}
        className={styles.cityTitle}
      />
      <section className={styles.weatherDetailsContainer}>
        <TemperatureMetric
          currentTemp={currentWeather.main.temp}
          humidity={currentWeather.main.humidity}
          metrics={tempMetrics}
        />
        <SkyConditions
          isNight={isNightTime(currentWeather.sys.sunrise, currentWeather.sys.sunset)}
          conditions={skyConditions}
        />
        <AtmosphericDetail
          sunrise={currentWeather.sys.sunrise}
          sunset={currentWeather.sys.sunset}
          wind={currentWeather.wind}
        />
      </section>
    </>
  )
}
