
export type WeatherType = "weather" | "forecast";

export interface CurrentWeather {
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

export interface ForecastWeather {
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

export interface CityWeather {
  current: CurrentWeather;
  forecast: ForecastWeather
}

export interface WeatherState {
  selectedCityWeather: {
    city: string;
    data: CityWeather
  } | undefined;
  // searchHistory: Record<string, CityWeather>;
  searchHistory: string[];
}

