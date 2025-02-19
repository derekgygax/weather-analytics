import { WeatherType } from "../types/weatherTypes";

const BASE_URL = "https://api.openweathermap.org/data/2.5";

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

/**
 * Fetches weather data from the OpenWeather API.
 *
 * @param {WeatherType[]} types - The types of weather data to retrieve. Options:
 *   - "weather" for current weather conditions
 *   - "forecast" for a 5-day forecast
 * @param {string} city - The name of the city to fetch weather data for.
 * @returns {Promise<Record<WeatherType, any>>} - An object containing the requested weather data.
 * 
 * Example response:
 * {
 *   weather: { ...current weather data... },
 *   forecast: { ...5-day forecast data... }
 * }
 * 
 * Throws an error if the API request fails.
 */
export const getWeather = async (types: WeatherType[], city: string): Promise<Record<WeatherType, any>> => {
  try {
    const weatherData = await Promise.all(
      types.map(async (type) => {
        const url = `${BASE_URL}/${type}?q=${city}&APPID=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
          throw data;
        }

        return data;
      })
    );

    return types.reduce((acc, type, index) => {
      acc[type] = weatherData[index];
      return acc;
    }, {} as Record<WeatherType, any>);
  } catch (err) {
    console.error(err);
    throw err;
  }
};