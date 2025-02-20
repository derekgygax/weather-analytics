import { WeatherState, CityWeatherType } from "../types/weatherTypes";

export type WeatherReducerAction = {
  type: "changeCurrentCity";
  payload: {
    city: string;
    data: CityWeatherType
  };
}

export const WeatherReducer = (state: WeatherState, action: WeatherReducerAction): WeatherState => {
  switch (action.type) {
    case "changeCurrentCity":
      return {
        selectedCityWeather: action.payload,
        searchHistory: [
          ...(state.selectedCityWeather ? [state.selectedCityWeather.city] : []),
          ...state.searchHistory
        ]
      };

    default:
      return state;
  }
}