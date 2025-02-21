
export interface AtmospherData {
  rainProbability: number;
  humidity: number;
  windSpeed: number;
}

export interface AtmospherDateData extends AtmospherData {
  date: string;
}

export type AtmosphereDataByCity = Record<string, AtmospherDateData[]>;