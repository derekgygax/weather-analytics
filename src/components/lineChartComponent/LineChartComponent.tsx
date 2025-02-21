import React from "react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, LegendProps, TooltipProps } from "recharts";

// types
import { TempTimeByCity } from "../../types/temp";

// layouts
import { GridItem } from "../../layouts/gridItem/GridItem";

// styles
import chartStyles from '@/styles/chart.module.scss';
import { FAHRENHEIT_COUNTRIES } from "../../lib/utils";

interface LineChartComponentProps {
  tempTimeDataByCity: TempTimeByCity;
}

export const LineChartComponent = ({ tempTimeDataByCity }: LineChartComponentProps) => {
  return (
    <GridItem title="Temperature">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={400}
          margin={{
            right: 50
          }}>
          <XAxis
            dataKey="time"
            type="number"
            domain={['dataMin', 'dataMax']}
            tickFormatter={(tick) => new Date(tick).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
          {/* Lines for each city */}
          {Object.entries(tempTimeDataByCity).map(([city, tempTimeData], index: number) => {
            return (
              <Line
                key={index}
                type="monotone"
                data={tempTimeData}
                dataKey="temperature"
                name={city}
                stroke={index === 2 ? "#654ea3" : index === 1 ? "#00a8e8" : "#ffb703"}
                dot={true}
              />
            )
          })}
        </LineChart>
      </ResponsiveContainer>
    </GridItem>
  );
}

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className={chartStyles.tooltip} style={{ borderColor: "grey" }} role="tooltip">
      {payload.map((cityData, index) => {
        const country = cityData?.payload.country ?? undefined;
        const cityName = cityData?.name ?? "Unknown City";
        const value = cityData?.value ?? 0;
        const color = cityData?.color ?? "#8884d8";
        return (
          <React.Fragment key={index}>
            <h3 className={chartStyles.cityName}>{cityName}</h3>
            <p className={chartStyles.data}>
              <span className={chartStyles.weatherType}>Temp: </span>
              <span className={chartStyles.value} style={{ color }}>{`${value}${FAHRENHEIT_COUNTRIES.includes(country) ? "°F" : "°C"}`}</span>
            </p>
          </React.Fragment>
        )
      })}
    </div>
  );
};

const CustomLegend = ({ payload }: LegendProps) => {
  if (!payload) return null;

  // Extract unique weather types from payload
  const uniqueWeatherTypes = Array.from(
    new Set(payload.map((entry) => entry.value))
  );

  return (
    <ul className={chartStyles.customLegend}>
      {uniqueWeatherTypes.map((weatherType, index) => {
        const color = payload.find((entry) => entry.value === weatherType)
          ?.color;

        return (
          <li key={index} className={chartStyles.customLegend__li}>
            <span
              className={chartStyles.customLegend__li__span}
              style={{
                backgroundColor: color || "#8884d8",
              }}
            />
            {weatherType}
          </li>
        );
      })}
    </ul>
  );
};