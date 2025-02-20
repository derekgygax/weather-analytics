
// utiles
import { isNightTime, capitalizeAsTitle } from "../../lib/utils";

// types
import { CurrentWeatherType } from "../../types/weatherTypes"

// layouts
import { Title } from "../../layouts/title/Title";

// components
import { AtmosphericDetail } from "../atmosphericDetail/AtmosphericDetail";
import { SkyConditions } from "../skyConditions/SkyConditions";
import { TemperatureMetric } from "../temperatureMetric/TemperatureMetric";

// styles
import styles from './CurrentWeather.module.scss';

interface CurrentWeatherProps {
  localCountry: string;
  city: string;
  currentWeather: CurrentWeatherType
}

export const CurrentWeather = ({ localCountry, city, currentWeather }: CurrentWeatherProps) => {

  return (
    <>
      <Title
        level={1}
        title={capitalizeAsTitle(city)}
        className={styles.cityTitle}
      />
      <section className={styles.weatherDetailsContainer}>
        <TemperatureMetric
          localCountry={localCountry}
          tempHumidPressureInfo={currentWeather.main}
        />
        <SkyConditions
          isNight={isNightTime(currentWeather.sys.sunrise, currentWeather.sys.sunset)}
          skyConditions={currentWeather.weather.length > 0 ? currentWeather.weather[0] : {
            id: 0,
            main: "No Weather",
            description: "It's pretty bleak without any weather",
            icon: "50d"
          }}

        />
        <AtmosphericDetail
          sunrise={currentWeather.sys.sunrise}
          sunset={currentWeather.sys.sunset}
          timezoneOffset={currentWeather.timezone}
          wind={currentWeather.wind}
        />
      </section>
    </>
  )
}
