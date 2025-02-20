
// utils
import { convertUnixToTime, convertUnixToTimeAtLocation, getMeteoIconUrl } from "../../lib/utils";

// components
import { WeatherDetailsBox } from "../weatherDetailsBox/WeatherDetailsBox";

// styles
import styles from './AtmosphericDetail.module.scss';

const getBrightnessThought = (sunrise: number, sunset: number) => {
  const now = Math.floor(Date.now() / 1000);
  if (now < sunrise || now > sunset) return "Night";
  return "Day";
};

const getWindyIdea = (wind: { deg: number; gust: number; speed: number }) => {
  if (wind.speed > 15) return "Windy";
  if (wind.speed > 5) return "Breezy";
  return "Calm";
};

const getAtmosphericMeteoIconName = (sunrise: number, sunset: number, wind: { deg: number; gust: number; speed: number }) => {
  const now = Math.floor(Date.now() / 1000);

  if (wind.speed > 20 || wind.gust > 25) return "wind-beaufort-10";
  if (wind.speed > 15 || wind.gust > 20) return "wind-beaufort-8";
  if (wind.speed > 10 || wind.gust > 15) return "wind-beaufort-5";
  if (wind.speed > 2 || wind.gust > 10) return "wind-beaufort-2";
  if (now < sunrise || now > sunset) return "clear-night";
  return "clear-day";
};


interface AtmosphericDetailProps {
  sunrise: number;
  sunset: number;
  timezoneOffset: number;
  wind: {
    deg: number;
    gust: number;
    speed: number;
  };
}

export const AtmosphericDetail = ({ sunrise, sunset, timezoneOffset, wind }: AtmosphericDetailProps) => {

  const title = `${getBrightnessThought(sunrise, sunset)} and ${getWindyIdea(wind)}`;

  return (
    <WeatherDetailsBox
      title={title}
      icon={(
        <img
          src={getMeteoIconUrl(getAtmosphericMeteoIconName(sunrise, sunset, wind))}
          alt="Weather Icon"
          className={styles.weatherIcon}
        />
      )}
      metrics={[
        {
          label: "Sunrise",
          value: timezoneOffset ? convertUnixToTimeAtLocation(sunrise, timezoneOffset) : convertUnixToTime(sunrise)
        },
        {
          label: "Sunset",
          value: timezoneOffset ? convertUnixToTimeAtLocation(sunset, timezoneOffset) : convertUnixToTime(sunset)
        },
        {
          label: "Wind Speed",
          value: `${wind.speed} m/s`
        },
        ...(wind.gust ? [{ label: "Gusts", value: `${wind.gust} m/s` }] : [])
      ]}
    />
  )
}
