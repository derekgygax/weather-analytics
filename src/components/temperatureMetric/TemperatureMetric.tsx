
// utils
import { getMeteoIconUrl, getTempValueString } from "../../lib/utils";

// redux
import { RootState } from "../../store/store";

// types
import { Metric } from "../../types/commonTypes";
import { TempHumidPressureType } from "../../types/weatherTypes";

// layouts
import { WeatherDetailsBox } from "../../layouts/weatherDetailsBox/WeatherDetailsBox"

// styles
import styles from './TemperatureMetric.module.scss';
import { useSelector } from "react-redux";

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
  tempHumidPressureInfo: TempHumidPressureType;
}

export const TemperatureMetric = ({ tempHumidPressureInfo }: TemperatureMetricProps) => {

  // redux
  const localCountry: string = useSelector((state: RootState) => {
    return state.weather.localCountry;
  });

  const humidity = tempHumidPressureInfo.humidity;

  const title = `${getHotRating(tempHumidPressureInfo.temp)} and ${tempHumidPressureInfo.humidity > 50 ? "Wet" : tempHumidPressureInfo.humidity > 25 ? "Moist" : "Dry"}`

  const metrics: Metric[] = [
    {
      label: "Temperature",
      value: getTempValueString(tempHumidPressureInfo.temp, localCountry)
    },
    {
      label: "Feels Like",
      value: getTempValueString(tempHumidPressureInfo.feels_like, localCountry)
    },
    {
      label: "High",
      value: getTempValueString(tempHumidPressureInfo.temp_max, localCountry)
    },
    {
      label: "Low",
      value: getTempValueString(tempHumidPressureInfo.temp_min, localCountry)
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
