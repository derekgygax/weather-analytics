export interface Metric {
  label: string;
  value: string | number;
}

export interface TemperatureData {
  temperature: number;
  displayTemperature: string;
}