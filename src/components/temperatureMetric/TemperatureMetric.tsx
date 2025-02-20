import ThermostatIcon from "@mui/icons-material/DeviceThermostat";

// types
import { Metric } from "../../types/commonTypes";

// layouts
import { WeatherDetailsBox } from "../weatherDetailsBox/WeatherDetailsBox"

interface TemperatureMetricProps {
  currentTemp: number;
  humidity: number;
  metrics: Metric[];
}

const getTempColor = (tempK: number) => {
  if (tempK <= 260) return "#00f";
  if (tempK <= 273) return "#3399ff";
  if (tempK <= 288) return "#66ccff";
  if (tempK <= 295) return "#ffcc00";
  if (tempK <= 310) return "#ff5733";
  return "#ff0000";
};

const getHotRating = (tempK: number): string => {
  if (tempK >= 310) return "Scorching";
  if (tempK >= 303) return "Hot";
  if (tempK >= 293) return "Warm";
  if (tempK >= 283) return "Cool";
  if (tempK >= 273) return "Cold";
  return "Freezing";
};

export const TemperatureMetric = ({ currentTemp, humidity, metrics }: TemperatureMetricProps) => {
  const title = `${getHotRating(currentTemp)} and ${humidity > 50 ? "Wet" : "Dry"}`
  return (
    <WeatherDetailsBox
      title={title}
      icon={(
        <ThermostatIcon style={{ fontSize: "2rem", color: getTempColor(currentTemp) }} />
      )}
      metrics={metrics}
    />
  )
}
