import classNames from "classnames";

// components
import { SearchBar } from "../searchBar/SearchBar"

// styles
import styles from './Header.module.scss';
import globalStyles from "@/styles/globals.module.scss";
import { WeatherReducerAction } from "../../reducers/WeatherReducer";

interface HeaderProps {
  weatherDispatcher: React.Dispatch<WeatherReducerAction>;
}

export const Header = ({ weatherDispatcher }: HeaderProps) => {

  return (
    <header className={styles.header}>
      <div className={classNames(globalStyles.containerFullPage, styles.headerContent)}>
        <SearchBar
          weatherDispatcher={weatherDispatcher}
        />
      </div>
    </header>
  )
}
