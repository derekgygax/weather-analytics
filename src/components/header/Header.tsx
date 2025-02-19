import classNames from "classnames";

// components
import { SearchBar } from "../searchBar/SearchBar"

// styles
import styles from './Header.module.scss';
import globalStyles from "@/styles/globals.module.scss";
import { WeatherReducerAction } from "../../reducers/WeatherReducer";

interface HeaderProps {
  handleCityChange: React.Dispatch<WeatherReducerAction>;
}

export const Header = ({ handleCityChange }: HeaderProps) => {

  return (
    <header className={styles.header}>
      <div className={classNames(globalStyles.containerFullPage, styles.headerContent)}>
        <SearchBar
          handleCitySearch={handleCityChange}
        />
      </div>
    </header>
  )
}
