import classNames from "classnames";
import { useState } from "react";

// types
import { CityWeatherType, WeatherState } from "../../types/weatherTypes";

// lib
import { getWeatherByCity } from "../../lib/weatherApi";

// reducer
import { WeatherReducerAction } from "../../reducers/WeatherReducer";

// components
import { SearchBar } from "../searchBar/SearchBar";
import { SearchHistory } from "../searchHistory/SearchHistory";

// styles
import styles from './CityUpdater.module.scss';
import globalStyles from "@/styles/globals.module.scss";
import { LoadingSpinner } from "../loadingSpinner/LoadingSpinner";

interface CityUpdaterProps {
  weatherState: WeatherState;
  weatherDispatcher: React.Dispatch<WeatherReducerAction>;
  isCityWeatherLoading: boolean;
  setIsCityWeatherLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CityUpdater = ({ weatherState, weatherDispatcher, isCityWeatherLoading, setIsCityWeatherLoading }: CityUpdaterProps) => {

  const [message, setMessage] = useState<string | null>("");

  const handleCityChange = async (newCity: string): Promise<boolean> => {
    setIsCityWeatherLoading(true);
    setMessage(`Loading ${newCity}`);

    try {
      const cityWeather: CityWeatherType = await getWeatherByCity(newCity);
      weatherDispatcher({
        type: "changeCurrentCity",
        payload: {
          city: newCity,
          data: cityWeather
        }
      });

      setIsCityWeatherLoading(false);
      setMessage("");
      return true;
    } catch (err) {
      console.error(err);
      setIsCityWeatherLoading(false);
      setMessage(`Failed to fetch weather for ${newCity}. Please search again.`);
      return false;
    }
  }

  return (
    <div className={classNames(globalStyles.containerFullPage, styles.cityUpdater)}>
      <div className={styles.cityChangeContainer}>
        <SearchBar
          isCityWeatherLoading={isCityWeatherLoading}
          className={styles.searchBar}
          handleCityChange={handleCityChange}
        />
        {/* TODO THIS IS NOT!!! A GOOD WAY TO DO IT!!
        YOU SHOULD NOT HAVE A CHECK HERE!!
        FIX THIS LATER!! */}
        <SearchHistory
          currentCity={weatherState ? weatherState.selectedCityWeather?.city : undefined}
          searchHistory={weatherState ? weatherState.searchHistory : []}
          handleCityChange={handleCityChange}
        />
      </div>
      {/* <LoadingSpinner
        loadingText="Leoadiasdf"
      /> */}
      <div className={styles.messageContainer}>
        {message && (
          isCityWeatherLoading ? (
            <LoadingSpinner
              loadingText={message}
            />
          ) : (
            <p className={styles.message}>{message}</p>
          )
        )}
      </div>
    </div>
  )
}
