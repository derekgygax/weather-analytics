

// types
import { CityWeatherType, WeatherState } from "../../types/weatherTypes";

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
        weatherState={weatherState}
        isCityWeatherLoading={isCityWeatherLoading}
        setIsCityWeatherLoading={setIsCityWeatherLoading}
        handleNewCityWeather={handleNewCityWeather}
      />
    </header>
  )
}
