import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";

import { TempTimeByCity } from "../../types/temp";
import { GridItem } from "../../layouts/gridItem/GridItem";

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
    </GridItem>
  );
}
