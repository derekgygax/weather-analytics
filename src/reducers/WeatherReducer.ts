import { WeatherState, CityWeather } from "../types/weatherTypes";

export type WeatherReducerAction = {
  type: "changeCurrent";
  payload: {
    city: string;
    data: CityWeather
  };
}

export const WeatherReducer = (state: WeatherState, action: WeatherReducerAction): WeatherState => {
  switch (action.type) {
    case "changeCurrent":
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