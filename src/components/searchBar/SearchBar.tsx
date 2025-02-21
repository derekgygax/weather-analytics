import classNames from "classnames";
import { useRef, useState } from "react";

import { SubmitFormButton } from "../submitFormButton/SubmitFormButton"
import { Icon } from "../icon/Icon";

// styles
import styles from './SearchBar.module.scss';
import globalStyles from '@/styles/globals.module.scss';

interface SearchBarProps {
  isCityWeatherLoading: boolean;
  className?: string;
  handleCityChange: (newCity: string) => Promise<boolean>;
}

export const SearchBar = ({ isCityWeatherLoading, className, handleCityChange }: SearchBarProps) => {

  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<boolean>(false);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const city = formData.get("city") as string;
    const completed: boolean = await handleCityChange(city);
    console.log(completed);
    if (completed) {
      formRef.current?.reset();
      // Shouldn't ever need this but we are a little stitious
      setError(false);
    } else {
      setError(true);
    }
  }

  return (
    <form className={classNames(styles.form, className)} ref={formRef} onSubmit={handleFormSubmit}>
      <div className={styles.formElements}>
        <input
          className={classNames(
            styles.input,
            error ? styles.error : ""
          )}
          type="text"
          name="city"
          placeholder="Enter City Name"
          onClick={() => {
            setError(false);
          }}
          onChange={() => {
            setError(false);
          }}
          required
        />
        <SubmitFormButton
          className={globalStyles.buttonAccent}
          text="Search"
          icon={
            <div className={styles.searchIcon}>
              <Icon id="search" alt="search" tooltip="Search" />
            </div>
          }
          disabled={isCityWeatherLoading}
        />
      </div>
    </form>
  )
}
