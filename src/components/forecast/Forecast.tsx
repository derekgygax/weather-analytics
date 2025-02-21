
import { useEffect, useState } from "react";

// types
import { WeatherState, ForecastCity, ForecastWeatherType, CityWeatherType } from '../../types/weatherTypes';
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

  const localCountry: string = weatherState.localCountry;
  const currentCityForecast: ForecastWeatherType | undefined = weatherState.selectedCityWeather?.data.forecast;

  const [tempTimeDataByCity, setTempTimeDataByCity] = useState<TempTimeByCity>({});

  const handleNewCityWeather = (newCityWeather: CityWeatherType) => {
    // add a new city to the graphs
    const cityCountryKey = getCountryCityKey(newCityWeather.forecast.city);
    setTempTimeDataByCity((prevState) => {
      return {
        ...prevState,
        [cityCountryKey]: getHourlyTemperatureData(localCountry, newCityWeather.forecast)
      }
    })
  }

  useEffect(() => {
    if (!currentCityForecast) {
      return;
    }

    const currentCityCountryKey = getCountryCityKey(currentCityForecast.city);

    setTempTimeDataByCity({
      [currentCityCountryKey]: getHourlyTemperatureData(localCountry, currentCityForecast)
    });


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
        <CityUpdater
          title="Add Cities to the Graphs"
          handleNewCityWeather={handleNewCityWeather}
          currentCity={weatherState.selectedCityWeather?.city}
          searchHistory={weatherState.searchHistory}
        />
      </section>
    </>
  )
}
