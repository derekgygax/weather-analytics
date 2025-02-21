
import { useEffect, useState } from "react";

// types
import { WeatherState, ForecastCity, ForecastWeatherType } from '../../types/weatherTypes';
import { TempTimeByCity, TemperatureTimeData } from "../../types/temp";

// utils
import { capitalizeAsTitle, getTempDataFormattedCountry } from '../../lib/utils';

// reducer
import { WeatherReducerAction } from "../../reducers/WeatherReducer";

// layouts
import { Title } from '../../layouts/title/Title';

// components
import { LineChartComponent } from '../lineChart/LineChart';

// styles
import styles from './Forecast.module.scss';
import { CityUpdater } from "../cityUpdater/CityUpdater";

const getCountryCityKey = (city: ForecastCity) => {
  return `${city.name}, ${city.country}`
}

const getHourlyTemperatureData = (localCountry: string, forecast: ForecastWeatherType): TemperatureTimeData[] => {
  // The API returns 3 hour increments so 8 for
  // 24 hours
  return forecast.list.slice(0, 8).map(entry => ({
    time: entry.dt * 1000,
    displayTime: new Date(entry.dt * 1000).toLocaleString([], {
      month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true
    }),
    ...getTempDataFormattedCountry(entry.main.temp, localCountry)
  }));
};



interface ForecastProps {
  weatherState: WeatherState;
  weatherDispatcher: React.Dispatch<WeatherReducerAction>;
}

export const Forecast = ({ weatherState }: ForecastProps) => {

  const localCountry = weatherState.localCountry;
  const currentCityForecast = weatherState.selectedCityWeather?.data.forecast;

  const [tempTimeDataByCity, setTempTimeDataByCity] = useState<TempTimeByCity>({});

  useEffect(() => {
    if (!currentCityForecast) {
      return;
    }
    const currentCityCountryKey = getCountryCityKey(currentCityForecast.city);

    setTempTimeDataByCity({
      ...tempTimeDataByCity,
      [currentCityCountryKey]: getHourlyTemperatureData(localCountry, currentCityForecast)
    })

  }, [localCountry, currentCityForecast]);

  return (
    <>
      <Title
        level={1}
        // This MAY get a variable so we leave capitalizeAsTitle
        title={capitalizeAsTitle("Forecast")}
        className={styles.forecastTitle}
      />
      <section className={styles.chartsContainer}>
        <LineChartComponent
          tempTimeDataByCity={tempTimeDataByCity}
        />
      </section>
      <section>
        {/* <CityUpdater /> */}
      </section>
    </>
  )
}
