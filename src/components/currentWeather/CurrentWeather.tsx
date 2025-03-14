
import { useSelector } from "react-redux";

// redux
import { RootState } from "../../store/store";
import { WeatherState, SelectedCityWeather } from "../../store/weather-slice";

// utils
import { isNightTime, capitalizeAsTitle } from "../../lib/utils";

// types
import { CurrentWeatherType } from "../../types/weatherTypes";

// layouts
import { Title } from "../../layouts/title/Title";

// components
import { AtmosphericDetail } from "../atmosphericDetail/AtmosphericDetail";
import { SkyConditions } from "../skyConditions/SkyConditions";
import { TemperatureMetric } from "../temperatureMetric/TemperatureMetric";

// styles
import styles from './CurrentWeather.module.scss';


export const CurrentWeather = () => {

  const weatherState: WeatherState = useSelector((state: RootState) => {
    return state.weather;
  });

  const selectedCityWeather: SelectedCityWeather | undefined = weatherState.selectedCityWeather;
  // TODO
  // This is a STUPID way to do this but for time right now just go with it
  // fix later
  if (!selectedCityWeather) {
    return (
      <>THIS IS NEVER HIT AND YOU NEED TO HANDLE IT CORRECTLY!!</>
    )
  }

  const currentWeather: CurrentWeatherType = selectedCityWeather.data.current;

  return (
    <>
      <Title
        level={1}
        title={capitalizeAsTitle(selectedCityWeather.city)}
        className={styles.cityTitle}
      />
      <section className={styles.weatherDetailsContainer}>
        <TemperatureMetric
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
