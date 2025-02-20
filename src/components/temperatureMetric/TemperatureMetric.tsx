
// utils
import { getMeteoIconUrl } from "../../lib/utils";

// types
import { Metric } from "../../types/commonTypes";

// layouts
import { WeatherDetailsBox } from "../../layouts/weatherDetailsBox/WeatherDetailsBox"

// styles
import styles from './TemperatureMetric.module.scss';

const getTempMeteoIconName = (tempK: number) => {
  if (tempK <= 273) return "thermometer-colder";
  if (tempK <= 295) return "thermometer";
  return "thermometer-warmer";
};

const getHotRating = (tempK: number): string => {
  if (tempK >= 310) return "Scorching";
  if (tempK >= 303) return "Hot";
  if (tempK >= 293) return "Warm";
  if (tempK >= 283) return "Cool";
  if (tempK >= 273) return "Cold";
  return "Freezing";
};

interface TemperatureMetricProps {
  currentTemp: number;
  humidity: number;
  metrics: Metric[];
}

export const TemperatureMetric = ({ currentTemp, humidity, metrics }: TemperatureMetricProps) => {
  const title = `${getHotRating(currentTemp)} and ${humidity > 50 ? "Wet" : "Dry"}`
  return (
    <WeatherDetailsBox
      title={title}
      icon={(
        <img
          src={getMeteoIconUrl(getTempMeteoIconName(currentTemp))}
          alt="Thermometer Icon"
          className={styles.weatherIcon}
        />
      )}
      metrics={metrics}
    />
  )
}
