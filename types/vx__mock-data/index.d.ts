// Type definitions for @vx/mock-data 0.0.185
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/mock-data" {
  type AppleStockDatum = {
    close: number;
    date: string;
  };

  type PriceDatum = {
    price: string;
    time: string;
  };

  type BitcoinPrice = {
    currency: string;
    prices: PriceDatum;
  };

  type Browser = {
    label: string;
    usage: number;
  };

  type BrowserUsageDatum = {
    date: string;
    Firefox: string;
    "Google Chrome": string;
    "Internet Explorer": string;
    "Microsoft Edge": string;
    Mozilla: string;
    Opera: string;
    "Other/Unknown": string;
    Safari: string;
  };

  type CityTemperatureDatum = {
    Austin: string;
    date: string;
    "New York": string;
    "San Francisco": string;
  };

  type Letter = {
    label: string;
    letter: string;
  };

  type LetterFrequencyDatum = {
    frequency: number;
    letter: string;
  };

  type GroupDateValueDatum = {
    date: string;
    key: string;
    value: string;
  };

  type ShakespeareDatum = {
    id: string;
    parent: string | null;
    size: number | null;
  };

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

  type LesMiserablesGraph = {
    links: LesMiserables.Link[];
    nodes: LesMiserables.Node[];
  };

  type PlanetDatum = {
    distance: string;
    name: string;
    radius: string;
  };

  type DateValueDatum = {
    date: Date; // not sure if this is the correct Date interface
    value: number;
  };

  type ToConsumableArray = (arr: any) => void | any[];

  type BinFunction = (i: number, n: number) => number;
  type CountFunction = (i: number, n: number) => number;

  // this is used internally by genBin
  // interface BinDatum {
  //     bin: BinFunction,
  //     count: CountFunction,
  // }

  type Bin = {
    bin: number;
    count: number;
  };

  type BoxPlot = {
    firstQuartile: number;
    median: number;
    max: number;
    min: number;
    outliers: number[];
    thirdQuartile: number;
    x: string;
  };

  type BinDatum = {
    count: number;
    value: number;
  };

  type StatsDatum = {
    binData: BinDatum[];
    boxPlot: BoxPlot;
  };

  function genBin(n: number): Bin;
  function genBin(n: number, bin: BinFunction): Bin;
  function genBin(n: number, bin: BinFunction, count: CountFunction): Bin;

  function genBins(
    x: number,
    y: number,
    bin?: BinFunction,
    count?: CountFunction
  ): Bin[];

  function genDateValue(n: number): DateValueDatum[];

  interface IConfig {
    height: number;
    radius: number;
    width: number;
  }
  type IPhyllotaxisDatum = {
    x: number;
    y: number;
  };
  function genPhyllotaxis(ref: IConfig): (i: number) => IPhyllotaxisDatum;

  function genRandomNormalPoints(): [ToConsumableArray, ToConsumableArray];
  function genRandomNormalPoints(
    count: number
  ): [ToConsumableArray, ToConsumableArray];

  function genStats(number: number): StatsDatum[];

  const appleStock: AppleStockDatum[];
  const bitcoinPrice: BitcoinPrice;
  const browserUsage: BrowserUsageDatum[];
  const cityTemperature: CityTemperatureDatum[];
  const exoplanets: PlanetDatum[];
  const groupDateValue: GroupDateValueDatum[];
  const lesMiserables: LesMiserablesGraph;
  const letterFrequency: LetterFrequencyDatum[];
  const planets: PlanetDatum[];
  const shakespeare: ShakespeareDatum[];
}
