
// utils
import { getMeteoIconUrl, getTempValueString } from "../../lib/utils";

// types
import { Metric } from "../../types/commonTypes";
import { TempHumidPressureType } from "../../types/weatherTypes";

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
  country: string;
  tempHumidPressureInfo: TempHumidPressureType;
}

export const TemperatureMetric = ({ country, tempHumidPressureInfo }: TemperatureMetricProps) => {
  const humidity = tempHumidPressureInfo.humidity;

  const title = `${getHotRating(tempHumidPressureInfo.temp)} and ${tempHumidPressureInfo.humidity > 50 ? "Wet" : tempHumidPressureInfo.humidity > 25 ? "Moist" : "Dry"}`

  const metrics: Metric[] = [
    {
      label: "Temperature",
      value: getTempValueString(tempHumidPressureInfo.temp, country)
    },
    {
      label: "Feels Like",
      value: getTempValueString(tempHumidPressureInfo.feels_like, country)
    },
    {
      label: "High",
      value: getTempValueString(tempHumidPressureInfo.temp_max, country)
    },
    {
      label: "Low",
      value: getTempValueString(tempHumidPressureInfo.temp_min, country)
    },
    {
      label: "Humidity",
      value: `${humidity}%`
    }
  ];

  return (
    <WeatherDetailsBox
      title={title}
      icon={(
        <img
          src={getMeteoIconUrl(getTempMeteoIconName(tempHumidPressureInfo.temp))}
          alt="Thermometer Icon"
          className={styles.weatherIcon}
        />
      )}
      metrics={metrics}
    />
  )
}
