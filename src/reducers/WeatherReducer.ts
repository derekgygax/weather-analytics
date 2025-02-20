import { WeatherState, CityWeatherType } from "../types/weatherTypes";

export type WeatherReducerAction = {
  type: "changeCurrentCity";
  payload: {
    city: string;
    data: CityWeatherType
  };
} | {
  type: "changeLocalCountry";
  payload: {
    country: string;
  }
} | {
  type: "setLocalCity";
  payload: {
    city: string;
    data: CityWeatherType;
    country: string;
  };
}

export const WeatherReducer = (state: WeatherState, action: WeatherReducerAction): WeatherState => {
  switch (action.type) {
    case "changeCurrentCity":
      return {
        ...state,
        selectedCityWeather: action.payload,
        searchHistory: [
          ...(state.selectedCityWeather ? [state.selectedCityWeather.city] : []),
          ...state.searchHistory
        ],
      };
    case "changeLocalCountry":
      return {
        ...state,
        localCountry: action.payload.country
      }
    case "setLocalCity":
      return {
        selectedCityWeather: action.payload,
        searchHistory: [
          ...(state.selectedCityWeather ? [state.selectedCityWeather.city] : []),
          ...state.searchHistory
        ],
        localCountry: action.payload.country
      };
    default:
      return state;
  }
}