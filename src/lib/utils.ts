

export const kelvinToFahrenheit = (kelvin: number): number => {
  return Math.round((((kelvin - 273.15) * 9) / 5 + 32) * 10) / 10;
};

export const formatTemperature = (temp: number, unit: "F" | "C" | "K") => {
  return `${temp.toFixed(1)}${unit === "K" ? "" : "°"}${unit}`;
};

export const convertUnixToTime = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const getWeatherIconUrl = (iconCode: string) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}