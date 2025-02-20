// types
import { Metric } from "../../types/commonTypes";

// layouts
import { WeatherDetailsBox } from "../weatherDetailsBox/WeatherDetailsBox"

// components
import { TempWeatherIcon } from "../thermoStatIcon/ThermoStatIcon";

// styles
import styles from './TemperatureMetric.module.scss';

interface TemperatureMetricProps {
  currentTemp: number;
  metrics: Metric[];
}

export const TemperatureMetric = ({ currentTemp, metrics }: TemperatureMetricProps) => {
  return (
    <WeatherDetailsBox
      title="Temperature Metrics"
      className={styles.temperatureMetrics}
      icon={(
        <TempWeatherIcon
          tempK={currentTemp}
        />
      )}
      metrics={metrics}
    />
  )
}
