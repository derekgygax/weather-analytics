
export type WeatherType = "weather" | "forecast";

export interface TempHumidPressureType {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface WindType {
  speed: number;
  deg: number;
  gust: number;
}

export interface CurrentWeatherType {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: TempHumidPressureType;
  wind: WindType;
  clouds: {
    all: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  // timezone offset from UTC
  timezone: number;
  // city name
  name: string;
}

export interface ForecastWeatherType {
  city: {
    name: string;
    country: string;
    coord: {
      lat: number;
      lon: number;
    };
  };
  list: {
    dt: number;
    main: TempHumidPressureType;
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    wind: WindType;
    clouds: {
      all: number;
    };
    dt_txt: string;
  }[];
}

export interface CityWeatherType {
  current: CurrentWeatherType;
  forecast: ForecastWeatherType
}

export interface WeatherState {
  selectedCityWeather: {
    city: string;
    data: CityWeatherType
  } | undefined;
  // searchHistory: Record<string, CityWeatherType>;
  searchHistory: string[];
}

