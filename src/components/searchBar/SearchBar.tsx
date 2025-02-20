import classNames from "classnames";
import { useRef, useState } from "react";

// utils
import { capitalizeAsTitle } from "../../lib/utils";

// reducer
import { WeatherReducerAction } from "../../reducers/WeatherReducer";

// components
import { getWeatherByCity } from "../../lib/weatherApi";
import { CityWeatherType } from "../../types/weatherTypes";
import { SubmitFormButton } from "../submitFormButton/SubmitFormButton"

// styles
import styles from './SearchBar.module.scss';
import globalStyles from '@/styles/globals.module.scss';

interface SearchBarProps {
  weatherDispatcher: React.Dispatch<WeatherReducerAction>;
  isCityWeatherLoading: boolean;
  setIsCityWeatherLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchBar = ({ weatherDispatcher, isCityWeatherLoading, setIsCityWeatherLoading }: SearchBarProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCityWeatherLoading(true);

    const formData = new FormData(e.currentTarget);
    const city = formData.get("city") as string;

    try {
      const weather: CityWeatherType = await getWeatherByCity(city);
      weatherDispatcher({
        type: "changeCurrentCity",
        payload: {
          city: city,
          data: weather
        }
      });

      formRef.current?.reset();
      setIsCityWeatherLoading(false);

    } catch (err) {
      const searchAgainMessage = "Please search again.";
      if (typeof err === "object" && err !== null && "message" in err && "cod" in err) {
        setErrorMessage(`${capitalizeAsTitle(err.message as string)}. ${searchAgainMessage}`);
      } else {
        setErrorMessage(`Failed to fetch weather data. ${searchAgainMessage}`);
      }
      console.error(err);
    }
  }

  return (
    <form ref={formRef} onSubmit={handleFormSubmit}>
      <input
        className={classNames(
          styles.input,
          errorMessage ? styles.error : ""
        )}
        type="text"
        name="city"
        onClick={() => {
          setErrorMessage(null);
        }}
        onChange={() => {
          setErrorMessage(null);
        }}
        required
      />
      <SubmitFormButton
        className={globalStyles.buttonAccent}
        disabled={isCityWeatherLoading}
      />
      {errorMessage && (
        <p className={styles.errorMessage}>{errorMessage}</p>
      )}
    </form>
  )
}
