
export interface TemperatureData {
  temperature: number;
  displayTemperature: string;
}

export interface TemperatureTimeData extends TemperatureData {
  time: number;
  displayTime: string;
}

export type TempTimeByCity = Record<string, TemperatureData[]>;