export default interface Song {
  _id: string;
  services: number[];
  tags: string[];
  title: string;
  totalIndices?: number;
  earliestService?: string;
  averagePlacement?: number;
  plays?: number;
  weeksSincePlayed?: number;
}
