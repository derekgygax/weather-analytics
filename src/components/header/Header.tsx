import classNames from "classnames";

import { useDispatch } from "react-redux";

// redux
import { WeatherDispatch } from "../../store/store";
import { CityWeatherType, changeSelectedCity } from "../../store/weather-slice";

// components
import { CityUpdater } from "../cityUpdater/CityUpdater";

// styles
import styles from './Header.module.scss';
import globalStyles from "@/styles/globals.module.scss";

export const Header = () => {

  const weatherDispatch = useDispatch<WeatherDispatch>();

  const handleNewCityWeather = (cityWeather: CityWeatherType) => {
    weatherDispatch(changeSelectedCity({
      city: cityWeather.current.name,
      data: cityWeather
    }));
  }

  return (
    <header className={styles.header}>
      <div className={classNames(globalStyles.containerFullPage, styles.cityUpdaterContainer)}>
        <CityUpdater
          handleNewCityWeather={handleNewCityWeather}
        />
      </div>
    </header>
  )
}
