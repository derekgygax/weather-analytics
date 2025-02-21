import classNames from "classnames";
import { useState } from "react";

// types
import { CityWeatherType, WeatherState } from "../../types/weatherTypes";

// lib
import { getWeatherByCity } from "../../lib/weatherApi";
import { capitalizeAsTitle } from "../../lib/utils";

// reducer
import { WeatherReducerAction } from "../../reducers/WeatherReducer";

// components
import { SearchBar } from "../searchBar/SearchBar";
import { SearchHistory } from "../searchHistory/SearchHistory";

// styles
import styles from './CityUpdater.module.scss';
import globalStyles from "@/styles/globals.module.scss";

interface CityUpdaterProps {
  weatherState: WeatherState;
  weatherDispatcher: React.Dispatch<WeatherReducerAction>;
  isCityWeatherLoading: boolean;
  setIsCityWeatherLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CityUpdater = ({ weatherState, weatherDispatcher, isCityWeatherLoading, setIsCityWeatherLoading }: CityUpdaterProps) => {

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCityChange = async (newCity: string): Promise<boolean> => {
    setIsCityWeatherLoading(true);

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
      return true;
    } catch (err) {
      setIsCityWeatherLoading(false);
      const searchAgainMessage = "Please search again.";
      if (typeof err === "object" && err !== null && "message" in err && "cod" in err) {
        setErrorMessage(`${capitalizeAsTitle(err.message as string)}. ${searchAgainMessage}`);
      } else {
        setErrorMessage(`Failed to fetch weather data. ${searchAgainMessage}`);
      }
      console.error(err);
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
      {errorMessage && (
        <p className={styles.errorMessage}>{errorMessage}</p>
      )}
    </div>
  )
}
