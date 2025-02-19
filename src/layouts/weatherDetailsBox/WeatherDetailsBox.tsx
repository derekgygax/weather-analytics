import classNames from "classnames";

// styles
import styles from './WeatherDetailsBox.module.scss';

interface WeatherDetailsBoxProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

export const WeatherDetailsBox = ({ title, className, children }: WeatherDetailsBoxProps) => {
  return (
    <div className={classNames(styles.weatherDetailsBox, className)}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
