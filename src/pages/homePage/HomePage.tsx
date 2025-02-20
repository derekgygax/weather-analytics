
// types
import { WeatherState } from "../../types/weatherTypes";

// layouts
import { PageSection } from "../../layouts/pageSection/PageSection";

// components
import { CurrentWeather } from "../../components/currentWeather/CurrentWeather";

// styles
import styles from './HomePage.module.scss';
interface HomePageProps {
  weatherState: WeatherState;
}

export const HomePage = ({ weatherState }: HomePageProps) => {

  return (
    <main className={styles.main}>
      <PageSection>
        {weatherState.selectedCityWeather ? (
          <CurrentWeather
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
    </main>
  )
}
