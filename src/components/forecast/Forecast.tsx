
import { useEffect, useState } from "react";

// types
import { WeatherState, ForecastCity, ForecastWeatherType, CityWeatherType } from '../../types/weatherTypes';
import { TempTimeByCity, TemperatureTimeData } from "../../types/temp";
import { RainData, RainDataByCity } from "../../types/rain";

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
  return forecast.list.map(entry => ({
    time: entry.dt * 1000,
    displayTime: new Date(entry.dt * 1000).toLocaleString([], {
      month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true
    }),
    ...getTempDataFormattedCountry(entry.main.temp, localCountry)
  }));
};

const getRainProbabilityData = (forecast: ForecastWeatherType): RainData[] => {
  const dailyData: Record<string, number[]> = {};

  forecast.list.forEach(entry => {
    const date = new Date(entry.dt * 1000).toLocaleDateString([], { month: 'short', day: '2-digit' });

    if (!dailyData[date]) {
      dailyData[date] = [];
    }
    dailyData[date].push(entry.clouds.all);
  });

  return Object.entries(dailyData).map(([date, probabilities]) => ({
    date,
    probability: Math.round(
      probabilities.reduce((sum, value) => sum + value, 0) / probabilities.length
    ),
  }));
};

const getCloudCoverageData = (forecast: ForecastWeatherType): CloudCoverageData[] => {
  const conditionCounts: Record<string, number> = {};

  forecast.list.forEach((entry) => {
    const condition = entry.weather[0].main;
    conditionCounts[condition] = (conditionCounts[condition] || 0) + 1;
  });

  const totalHours = forecast.list.length;

  return Object.entries(conditionCounts).map(([condition, count]) => ({
    city: forecast.city.name,
    name: condition,
    value: Math.round((count / totalHours) * 100),
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
  const [rainDataByCity, setRainDataByCity] = useState<RainDataByCity>({});
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
    setRainDataByCity((prevState) => {
      return {
        ...prevState,
        [cityCountryKey]: getRainProbabilityData(newCityWeather.forecast)
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

    setRainDataByCity({
      [currentCityCountryKey]: getRainProbabilityData(currentCityForecast)
    });

    setCloudCoverageDataByCity({
      [currentCityCountryKey]: getCloudCoverageData(currentCityForecast)
    })


  }, [localCountry, currentCityForecast]);

  return (
    <>
      <Title
        level={1}
        // This MAY get a variable so we leave capitalizeAsTitle
        title={capitalizeAsTitle("5 Day Forecast")}
        className={styles.forecastTitle}
      />
      <section className={styles.chartsContainer}>
        <div className={styles.charts}>
          <LineChartComponent
            tempTimeDataByCity={tempTimeDataByCity}
          />
          <BarChartComponent
            rainDataByCity={rainDataByCity}
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
