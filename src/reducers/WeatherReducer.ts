import { Weather, CityWeather } from "../types/weatherTypes";

export type WeatherReducerAction = {
  type: "changeCurrent";
  payload: {
    city: string;
    data: CityWeather
  };
}

export const WeatherReducer = (state: Weather, action: WeatherReducerAction): Weather => {
  switch (action.type) {
    case "changeCurrent":
      return {
        current: action.payload,
        searchHistory: [
          ...(state.current ? [state.current.city] : []),
          ...state.searchHistory
        ]
      };

    default:
      return state;
  }
}