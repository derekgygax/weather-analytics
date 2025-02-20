
// utils
import { capitalizeAsTitle, getMeteoIconUrl } from "../../lib/utils";

// layouts
import { WeatherDetailsBox } from "../../layouts/weatherDetailsBox/WeatherDetailsBox"

// styles
import styles from './SkyConditions.module.scss';
import { SkyType } from "../../types/weatherTypes";

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
  skyConditions: SkyType
}

export const SkyConditions = ({ isNight, skyConditions }: SkyConditionsProps) => {
  return (
    <WeatherDetailsBox
      title={skyConditions.main}
      icon={(
        <img
          // src={getWeatherIconUrl(conditions?.icon)}
          src={getMeteoIconUrl(getSkyMeteoIconName(isNight, skyConditions))}
          alt="Weather Icon"
          className={styles.weatherIcon}
        />
      )}
      metrics={[]}
    >
      <h4>{capitalizeAsTitle(skyConditions.description)}</h4>
    </WeatherDetailsBox>
  )
}
