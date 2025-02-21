import classNames from 'classnames';
import { useRef, useState } from 'react';

// styles
import styles from './SerachHistory.module.scss';

interface SearchHistoryProps {
  currentCity: string | undefined;
  searchHistory: string[];
  handleCityChange: (newCity: string) => Promise<boolean>;
}

export const SearchHistory = ({ currentCity, searchHistory, handleCityChange }: SearchHistoryProps) => {

  const selectorRef = useRef<HTMLSelectElement>(null);
  const [error, setError] = useState<boolean>(false);

  const handleCitySelectorChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectorRef.current) {
      selectorRef.current.blur();
    }

    const citySelected = event.target.value;
    if (citySelected === currentCity) {
      return;
    }

    const success: boolean = await handleCityChange(citySelected);
    if (success) {
      setError(false);
      if (selectorRef.current) {
        selectorRef.current.value = "";
      }
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <h4>Search History</h4>
      <select
        ref={selectorRef}
        onChange={handleCitySelectorChange}
        className={classNames(
          styles.select,
          error ? styles.error : ""
        )}
        onClick={() => {
          setError(false);
        }}
      >
        <option></option>
        {searchHistory.map((city: string, index: number) => {
          return (
            <option
              key={index}
              className={styles.select__options}
            >
              {city}
            </option>
          )
        })}
      </select>
    </div>
  )
}
