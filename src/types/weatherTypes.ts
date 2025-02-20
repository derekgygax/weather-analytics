
export type WeatherType = "weather" | "forecast";

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
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
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
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    wind: {
      speed: number;
      deg: number;
    };
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

