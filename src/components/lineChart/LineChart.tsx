import { useEffect, useState } from "react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";

// types
import { ForecastCity, ForecastWeatherType } from "../../types/weatherTypes";
import { TemperatureData } from "../../types/commonTypes";

// utils
import { getTempDataFormattedCountry } from "../../lib/utils";


interface TemperatureTimeData extends TemperatureData {
  time: number;
  displayTime: string;
}

type TempTimeByCity = Record<string, TemperatureData[]>;

const getCountryCityKey = (city: ForecastCity) => {
  return `${city.name}, ${city.country}`
}

const getHourlyTemperatureData = (localCountry: string, forecast: ForecastWeatherType): TemperatureTimeData[] => {
  // The API returns 3 hour increments so 8 for
  // 24 hours
  return forecast.list.slice(0, 8).map(entry => ({
    time: entry.dt * 1000,
    displayTime: new Date(entry.dt * 1000).toLocaleString([], {
      month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true
    }),
    ...getTempDataFormattedCountry(entry.main.temp, localCountry)
  }));
};

interface LineChartProps {
  localCountry: string;
  currentCityForecast: ForecastWeatherType;
}

export const LineChartComponent = ({ localCountry, currentCityForecast }: LineChartProps) => {


  const [tempTimeDataByCity, setTempTimeDataByCity] = useState<TempTimeByCity>({});

  useEffect(() => {
    if (!currentCityForecast) {
      return;
    }
    const currentCityCountryKey = getCountryCityKey(currentCityForecast.city);

    setTempTimeDataByCity({
      ...tempTimeDataByCity,
      [currentCityCountryKey]: getHourlyTemperatureData(localCountry, currentCityForecast)
    })

  }, [localCountry, currentCityForecast]);


  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart>
        {/* X-Axis */}
        <XAxis
          dataKey="time"
          type="number"
          domain={['dataMin', 'dataMax']}
          tickFormatter={(tick) => new Date(tick).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        />
        {/* Y-Axis */}
        <YAxis />
        {/* Tooltip */}
        <Tooltip
          labelFormatter={(label) => new Date(label).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          formatter={(value) => `${value}°F`}
        />
        {/* Legend */}
        <Legend />
        {/* Lines for each city */}
        {Object.entries(tempTimeDataByCity).map(([city, tempTimeData], index: number) => {
          return (
            <Line
              key={index}
              type="monotone"
              data={tempTimeData}
              dataKey="temperature"
              name={city}
              stroke="#8884d8"
              dot={true}
            />
          )
        })}
      </LineChart>
    </ResponsiveContainer>
  );
}
