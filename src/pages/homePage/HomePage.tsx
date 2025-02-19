
// types
import { Weather } from "../../types/weatherTypes";

// layouts
import { PageSection } from "../../layouts/pageSection/PageSection";

// components
import { CurrentWeather } from "../../components/currentWeather/CurrentWeather";

// styles
import styles from './HomePage.module.scss';
interface HomePageProps {
  weather: Weather;
}

export const HomePage = ({ weather }: HomePageProps) => {

  return (
    <main>
      <PageSection>
        {weather.current ? (
          <CurrentWeather
            city={weather.current.city}
            weather={weather.current.data}
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
