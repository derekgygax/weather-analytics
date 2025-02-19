
export type WeatherType = "weather" | "forecast";

export interface CityWeather {
  city: string;
  weather: Partial<Record<WeatherType, any>>;
}

export interface Weather {
  current: CityWeather | undefined;
  // searchHistory: Record<string, CityWeather>;
  searchHistory: string[];
}