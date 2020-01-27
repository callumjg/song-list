export default interface Song {
  _id: string;
  title: string;
  services?: number[];
  tags?: string[];
  totalIndices?: number;
  earliestService?: string;
  averagePlacement?: number;
  plays?: number;
  weeksSincePlayed?: number;
}
