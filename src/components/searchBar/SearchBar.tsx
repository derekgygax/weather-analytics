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
  classNameSearchBarInput?: string;
  setParentErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchBar = ({ isCityWeatherLoading, className, handleCityChange, classNameSearchBarInput, setParentErrorMessage }: SearchBarProps) => {

  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<boolean>(false);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const city = formData.get("city") as string;
    const completed: boolean = await handleCityChange(city);
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
            classNameSearchBarInput,
            error ? styles.error : ""
          )}
          type="text"
          name="city"
          placeholder="Enter City Name"
          onClick={() => {
            setError(false);
            // I do not like that this is here like this
            // BUT for now it will do
            setParentErrorMessage("");
          }}
          onChange={() => {
            setError(false);
            // I do not like that this is here like this
            // BUT for now it will do
            setParentErrorMessage("");
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
