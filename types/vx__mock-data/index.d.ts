// Type definitions for @vx/mock-data 0.0.182
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/mock-data" {
  interface AppleStockDatum {
    date: string;
    close: number;
  }

  interface BrowserUsageDatum {
    date: string;
    "Google Chrome": string;
    "Internet Explorer": string;
    Firefox: string;
    Safari: string;
    "Microsoft Edge": string;
    Opera: string;
    Mozilla: string;
    "Other/Unknown": string;
  }

  interface CityTemperaturDatum {
    date: string;
    "New York": string;
    "San Francisco": string;
    Austin: string;
  }

  interface LetterFrequencyDatum {
    letter: string;
    frequency: number;
  }

  interface GroupDateValueDatum {
    key: string;
    value: string;
    date: string;
  }

  interface ShakespeareDatum {
    id: string;
    parent: string | null;
    size: number | null;
  }

  declare namespace LesMiserables {
    interface Node {
      id: string;
      group: number;
    }
    interface Link {
      source: string;
      target: string;
      value: number;
    }
  }

  interface LesMiserablesGraph {
    nodes: LesMiserables.Node[];
    links: LesMiserables.Link[];
  }

  interface PlanetDatum {
    name: string;
    radius: string;
    distance: string;
  }

  interface DateValueDatum {
    date: Date; // not sure if this is the correct Date interface
    value: number;
  }

  type ToConsumableArray = (arr: any) => void | any[];

  type BinFunction = (i: number, n: number) => number;
  type CountFunction = (i: number, n: number) => number;

  // this is used internally by genBin
  // interface BinDatum {
  //     bin: BinFunction,
  //     count: CountFunction,
  // }

  interface Bin {
    bin: number;
    count: number;
  }

  interface BoxPlot {
    x: string;
    min: number;
    firstQuartile: number;
    median: number;
    thirdQuartile: number;
    max: number;
    outliers: number[];
  }

  interface BinDatum {
    value: number;
    count: number;
  }

  interface StatsDatum {
    boxPlot: BoxPlot;
    binData: BinDatum[];
  }

  export function genDateValue(n: number): DateValueDatum[];
  export function genRandomNormalPoints(): [
    ToConsumableArray,
    ToConsumableArray
  ];
  export function genRandomNormalPoints(
    count: number
  ): [ToConsumableArray, ToConsumableArray];
  export function genBin(n: number): Bin;
  export function genBin(n: number, bin: BinFunction): Bin;
  export function genBin(
    n: number,
    bin: BinFunction,
    count: CountFunction
  ): Bin;
  export function genBins(
    x: number,
    y: number,
    bin: BinFunction,
    count: CountFunction
  ): Bin[];
  export function genStats(number: number): StatsDatum[];
  export const appleStock: AppleStockDatum[];
  export const letterFrequency: LetterFrequencyDatum[];
  export const browserUsage: BrowserUsageDatum[];
  export const groupDateValue: GroupDateValueDatum[];
  export const cityTemperature: CityTemperaturDatum[];
  export const lesMiserables: LesMiserablesGraph;
  export const exoplanets: PlanetDatum[];
  export const planets: PlanetDatum[];
  export const shakespeare: ShakespeareDatum[];
}
