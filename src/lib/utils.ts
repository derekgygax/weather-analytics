const WORDS_EXCLUDED_FROM_TITLE_CASE = [
  "a", "an", "and", "as", "at", "but", "by", "for", "if", "in",
  "nor", "of", "on", "or", "so", "the", "to", "up", "yet", "with"
];


export const kelvinToFahrenheit = (kelvin: number): number => {
  return Math.round((((kelvin - 273.15) * 9) / 5 + 32) * 10) / 10;
};

export const formatTemperature = (temp: number, unit: "F" | "C" | "K") => {
  return `${temp.toFixed(1)}${unit === "K" ? "" : "°"}${unit}`;
};

export const capitalizeFirstLetter = (s: string): string => {
  return s.charAt(0).toUpperCase() + s.slice(1)
};

export const capitalizeAsTitle = (s: string): string => {
  let words = s.trim().split(/\s+/);
  words = words.map((word: string) => {
    if (WORDS_EXCLUDED_FROM_TITLE_CASE.includes(word.toLowerCase())) {
      return word.toLowerCase();
    } else {
      return capitalizeFirstLetter(word);
    }
  })
  return words.join(" ");
}

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

export const getMeteoIconUrl = (icon_name: string) => {
  return `https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/${icon_name}.svg`;
}

export const isNightTime = (sunrise: number, sunset: number) => {
  const now = Math.floor(Date.now() / 1000);
  return now < sunrise || now > sunset;
};