import Song from './Song';

interface Service {
  _id: string;
  date: string;
  songs: Song[];
  tags: string[];
}

export default Service;
