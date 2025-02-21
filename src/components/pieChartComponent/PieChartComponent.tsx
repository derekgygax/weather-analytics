

import { PieChart, Pie, ResponsiveContainer, Tooltip, Legend, Cell, LegendProps } from "recharts";
import { CloudCoverageDataByCity } from "../../types/cloudCoverage"
import { ChartContainer } from "../../layouts/chartContainer/ChartContainer";

// styles
import styles from './PieChartComponent.module.scss';
import { GridItem } from "../../layouts/gridItem/GridItem";

const colorMap: Record<string, string> = {
  Clouds: "#8884d8",  // Purple
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
          width={500}
          height={400}
        >
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend content={<CustomLegend />} />
          {Object.entries(cloudCoverageDataByCity).map(([_, cloudData], index) => (
            <Pie
              key={index}
              data={cloudData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={index * 20 + 20}
              outerRadius={index * 20 + 40}
              label={index === Object.keys(cloudCoverageDataByCity).length - 1}
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



const CustomLegend = ({ payload }: LegendProps) => {
  if (!payload) return null;

  // Extract unique weather types from payload
  const uniqueWeatherTypes = Array.from(
    new Set(payload.map((entry) => entry.value))
  );

  return (
    <ul className={styles.customLegend}>
      {uniqueWeatherTypes.map((weatherType, index) => {
        const color = payload.find((entry) => entry.value === weatherType)
          ?.color;

        return (
          <li key={index} className={styles.customLegend__li}>
            <span
              className={styles.customLegend__li__span}
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