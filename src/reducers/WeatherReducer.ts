import { Weather, CityWeather } from "../types/weatherTypes";

export type WeatherReducerAction = {
  type: "changeCurrent"; payload: CityWeather;
}

export const WeatherReducer = (state: Weather, action: WeatherReducerAction): Weather => {
  switch (action.type) {
    case "changeCurrent":
      return {
        current: action.payload,
        // refresh the history, weather always changes
        // searchHistory: {
        //   ...state.searchHistory,
        //   ...(state.current && { [state.current.city]: state.current })
        // }
        // most recent at front
        searchHistory: [
          ...(state.current ? [state.current.city] : []),
          ...state.searchHistory
        ]
      };

    default:
      return state;
  }
}