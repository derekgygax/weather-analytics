
// types
import { CityWeatherType } from '../../types/weatherTypes';

// utils
import { getWeatherByCity } from '../../lib/weatherApi';

// reducer
import { WeatherReducerAction } from "../../reducers/WeatherReducer";

// styles
import styles from './SerachHistory.module.scss';

interface SearchHistoryProps {
  currentCity: string | undefined;
  weatherDispatcher: React.Dispatch<WeatherReducerAction>;
  setIsCityWeatherLoading: React.Dispatch<React.SetStateAction<boolean>>;
  searchHistory: string[];
}

export const SearchHistory = ({ currentCity, searchHistory, weatherDispatcher, setIsCityWeatherLoading }: SearchHistoryProps) => {

  // we keep it just as history here in case we 
  //  want history as an object later. easier to change
  const handleHistoryClick = async (history: string) => {
    if (history === currentCity) {
      return;
    }
    setIsCityWeatherLoading(true);
    try {
      const cityWeather: CityWeatherType = await getWeatherByCity(history);

      weatherDispatcher({
        type: "changeCurrentCity",
        payload: {
          city: history,
          data: cityWeather
        }
      });
      setIsCityWeatherLoading(false);
    } catch (err) {
      setIsCityWeatherLoading(false);
      console.error(err);
    }
  };

  return (
    <section>
      <ul className={styles.ul}>
        {searchHistory.map((history: string, index: number) => {
          return (
            <li
              key={index}
              className={styles.li}
              onClick={() => {
                handleHistoryClick(history)
              }}
            >
              {history}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
