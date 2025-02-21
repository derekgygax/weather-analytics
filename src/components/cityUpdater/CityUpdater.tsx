import classNames from "classnames";
import { useState } from "react";

// types
import { CityWeatherType } from "../../types/weatherTypes";

// lib
import { getWeatherByCity } from "../../lib/weatherApi";

// components
import { SearchBar } from "../searchBar/SearchBar";
import { SearchHistory } from "../searchHistory/SearchHistory";
import { LoadingSpinner } from "../loadingSpinner/LoadingSpinner";

// styles
import styles from './CityUpdater.module.scss';

interface CityUpdaterProps {
  currentCity: string | undefined;
  searchHistory: string[];
  handleNewCityWeather: (cityWeather: CityWeatherType) => void;
  title?: string;
  className?: string;
}

export const CityUpdater = ({ currentCity, searchHistory, handleNewCityWeather, title, className }: CityUpdaterProps) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>("");

  const handleCityChange = async (newCity: string): Promise<boolean> => {
    setIsLoading(true);
    setMessage(`Loading ${newCity}`);

    try {
      const cityWeather: CityWeatherType = await getWeatherByCity(newCity);
      handleNewCityWeather(cityWeather);
      setIsLoading(false);
      setMessage("");
      return true;
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      setMessage(`Couldn't fetch ${newCity}. Please try again.`);
      return false;
    }
  }

  return (
    <div className={classNames(styles.cityUpdater, className)}>
      {title && (
        <h2 className={styles.title}>{title}</h2>
      )}
      <div className={classNames(styles.cityChangeContainer)}>
        <SearchBar
          isCityWeatherLoading={isLoading}
          className={styles.searchBar}
          handleCityChange={handleCityChange}
        />
        <SearchHistory
          currentCity={currentCity}
          searchHistory={searchHistory}
          handleCityChange={handleCityChange}
          className={styles.searchHistory}
        />
      </div>
      <div className={styles.messageContainer}>
        {message && (
          isLoading ? (
            <LoadingSpinner loadingText={message} />
          ) : (
            <p className={styles.message}>{message}</p>
          )
        )}
      </div>
    </div>
  )
}
