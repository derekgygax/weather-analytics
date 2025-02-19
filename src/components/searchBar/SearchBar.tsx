
import { WeatherReducerAction } from "../../reducers/WeatherReducer";

// components
import { getWeatherByCity } from "../../lib/weatherApi";
import { WeatherType } from "../../types/weatherTypes";
import { SubmitFormButton } from "../submitFormButton/SubmitFormButton"

// styles
import styles from './SearchBar.module.scss';
import globalStyles from '@/styles/globals.module.scss';

interface SearchBarProps {
  handleCitySearch: React.Dispatch<WeatherReducerAction>;
}

export const SearchBar = ({ handleCitySearch }: SearchBarProps) => {

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const city = formData.get("city") as string;

    try {
      const weather: Record<WeatherType, any> = await getWeatherByCity(city, ["weather", "forecast"]);
      handleCitySearch({
        type: "changeCurrent",
        payload: {
          city: city,
          weather: weather
        }
      });
    } catch (err) {
      // TODO!!
      // Need a good error component!
      // TODO!!
      // Need a good error component!
      // TODO!!
      // Need a good error component!
      // TODO!!
      // Need a good error component!
      // TODO!!
      // Need a good error component!
      // TODO!!
      // Need a good error component!
      // TODO!!
      // Need a good error component!
      console.log(err instanceof Error ? err.message : "Failed to fetch weather data.");
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <input className={styles.input} type="text" name="city" required />
      <SubmitFormButton
        className={globalStyles.buttonAccent}
      />
    </form>
  )
}
