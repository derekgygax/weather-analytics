import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";

// types
import { RainData, RainDataByCity } from "../../types/rain";
import { GridItem } from "../../layouts/gridItem/GridItem";


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

          <Tooltip
            formatter={(value, name) => [`${value} ${name === "windSpeed" ? "km/h" : "%"}`, name]}
          />

          {/* Legend for Key Reference */}
          <Legend />

          {Object.keys(rainDataByCity).map((city: string, index: number) => {
            return (
              <Bar
                key={index}
                dataKey={city}
                name={city}
                fill={index === 2 ? "#0077b6" : index === 1 ? "#00a8e8" : "#ffb703"}
              />
            );
          })}
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
