

// types
import { CityWeatherType } from "../../types/weatherTypes";

// reducer
import { WeatherReducerAction } from "../../reducers/WeatherReducer";

// components
import { CityUpdater } from "../cityUpdater/CityUpdater";

// styles
import styles from './Header.module.scss';
import globalStyles from "@/styles/globals.module.scss";

interface HeaderProps {
  currentCity: string | undefined;
  searchHistory: string[]
  weatherDispatcher: React.Dispatch<WeatherReducerAction>;
}

export const Header = ({ currentCity, searchHistory, weatherDispatcher }: HeaderProps) => {

  const handleNewCityWeather = (cityWeather: CityWeatherType) => {
    weatherDispatcher({
      type: "changeCurrentCity",
      payload: {
        city: cityWeather.current.name,
        data: cityWeather
      }
    });
  }

  return (
    <header className={styles.header}>
      <div className={globalStyles.containerFullPage}>
        <CityUpdater
          currentCity={currentCity}
          searchHistory={searchHistory}
          handleNewCityWeather={handleNewCityWeather}
        />
      </div>
    </header>
  )
}
