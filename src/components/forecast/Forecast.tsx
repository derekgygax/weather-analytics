
import { useEffect, useState } from "react";

// types
import { WeatherState, ForecastCity, ForecastWeatherType, CityWeatherType } from '../../types/weatherTypes';
import { TempTimeByCity, TemperatureTimeData } from "../../types/temp";
import { AtmospherDateData } from "../../types/atmosphere";

// utils
import { capitalizeAsTitle, getTempDataFormattedCountry } from '../../lib/utils';

// reducer
import { WeatherReducerAction } from "../../reducers/WeatherReducer";

// layouts
import { Title } from '../../layouts/title/Title';

// components
import { LineChartComponent } from '../lineChartComponent/LineChartComponent';
import { BarChartComponent } from "../barChatComponent/BarChartComponent";
import { CityUpdater } from "../cityUpdater/CityUpdater";

// styles
import styles from './Forecast.module.scss';
import { CloudCoverageData, CloudCoverageDataByCity } from "../../types/cloudCoverage";
import { PieChartComponent } from "../pieChartComponent/PieChartComponent";

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

const getAtmosphericData = (forecast: ForecastWeatherType): AtmospherDateData[] => {
  // Extracts data for the next 5 days (API usually provides 3-hour intervals)
  const dailyData = forecast.list
    .filter((_, index) => index % 8 === 0) // Get roughly one entry per day (24h / 3h = 8)
    .slice(0, 5) // Limit to 5 days
    .map(entry => ({
      date: new Date(entry.dt * 1000).toLocaleDateString([], { month: 'short', day: '2-digit' }),
      rainProbability: entry.clouds.all, // Cloud % used as rain probability (adjust if API provides actual rain %)
      humidity: entry.main.humidity,
      windSpeed: entry.wind.speed,
    }));

  return dailyData;
};

const getCloudCoverageData = (forecast: ForecastWeatherType): CloudCoverageData[] => {
  const conditionCounts: Record<string, number> = {};

  forecast.list.forEach((entry) => {
    const condition = entry.weather[0].main; // Get main weather condition (e.g., "Clear", "Rain", "Clouds")
    conditionCounts[condition] = (conditionCounts[condition] || 0) + 1;
  });

  const totalHours = forecast.list.length;

  return Object.entries(conditionCounts).map(([condition, count]) => ({
    name: condition,
    value: Math.round((count / totalHours) * 100), // Convert to percentage
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
  const [atmosphereDataCurrentCity, setAtmosphereDataCurrentCity] = useState<AtmospherDateData[]>([]);
  const [cloudCoverageDataByCity, setCloudCoverageDataByCity] = useState<CloudCoverageDataByCity>({});

  const handleNewCityWeather = (newCityWeather: CityWeatherType) => {
    // add a new city to the graphs
    const cityCountryKey = getCountryCityKey(newCityWeather.forecast.city);
    setTempTimeDataByCity((prevState) => {
      return {
        ...prevState,
        [cityCountryKey]: getHourlyTemperatureData(localCountry, newCityWeather.forecast)
      }
    });
    setCloudCoverageDataByCity((prevState) => {
      return {
        ...prevState,
        [cityCountryKey]: getCloudCoverageData(newCityWeather.forecast)
      }
    });
  }

  useEffect(() => {
    if (!currentCityForecast) {
      return;
    }

    const currentCityCountryKey = getCountryCityKey(currentCityForecast.city);

    setTempTimeDataByCity({
      [currentCityCountryKey]: getHourlyTemperatureData(localCountry, currentCityForecast)
    });

    setAtmosphereDataCurrentCity(getAtmosphericData(currentCityForecast));

    setCloudCoverageDataByCity({
      [currentCityCountryKey]: getCloudCoverageData(currentCityForecast)
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
        <div className={styles.charts}>
          <LineChartComponent
            tempTimeDataByCity={tempTimeDataByCity}
          />
          <BarChartComponent
            atmosphereDataCurrentCity={atmosphereDataCurrentCity}
          />
          <PieChartComponent
            cloudCoverageDataByCity={cloudCoverageDataByCity}
          />
        </div>
        <CityUpdater
          title="Add Cities to the Graphs"
          handleNewCityWeather={handleNewCityWeather}
          currentCity={weatherState.selectedCityWeather?.city}
          searchHistory={weatherState.searchHistory}
          className={styles.cityUpdater}
        />
      </section>
    </>
  )
}
