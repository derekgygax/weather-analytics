
// utils
import { getWeatherIconUrl, capitalizeAsTitle } from "../../lib/utils";

// layouts
import { WeatherDetailsBox } from "../weatherDetailsBox/WeatherDetailsBox"

// styles
import styles from './SkyConditions.module.scss';

interface SkyConditionsProps {
  conditions: {
    main: string;
    description: string;
    icon: string;
  } | undefined;
}

export const SkyConditions = ({ conditions }: SkyConditionsProps) => {
  if (conditions) {
    return (
      <WeatherDetailsBox
        title={conditions?.main}
        icon={(
          <img
            src={getWeatherIconUrl(conditions?.icon)}
            alt="Weather Icon"
            className={styles.weatherIcon}
          />
        )}
        metrics={[]}
      >
        <h4>{capitalizeAsTitle(conditions.description)}</h4>
      </WeatherDetailsBox>
    )
  }
}
