import Song from './Song';

export default interface ServiceType {
  serviceId?: number;
  date: Date;
  songs: Song[];
  notes?: string[];
}
