
export interface RainData {
  date: string;
  probability: number;
}

export type RainDataByCity = Record<string, RainData[]>;