
// types
import { ForecastWeatherType, WeatherState } from '../../types/weatherTypes';

// utils
import { capitalizeAsTitle } from '../../lib/utils';

// reducer
import { WeatherReducerAction } from "../../reducers/WeatherReducer";

// layouts
import { Title } from '../../layouts/title/Title';

// styles
import styles from './Forecast.module.scss';
import { LineChart } from '../lineChart/LineChart';

interface ForecastProps {
  weatherState: WeatherState;
  weatherDispatcher: React.Dispatch<WeatherReducerAction>;
  setIsCityWeatherLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Forecast = ({ weatherState, weatherDispatcher, setIsCityWeatherLoading }: ForecastProps) => {
  return (
    <>
      <Title
        level={1}
        // This MAY get a variable so we leave capitalizeAsTitle
        title={capitalizeAsTitle("Forecast")}
        className={styles.forecastTitle}
      />
      {/* TODO FX THIS!!!!
      THE ERROR CATCHING!! */}
      {weatherState.selectedCityWeather ? (
        <section className={styles.chartsContainer}>
          <LineChart
            currentCityForecast={weatherState.selectedCityWeather.data.forecast}
          />
        </section>
      ) : (
        // TODO FIXXX
        <h1>WHAT!!! FIX!!</h1>
      )}
    </>
  )
}
