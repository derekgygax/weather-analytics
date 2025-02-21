

// types
import { CityWeatherType } from "../../types/weatherTypes";

// reducer
import { WeatherReducerAction } from "../../reducers/WeatherReducer";

// components
import { CityUpdater } from "../cityUpdater/CityUpdater";

// styles
import styles from './Header.module.scss';

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
      <CityUpdater
        currentCity={currentCity}
        searchHistory={searchHistory}
        handleNewCityWeather={handleNewCityWeather}
      />
    </header>
  )
}
