

// types
import { WeatherState } from "../../types/weatherTypes";

// reducer
import { WeatherReducerAction } from "../../reducers/WeatherReducer";

// components
import { CityUpdater } from "../cityUpdater/CityUpdater";

// styles
import styles from './Header.module.scss';

interface HeaderProps {
  weatherState: WeatherState;
  weatherDispatcher: React.Dispatch<WeatherReducerAction>;
  isCityWeatherLoading: boolean;
  setIsCityWeatherLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header = ({ weatherState, weatherDispatcher, isCityWeatherLoading, setIsCityWeatherLoading }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <CityUpdater
        weatherState={weatherState}
        weatherDispatcher={weatherDispatcher}
        isCityWeatherLoading={isCityWeatherLoading}
        setIsCityWeatherLoading={setIsCityWeatherLoading}
      />
    </header>
  )
}
