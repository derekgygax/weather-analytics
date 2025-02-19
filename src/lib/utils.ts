export const kelvinToFahrenheit = (kelvin: number): number => {
  return ((kelvin - 273.15) * 9) / 5 + 32;
};

export const convertUnixToTime = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

