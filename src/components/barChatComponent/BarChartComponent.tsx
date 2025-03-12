import React, { useMemo, useState } from "react";
import classNames from "classnames";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, TooltipProps } from "recharts";

// layouts
import { GridItem } from "../../layouts/gridItem/GridItem";

// types
import { RainData, RainDataByCity } from "../../types/rain";

// styles
import chartStyles from '@/styles/chart.module.scss';
import styles from './BarChartComponent.module.scss';


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

const formatCityColors = (rainDataByCity: RainDataByCity): Record<string, string> => {
  const colors = ["#00a8e8", "#ffb703", "#654ea3"];

  return Object.keys(rainDataByCity).reduce((acc, city, index) => {
    acc[city] = colors[index % colors.length]; // Cycle through colors
    return acc;
  }, {} as Record<string, string>);
};

interface BarChartComponentProps {
  rainDataByCity: RainDataByCity;
}

export const BarChartComponent = ({ rainDataByCity }: BarChartComponentProps) => {

  const [hiddenCities, setHiddenCities] = useState<string[]>([]);

  const cityColors = useMemo(() => {
    return formatCityColors(rainDataByCity);
  }, [rainDataByCity]);

  const data = useMemo(() => {
    return constructDataArray(rainDataByCity);
  }, [rainDataByCity]);


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
    <GridItem title="Precipitation">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            right: 30
          }}
        >
          <XAxis dataKey="date" />

          <YAxis
            domain={[0, 100]}
            tickFormatter={(tick) => `${tick}%`}
            label={{
              value: "Rain Probability (%)",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle", fill: "#666", fontSize: "14px" },
            }}
          />

          <Tooltip content={<CustomTooltip />} />
          <Legend content={
            <CustomLegend
              onClick={handleLegendClick}
              hiddenCities={hiddenCities}
              rainDataByCity={rainDataByCity}
              cityColors={cityColors}
            />
          } />

          {Object.keys(rainDataByCity).map((city: string, index: number) => {
            if (hiddenCities.includes(city)) {
              return;
            }
            return (
              <Bar
                key={index}
                dataKey={city}
                name={city}
                fill={index === 2 ? "#654ea3" : index === 1 ? "#ffb703" : "#00a8e8"}
              />
            );
          })}
        </BarChart>
      </ResponsiveContainer>
    </GridItem>
  );
};

const CustomLegend = ({
  onClick,
  rainDataByCity,
  hiddenCities,
  cityColors
}: {
  onClick: (entry: { value: string }) => void;
  rainDataByCity: RainDataByCity;
  hiddenCities: string[],
  cityColors: Record<string, string>;
}) => {
  return (
    <ul className={chartStyles.customLegend}>
      {Object.keys(rainDataByCity).map((city, index) => {
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

  const date = payload[0]?.payload.date ?? "Unknown Time";

  return (
    <div className={chartStyles.tooltip} style={{ borderColor: "grey" }} role="tooltip">
      <h4 className={chartStyles.date}>{date}</h4>
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