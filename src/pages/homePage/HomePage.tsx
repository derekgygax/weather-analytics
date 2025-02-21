
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
}

export const HomePage = ({ weatherState, weatherDispatcher }: HomePageProps) => {

  return (
    <main className={styles.main}>
      {weatherState.selectedCityWeather ? (
        <>
          <PageSection>
            <CurrentWeather
              localCountry={weatherState.localCountry}
              city={weatherState.selectedCityWeather.city}
              currentWeather={weatherState.selectedCityWeather.data.current}
            />
          </PageSection>
          <PageSection>
            <Forecast
              weatherState={weatherState}
              weatherDispatcher={weatherDispatcher}
            />
          </PageSection>
        </>
      ) : (
        // TODO MAKE THIS BETTER
        <>
          <h1 className={styles.noCurrent}>The Current Location Did Not Load</h1>
          <h2 className={styles.noCurrent}>Please Search</h2>
        </>
      )}
    </main>
  )
}
