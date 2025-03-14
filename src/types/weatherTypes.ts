
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

export interface SkyType {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface CurrentWeatherType {
  coord: {
    lon: number;
    lat: number;
  };
  weather: SkyType[];
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

export interface ForecastCity {
  name: string;
  country: string;
  coord: {
    lat: number;
    lon: number;
  };
}

export interface ForecastWeatherType {
  city: ForecastCity;
  list: {
    dt: number;
    main: TempHumidPressureType;
    weather: SkyType[];
    wind: WindType;
    clouds: {
      all: number;
    };
    dt_txt: string;
  }[];
}