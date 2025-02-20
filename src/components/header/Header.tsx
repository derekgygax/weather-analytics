import classNames from "classnames";

// components
import { SearchBar } from "../searchBar/SearchBar"

// styles
import styles from './Header.module.scss';
import globalStyles from "@/styles/globals.module.scss";
import { WeatherReducerAction } from "../../reducers/WeatherReducer";

interface HeaderProps {
  weatherDispatcher: React.Dispatch<WeatherReducerAction>;
  isCityWeatherLoading: boolean;
  setIsCityWeatherLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header = ({ weatherDispatcher, isCityWeatherLoading, setIsCityWeatherLoading }: HeaderProps) => {

  return (
    <header className={styles.header}>
      <div className={classNames(globalStyles.containerFullPage, styles.headerContent)}>
        <SearchBar
          weatherDispatcher={weatherDispatcher}
          isCityWeatherLoading={isCityWeatherLoading}
          setIsCityWeatherLoading={setIsCityWeatherLoading}
        />
      </div>
    </header>
  )
}
