import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";

// types
import { AtmospherDateData } from "../../types/atmosphere";
import { GridItem } from "../../layouts/gridItem/GridItem";

interface BarChartComponentProps {
  atmosphereDataCurrentCity: AtmospherDateData[];
}

export const BarChartComponent = ({ atmosphereDataCurrentCity }: BarChartComponentProps) => {

  return (
    <GridItem title="sksks">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={atmosphereDataCurrentCity}
          margin={{
            right: 30
          }}
        >
          <XAxis dataKey="date" />

          <YAxis />

          <Tooltip
            formatter={(value, name) => [`${value} ${name === "windSpeed" ? "km/h" : "%"}`, name]}
          />

          {/* Legend for Key Reference */}
          <Legend />

          {/* Bars for Rain Probability, Humidity, and Wind Speed */}
          <Bar dataKey="rainProbability" name="Rain %" fill="#0077b6" />
          <Bar dataKey="humidity" name="Humidity %" fill="#00a8e8" />
          <Bar dataKey="windSpeed" name="Wind Speed" fill="#ffb703" stackId="a" />
        </BarChart>
      </ResponsiveContainer>
    </GridItem>
  );
};












// import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";

// // types
// import { AtmosphereDataByCity } from "../../types/atmosphere";
// import { ChartContainer } from "../../layouts/chartContainer/ChartContainer";

// interface BarChartComponentProps {
//   atmosphereDataByCity: AtmosphereDataByCity;
// }

// export const BarChartComponent = ({ atmosphereDataByCity }: BarChartComponentProps) => {
//   return (
//     <ChartContainer>
//       <ResponsiveContainer width="100%" height={400}>
//         <BarChart>
//           {/* X-Axis (Days) */}
//           <XAxis
//             dataKey="date"
//             tickFormatter={(tick) =>
//               new Date(tick).toLocaleDateString([], { month: "short", day: "2-digit" })
//             }
//           />
//           {/* Y-Axis (Values: % or Speed) */}
//           <YAxis />

//           {/* Tooltip for Hover Info */}
//           <Tooltip
//             labelFormatter={(label) =>
//               new Date(label).toLocaleDateString([], { month: "short", day: "2-digit" })
//             }
//             formatter={(value, name) => [`${value} ${name === "windSpeed" ? "km/h" : "%"}`, name]}
//           />

//           {/* Legend for Key Reference */}
//           <Legend />

//           {/* Bars for Each Data Type */}
//           {/* {Object.entries(atmosphereDataByCity).map(([city, cityData], index) => (
//             <>
//               <Bar key={`${city}-rain`} data={cityData} dataKey="rainProbability" name={`${city} - Rain %`} fill="#0077b6" />
//               <Bar key={`${city}-humidity`} data={cityData} dataKey="humidity" name={`${city} - Humidity %`} fill="#00a8e8" />
//               <Bar key={`${city}-wind`} data={cityData} dataKey="windSpeed" name={`${city} - Wind Speed`} fill="#ffb703" />
//             </>
//           ))} */}
//         </BarChart>
//       </ResponsiveContainer>
//     </ChartContainer>
//   );
// };
