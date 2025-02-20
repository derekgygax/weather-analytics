import React from "react";
import classNames from "classnames";

// types
import { Metric } from "../../types/commonTypes";

// styles
import styles from './WeatherDetailsBox.module.scss';

interface WeatherDetailsBoxProps {
  title: string;
  className?: string;
  icon?: React.ReactNode;
  metrics: Metric[];
}

export const WeatherDetailsBox = ({ title, className, icon, metrics }: WeatherDetailsBoxProps) => {
  return (
    <div className={classNames(styles.weatherDetailsBox, className)}>
      <h2 className={styles.title}>{title}</h2>
      {icon}
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
    </div>
  );
};
