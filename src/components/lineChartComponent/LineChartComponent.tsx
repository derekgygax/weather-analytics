import React, { useMemo } from "react";
import classNames from "classnames";
import { useState } from "react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, TooltipProps } from "recharts";

import { FAHRENHEIT_COUNTRIES } from "../../lib/utils";
// types
import { TempTimeByCity } from "../../types/temp";

// layouts
import { GridItem } from "../../layouts/gridItem/GridItem";

// styles
import chartStyles from '@/styles/chart.module.scss';
import styles from './LineChartComponent.module.scss';


const formatCityColors = (tempTimeDataByCity: TempTimeByCity): Record<string, string> => {
  const colors = ["#00a8e8", "#ffb703", "#654ea3"];

  return Object.keys(tempTimeDataByCity).reduce((acc, city, index) => {
    acc[city] = colors[index % colors.length]; // Cycle through colors
    return acc;
  }, {} as Record<string, string>);
};

interface LineChartComponentProps {
  tempTimeDataByCity: TempTimeByCity;
  localCountry: string;
}

export const LineChartComponent = ({ tempTimeDataByCity, localCountry }: LineChartComponentProps) => {

  const cityColors = useMemo(() => {
    return formatCityColors(tempTimeDataByCity);
  }, [tempTimeDataByCity]);

  const [hiddenCities, setHiddenCities] = useState<string[]>([]);

  const handleLegendClick = (e: any) => {
    const city = e.value;

    setHiddenCities((prevState) => {
      if (prevState.includes(city)) {
        return prevState.filter((prevCity) => prevCity !== city)
      } else {
        return [
          ...prevState,
          city
        ]
      }
    })
  };

  return (
    <GridItem title="Temperature">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          margin={{
            right: 50
          }}>
          <XAxis
            dataKey="time"
            type="number"
            domain={['dataMin', 'dataMax']}
            tickFormatter={(tick) => new Date(tick).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          />
          <YAxis
            domain={['auto', 'auto']}
            tickFormatter={(tick) => `${tick}°`}
            label={{
              value: `Temperature ${FAHRENHEIT_COUNTRIES.includes(localCountry) ? "°F" : "°C"}`,
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle", fill: "#666", fontSize: "14px" },
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            content={
              <CustomLegend
                onClick={handleLegendClick}
                tempTimeDataByCity={tempTimeDataByCity}
                hiddenCities={hiddenCities}
                cityColors={cityColors}
              />
            }
          />
          {/* Lines for each city */}
          {Object.entries(tempTimeDataByCity).map(([city, tempTimeData], index: number) => {
            if (hiddenCities.includes(city)) {
              return;
            }
            return (
              <Line
                key={index}
                type="monotone"
                data={tempTimeData}
                dataKey="temperature"
                name={city}
                stroke={index === 2 ? "#654ea3" : index === 1 ? "#ffb703" : "#00a8e8"}
                dot={true}
              />
            )
          })}
        </LineChart>
      </ResponsiveContainer>
    </GridItem>
  );
}

const CustomLegend = ({
  onClick,
  tempTimeDataByCity,
  hiddenCities,
  cityColors
}: {
  onClick: (entry: { value: string }) => void;
  tempTimeDataByCity: TempTimeByCity;
  hiddenCities: string[];
  cityColors: Record<string, string>;
}) => {
  return (
    <ul className={chartStyles.customLegend}>
      {Object.keys(tempTimeDataByCity).map((city, index) => {
        const isHidden = hiddenCities.includes(city);
        return (
          <li
            key={index}
            className={classNames(chartStyles.customLegend__li, styles.legendCity, { [styles.hiddenLegend]: isHidden })}
            onClick={() => onClick({ value: city })}
            style={{ cursor: "pointer", opacity: isHidden ? 0.5 : 1 }}
          >
            <span
              className={chartStyles.customLegend__li__span}
              style={{ backgroundColor: isHidden ? "#ddd" : cityColors[city] }}
            />
            {city}
          </li>
        );
      })}
    </ul>
  );
};


const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (!active || !payload || payload.length === 0) return null;

  const date = payload[0]?.payload.displayTime ?? "Unknown Time";

  return (
    <div className={chartStyles.tooltip} style={{ borderColor: "grey" }} role="tooltip">
      <h4 className={chartStyles.date}>{date}</h4>
      {payload.map((cityData, index) => {
        const country = cityData?.payload.country ?? undefined;
        const cityName = cityData?.name ?? "Unknown City";
        const value = cityData?.value ?? 0;
        const color = cityData?.color ?? "#8884d8";
        return (
          <React.Fragment key={index}>
            <h4 className={chartStyles.cityName}>{cityName}</h4>
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
