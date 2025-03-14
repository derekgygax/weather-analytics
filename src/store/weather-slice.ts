import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { CurrentWeatherType, ForecastWeatherType } from "../types/weatherTypes";

export interface CityWeatherType {
  current: CurrentWeatherType;
  forecast: ForecastWeatherType
}

export interface SelectedCityWeather {
  city: string;
  data: CityWeatherType
}

export interface WeatherState {
  selectedCityWeather: SelectedCityWeather | undefined;
  // searchHistory: Record<string, CityWeatherType>;
  searchHistory: string[];
  localCountry: string;
}

const initialState: WeatherState = {
  selectedCityWeather: undefined,
  searchHistory: [],
  localCountry: "US"
}

// This can ONLY be called from inside the createSlice()
// area!! or it will not follow immers immutability it does for you
const updateSelectedCity = (state: WeatherState, city: string, data: CityWeatherType) => {
  // Add the previous city to the history
  if (state.selectedCityWeather?.city) {
    state.searchHistory.push(state.selectedCityWeather.city);
  }
  // Set the newly selected city as the current city
  state.selectedCityWeather = {
    city: city,
    data: data
  };
}

const weatherSlice = createSlice({
  name: "weather",
  initialState: initialState,
  reducers: {
    changeSelectedCity: (
      state,
      action: PayloadAction<{ city: string, data: CityWeatherType }>
    ) => {
      updateSelectedCity(state, action.payload.city, action.payload.data);
    },
    changeLocalCountry: (
      state,
      action: PayloadAction<{ country: string }>
    ) => {
      state.localCountry = action.payload.country;
    },
    setLocalCity: (
      state,
      action: PayloadAction<{ city: string, data: CityWeatherType, country: string }>
    ) => {
      updateSelectedCity(state, action.payload.city, action.payload.data);
      // Set the county for the local city retrieved
      state.localCountry = action.payload.country;
    }
  }
});

export const { changeSelectedCity, changeLocalCountry, setLocalCity } = weatherSlice.actions;
export default weatherSlice.reducer;