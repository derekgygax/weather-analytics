

import { PieChart, Pie, ResponsiveContainer, Tooltip, Legend, Cell, LegendProps, TooltipProps } from "recharts";

// types
import { CloudCoverageDataByCity } from "../../types/cloudCoverage"

// layouts
import { GridItem } from "../../layouts/gridItem/GridItem";

// styles
import chartStyles from '@/styles/chart.module.scss';

const colorMap: Record<string, string> = {
  Clouds: "#00a8e8",  // Brighter aqua blue 
  Clear: "#00C49F",   // Teal
  Rain: "#FFBB28",    // Yellow-Orange
  Snow: "#A0E0FF",    // Light Blue
  Thunderstorm: "#654ea3", // Dark Purple
  Drizzle: "#6FA3EF",  // Light Blueish
  Mist: "#BEBEBE",    // Light Gray
  Smoke: "#6E6E6E",   // Dark Gray
  Haze: "#C0C0C0",    // Silver
  Dust: "#E1A95F",    // Sand/Dust Brown
  Fog: "#D3D3D3",     // Light Gray
  Sand: "#C2B280",    // Desert Sand
  Ash: "#4F4F4F",     // Dark Ash Gray
  Squall: "#4682B4",  // Steel Blue
  Tornado: "#800000", // Maroon (Warning)
};

interface PieChartComponentProps {
  cloudCoverageDataByCity: CloudCoverageDataByCity;
}

export const PieChartComponent = ({ cloudCoverageDataByCity }: PieChartComponentProps) => {
  return (
    <GridItem title="Sky Coverage">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart
        >
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
          {Object.entries(cloudCoverageDataByCity).map(([_, cloudData], index, array) => (
            <Pie
              key={index}
              data={cloudData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={index * 20 + 20}
              outerRadius={index * 20 + 40}
              label={index === array.length - 1 ? ({ value }) => `${value}%` : undefined}
            >
              {cloudData.map((entry, i) => (
                <Cell key={`cell-${i}`} fill={colorMap[entry.name] || "#8884d8"} />
              ))}
            </Pie>
          ))}
        </PieChart>
      </ResponsiveContainer>
    </GridItem>
  );
};

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (!active || !payload || payload.length === 0) return null;

  const cityName = payload[0]?.payload?.city ?? "Unknown City";
  const weatherType = payload[0]?.name ?? "Unknown";
  const value = payload[0]?.value ?? 0;
  const color = payload[0]?.payload.fill ?? "#8884d8";

  return (
    <div className={chartStyles.tooltip} style={{ borderColor: color }} role="tooltip">
      <h3 className={chartStyles.cityName}>{cityName}</h3>
      <p className={chartStyles.data}>
        <span className={chartStyles.weatherType}>{`${weatherType}: `}</span>
        <span className={chartStyles.value}>{value}%</span>
      </p>
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