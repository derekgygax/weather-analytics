import { useEffect, useState } from "react";

// types
import { ForecastWeatherType } from "../../types/weatherTypes";

interface TemperatureData {
  time: string;
  temperature: number;
}

const getHourlyTemperatureData = (forecast: ForecastWeatherType): TemperatureData[] => {
  return forecast.list.slice(0, 24).map(entry => ({
    time: new Date(entry.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    temperature: entry.main.temp,
  }));
};

interface LineChartProps {
  currentCityForecast: ForecastWeatherType;
}

export const LineChart = ({ currentCityForecast }: LineChartProps) => {
  console.log(currentCityForecast);
  const [curentCityHourlyTemp, setCurentCityHourlyTemp] = useState<TemperatureData[] | undefined>();

  useEffect(() => {
    const currentCityHourlyTempData: TemperatureData[] = getHourlyTemperatureData(currentCityForecast);
    setCurentCityHourlyTemp(currentCityHourlyTempData);
  }, [currentCityForecast]);

  console.log(curentCityHourlyTemp);
  return (
    <h1>Line Chart</h1>
  )
}
