
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Tab, Tabs, Box } from "@mui/material";

// redux
import { RootState } from "../../store/store";
import { WeatherState, CityWeatherType } from "../../store/weather-slice";

// types
import { ForecastCity, ForecastWeatherType } from '../../types/weatherTypes';
import { TempTimeByCity, TemperatureTimeData } from "../../types/temp";
import { RainData, RainDataByCity } from "../../types/rain";

// utils
import { capitalizeAsTitle, getTempDataFormattedCountry } from '../../lib/utils';

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

export const Forecast = () => {

  const { localCountry, selectedCityWeather } = useSelector((state: RootState) => {
    return state.weather;
  });

  // TODO this is written poorly with repetition
  // AND
  // You have set this so NO more than 3 citites can exist on a graph
  // at the same time. That is fine and desired BUT you need
  // to show that is clear only handle it once

  const currentCityForecast: ForecastWeatherType | undefined = selectedCityWeather?.data.forecast;

  const [activeTab, setActiveTab] = useState(0);
  const [currentCityCountryKey, setCurrentCityCountryKey] = useState<string>("");
  const [tempTimeDataByCity, setTempTimeDataByCity] = useState<TempTimeByCity>({});
  const [rainDataByCity, setRainDataByCity] = useState<RainDataByCity>({});
  const [cloudCoverageDataByCity, setCloudCoverageDataByCity] = useState<CloudCoverageDataByCity>({});

  // add a new city to the graphs
  const handleNewCityWeather = (newCityWeather: CityWeatherType) => {
    const cityCountryKey = getCountryCityKey(newCityWeather.forecast.city);
    setTempTimeDataByCity((prevState) => {
      if (Object.keys(prevState).length === 3) {
        const cities = Object.keys(prevState);
        const cityToRemove = cities.find((city) => city !== currentCityCountryKey) || cities[0];

        const { [cityToRemove]: _, ...remainingCities } = prevState;

        return {
          ...remainingCities,
          [cityCountryKey]: getHourlyTemperatureData(localCountry, newCityWeather.forecast),
        };
      }

      return {
        ...prevState,
        [cityCountryKey]: getHourlyTemperatureData(localCountry, newCityWeather.forecast),
      };
    });

    setRainDataByCity((prevState) => {
      if (Object.values(prevState).length === 3) {
        const cities = Object.keys(prevState);
        const cityToRemove = cities.find((city) => city !== currentCityCountryKey) || cities[0];
        const { [cityToRemove]: _, ...remainingCities } = prevState;

        return {
          ...remainingCities,
          [cityCountryKey]: getRainProbabilityData(newCityWeather.forecast),
        };
      }
      return {
        ...prevState,
        [cityCountryKey]: getRainProbabilityData(newCityWeather.forecast)
      }
    });
    setCloudCoverageDataByCity((prevState) => {
      if (Object.values(prevState).length === 3) {
        const cities = Object.keys(prevState);
        const cityToRemove = cities.find((city) => city !== currentCityCountryKey) || cities[0];
        const { [cityToRemove]: _, ...remainingCities } = prevState;

        return {
          ...remainingCities,
          [cityCountryKey]: getCloudCoverageData(newCityWeather.forecast),
        };
      }
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

    setCurrentCityCountryKey(currentCityCountryKey);

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
      <section>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 2 }}>
          <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)} aria-label="forecast chart tabs">
            <Tab label="Temperature" className={styles.tab} />
            <Tab label="Precipitation" className={styles.tab} />
            <Tab label="Sky Coverage" className={styles.tab} />
          </Tabs>
        </Box>
        <div className={styles.charts}>
          {activeTab === 0 && (
            <LineChartComponent
              tempTimeDataByCity={tempTimeDataByCity}
              localCountry={localCountry}
            />
          )}
          {activeTab === 1 && (
            <BarChartComponent
              rainDataByCity={rainDataByCity}
            />
          )}
          {activeTab === 2 && (
            <PieChartComponent
              cloudCoverageDataByCity={cloudCoverageDataByCity}
            />
          )}
        </div>
        <CityUpdater
          title="Add Cities for Comparison"
          handleNewCityWeather={handleNewCityWeather}
          className={styles.cityUpdater}
          classNameSearchBarInput={styles.searchBarInput}
        />
      </section >
    </>
  )
}
