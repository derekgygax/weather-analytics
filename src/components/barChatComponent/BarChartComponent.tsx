import React from "react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, LegendProps, TooltipProps } from "recharts";

// layouts
import { GridItem } from "../../layouts/gridItem/GridItem";

// types
import { RainData, RainDataByCity } from "../../types/rain";

// styles
import chartStyles from '@/styles/chart.module.scss';


const constructDataArray = (rainDataByCity: RainDataByCity) => {

  const data: { [key: string]: number | string }[] = [];
  const dataMiddle: Record<string, { [key: string]: number }> = {};

  Object.entries(rainDataByCity).forEach(([city, rainData]) => {
    rainData.forEach((dayProb: RainData) => {
      if (!(dayProb.date in dataMiddle)) {
        dataMiddle[dayProb.date] = {};
      }
      dataMiddle[dayProb.date][city] = dayProb.probability
    })
  })

  Object.entries(dataMiddle).forEach(([date, cities]) => {
    data.push({
      date: date,
      ...cities
    });
  });

  return data;

}

interface BarChartComponentProps {
  rainDataByCity: RainDataByCity;
}

export const BarChartComponent = ({ rainDataByCity }: BarChartComponentProps) => {
  const data = constructDataArray(rainDataByCity);

  // const fff = rainDataByCity[Object.keys(rainDataByCity)[0]];

  return (
    <GridItem title="Precipitation">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            right: 30
          }}
        >
          <XAxis dataKey="date" />

          <YAxis />

          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />

          {Object.keys(rainDataByCity).map((city: string, index: number) => {
            return (
              <Bar
                key={index}
                dataKey={city}
                name={city}
                fill={index === 2 ? "#654ea3" : index === 1 ? "#00a8e8" : "#ffb703"}
              />
            );
          })}
        </BarChart>
      </ResponsiveContainer>
    </GridItem>
  );
};


const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className={chartStyles.tooltip} style={{ borderColor: "grey" }} role="tooltip">
      {payload.map((cityData, index) => {
        const cityName = cityData?.name ?? "Unknown City";
        const value = cityData?.value ?? 0;
        const color = cityData?.color ?? "#8884d8";
        return (
          <React.Fragment key={index}>
            <h3 className={chartStyles.cityName}>{cityName}</h3>
            <p className={chartStyles.data}>
              <span className={chartStyles.weatherType}>Rain Probability: </span>
              <span className={chartStyles.value} style={{ color }}>{value}%</span>
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