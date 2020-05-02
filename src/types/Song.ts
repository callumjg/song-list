export default interface SongType {
  songId?: number;
  title: string;
  url?: string;
  author?: string;
  key?: string;
  tempo?: string;
  songSelectId?: string;
  isArchived?: boolean;
  isDeleted?: boolean;
  tags?: string[];
}
