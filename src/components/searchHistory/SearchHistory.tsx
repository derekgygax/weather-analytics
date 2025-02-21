
// styles
import { useRef } from 'react';
import styles from './SerachHistory.module.scss';

interface SearchHistoryProps {
  currentCity: string | undefined;
  searchHistory: string[];
  handleCityChange: (newCity: string) => Promise<boolean>;
}

export const SearchHistory = ({ currentCity, searchHistory, handleCityChange }: SearchHistoryProps) => {

  const selectorRef = useRef<HTMLSelectElement>(null);

  const handleCitySelectorChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const citySelected = event.target.value;
    if (citySelected === currentCity) {
      return;
    }

    // TODO!!
    // TODO!!
    // TODO!!
    // MAYBE YOU NEED TO PUT A ELSE IN HERE!!!
    // MAYBE YOU NEED TO PUT A ELSE IN HERE!!!
    // MAYBE YOU NEED TO PUT A ELSE IN HERE!!!
    // MAYBE YOU NEED TO PUT A ELSE IN HERE!!!
    const success: boolean = await handleCityChange(citySelected);
    if (success) {
      if (selectorRef.current) {
        selectorRef.current.value = "";
        selectorRef.current.blur();
      }
    }
  };

  return (
    <div>
      <h4>Search History</h4>
      <select
        ref={selectorRef}
        onChange={handleCitySelectorChange}
      >
        <option></option>
        {searchHistory.map((city: string, index: number) => {
          return (
            <option
              key={index}
              className={styles.li}
            >
              {city}
            </option>
          )
        })}
      </select>
    </div>
  )
}
