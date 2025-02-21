

// reducer
import { WeatherReducerAction } from "../../reducers/WeatherReducer";

// components
import { CityUpdater } from "../cityUpdater/CityUpdater";

// styles
import styles from './Header.module.scss';

interface HeaderProps {
  weatherDispatcher: React.Dispatch<WeatherReducerAction>;
  isCityWeatherLoading: boolean;
  setIsCityWeatherLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header = ({ weatherDispatcher, isCityWeatherLoading, setIsCityWeatherLoading }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <CityUpdater
        weatherDispatcher={weatherDispatcher}
        isCityWeatherLoading={isCityWeatherLoading}
        setIsCityWeatherLoading={setIsCityWeatherLoading}
      />
    </header>
  )
}
