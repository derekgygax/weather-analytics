import React from "react";

// types
import { Metric } from "../../types/commonTypes";

// layouts
import { WeatherDetailsBox } from "../../layouts/weatherDetailsBox/WeatherDetailsBox"

// compone

// styles
import styles from './TemperatureMetric.module.scss';
import { TempWeatherIcon } from "../thermoStatIcon/ThermoStatIcon";

interface TemperatureMetricProps {
  currentTemp: number;
  metrics: Metric[];
}

export const TemperatureMetric = ({ currentTemp, metrics }: TemperatureMetricProps) => {
  return (
    <WeatherDetailsBox
      title="Temperature Metrics"
      className={styles.temperatureMetrics}
    >
      <TempWeatherIcon
        tempK={currentTemp}
      />
      <dl className={styles.metricList}>
        {metrics.map((metric, index) => {
          return (
            <React.Fragment key={index}>
              <dt className={styles.metricLabel}>{metric.label}</dt>
              <dd className={styles.metricValue}>{metric.value}</dd>
            </React.Fragment>
          )
        })}
      </dl>
    </WeatherDetailsBox>
  )
}
