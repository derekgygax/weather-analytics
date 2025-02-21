export interface CloudCoverageData {
  city: string;
  name: string;
  value: number;
}

export type CloudCoverageDataByCity = Record<string, CloudCoverageData[]>;