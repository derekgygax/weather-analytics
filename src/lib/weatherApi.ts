import { WeatherType } from "../types/weatherTypes";

const BASE_URL = "https://api.openweathermap.org/data/2.5";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const doApiCall = async (typesUrl: { type: WeatherType, url: string }[]): Promise<Record<WeatherType, any>> => {

  const weatherData = await Promise.all(
    typesUrl.map(async (typeUrl) => {
      const response = await fetch(typeUrl.url);
      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      return data;
    })
  );

  return typesUrl.reduce((acc, typeUrl, index) => {
    acc[typeUrl.type] = weatherData[index];
    return acc;
  }, {} as Record<WeatherType, any>);
}

export const getWeatherByCity = async (city: string, types: WeatherType[]): Promise<Record<WeatherType, any>> => {
  try {
    const typesUrl = types.map((type) => {
      return {
        type: type,
        url: `${BASE_URL}/${type}?q=${city}&APPID=${API_KEY}`
      }
    });

    const weatherData: Record<WeatherType, any> = await doApiCall(typesUrl);
    return weatherData;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// TODO NEEDS BETTER ERROR REPORTING!!!
// TODO NEEDS BETTER ERROR REPORTING!!!
// TODO NEEDS BETTER ERROR REPORTING!!!
// TODO NEEDS BETTER ERROR REPORTING!!!
const getWeatherByLongLat = async (latitude: number, longitude: number, types: WeatherType[]) => {
  try {

    const typesUrl = types.map((type) => {
      return {
        type: type,
        url: `${BASE_URL}/${type}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
      }
    });

    const weatherData: Record<WeatherType, any> = await doApiCall(typesUrl);
    return weatherData;

  } catch (error) {
    throw error;
  }
};


const getCurrentPosition = (options?: PositionOptions): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => resolve(position),
      (error: GeolocationPositionError) => reject(error),
      options
    );
  });
};

export const getLocalWeather = async (): Promise<{ city: string; weatherData: Record<WeatherType, any> }> => {
  try {
    const position = await getCurrentPosition({ enableHighAccuracy: true });
    const { latitude, longitude } = position.coords;

    const weatherData = await getWeatherByLongLat(latitude, longitude, ["weather", "forecast"]);
    return {
      weatherData,
      city: weatherData.weather.name
    }

  } catch (error: unknown) {
    if (error instanceof GeolocationPositionError) {
      console.error("Geolocation error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
}