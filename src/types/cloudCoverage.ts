export interface CloudCoverageData {
  name: string;
  value: number;
}

export type CloudCoverageDataByCity = Record<string, CloudCoverageData[]>;