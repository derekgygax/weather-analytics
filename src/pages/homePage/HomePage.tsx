
import { useSelector } from "react-redux";

// redux
import { RootState } from "../../store/store";
import { WeatherState } from "../../store/weather-slice";

// layouts
import { PageSection } from "../../layouts/pageSection/PageSection";

// components
import { CurrentWeather } from "../../components/currentWeather/CurrentWeather";
import { Forecast } from "../../components/forecast/Forecast";

// styles
import styles from './HomePage.module.scss';

export const HomePage = () => {

  const weatherState: WeatherState = useSelector((state: RootState) => {
    return state.weather;
  });

  return (
    <main className={styles.main}>
      {weatherState.selectedCityWeather ? (
        <>
          <PageSection>
            <CurrentWeather />
          </PageSection>
          <PageSection>
            <Forecast />
          </PageSection>
        </>
      ) : (
        <>
          <h1 className={styles.noCurrent}>Unable to Load Your Current Location</h1>
          <h2 className={styles.noCurrent}>Please search for a city to view its weather data</h2>
        </>
      )}
    </main>
  )
}
