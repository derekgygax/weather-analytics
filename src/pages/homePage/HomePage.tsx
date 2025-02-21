
// types
import { WeatherState } from "../../types/weatherTypes";

// layouts
import { PageSection } from "../../layouts/pageSection/PageSection";

// reducer
import { WeatherReducerAction } from "../../reducers/WeatherReducer";

// components
import { CurrentWeather } from "../../components/currentWeather/CurrentWeather";
import { Forecast } from "../../components/forecast/Forecast";

// styles
import styles from './HomePage.module.scss';

interface HomePageProps {
  weatherState: WeatherState;
  weatherDispatcher: React.Dispatch<WeatherReducerAction>;
  setIsCityWeatherLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HomePage = ({ weatherState, weatherDispatcher, setIsCityWeatherLoading }: HomePageProps) => {

  return (
    <main className={styles.main}>
      <PageSection>
        {weatherState.selectedCityWeather ? (
          <CurrentWeather
            localCountry={weatherState.localCountry}
            city={weatherState.selectedCityWeather.city}
            currentWeather={weatherState.selectedCityWeather.data.current}
          />
        ) : (
          // TODO MAKE THIS BETTER
          <>
            <h1 className={styles.noCurrent}>The Current Location Did Not Load</h1>
            <h2 className={styles.noCurrent}>Please Search</h2>
          </>
        )}
      </PageSection>
      <PageSection>
        {weatherState.selectedCityWeather ? (
          <Forecast
            weatherState={weatherState}
            weatherDispatcher={weatherDispatcher}
            setIsCityWeatherLoading={setIsCityWeatherLoading}
          />
        ) : (
          // TODO MAKE THIS BETTER
          <>
            <h1 className={styles.noCurrent}>The Current Location Did Not Load</h1>
            <h2 className={styles.noCurrent}>Please Search</h2>
          </>
        )}
      </PageSection>

    </main>
  )
}
