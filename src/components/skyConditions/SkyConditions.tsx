
// utils
import { capitalizeAsTitle, getMeteoIconUrl } from "../../lib/utils";

// layouts
import { WeatherDetailsBox } from "../weatherDetailsBox/WeatherDetailsBox"

// styles
import styles from './SkyConditions.module.scss';

const getSkyMeteoIconName = (isNight: boolean, conditions: { main: string }) => {
  if (conditions.main === "Clear") return isNight ? "clear-night" : 'clear-day';
  if (conditions.main === "Clouds") return "cloudy";
  if (conditions.main === "Rain") return "overcast-rain";
  if (conditions.main === "Drizzle") return "overcast-drizzle";
  if (conditions.main === "Thunderstorm") return "thunderstorms";
  if (conditions.main === "Snow") return "snow";
  if (conditions.main === "Mist") return "mist";
  if (conditions.main === "Haze") return "haze";
  if (conditions.main === "Fog") return "fog";
  if (conditions.main === "Dust") return "dust";
  if (conditions.main === "Sand") return "dust-wind";
  if (conditions.main === "Ash") return "smoke";
  if (conditions.main === "Squall") return "wind";
  if (conditions.main === "Tornado") return "tornado";
  return "unknown";
};


interface SkyConditionsProps {
  isNight: boolean;
  conditions: {
    main: string;
    description: string;
    icon: string;
  } | undefined;
}

export const SkyConditions = ({ isNight, conditions }: SkyConditionsProps) => {
  if (conditions) {
    return (
      <WeatherDetailsBox
        title={conditions?.main}
        icon={(
          <img
            // src={getWeatherIconUrl(conditions?.icon)}
            src={getMeteoIconUrl(getSkyMeteoIconName(isNight, conditions))}
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
