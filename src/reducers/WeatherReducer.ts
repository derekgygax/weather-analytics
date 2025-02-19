import { Weather, CityWeather } from "../types/weatherTypes";

export type WeatherReducerAction = {
  type: "changeCurrent"; payload: CityWeather;
}

export const WeatherReducer = (state: Weather, action: WeatherReducerAction): Weather => {
  switch (action.type) {
    case "changeCurrent":
      return {
        current: action.payload,
        searchHistory: {
          ...state.searchHistory,
          ...(state.current && { [state.current.city]: state.current })
        }
      };

    default:
      return state;
  }
}