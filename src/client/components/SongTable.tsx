import React from 'react';
import SongType from '../../types/Song';

interface Props {
  songs: SongType[];
  className?: string;
}
const SongTable: React.FC<Props> = ({ songs, className }) => {
  let classes = 'table table-sm table-borderless song-table';
  if (className) classes += ` ${className}`;
  return (
    <table className={classes} style={{ fontSize: '90%' }}>
      <thead className="">
        <tr>
          <th>
            <ion-icon name="musical-notes-outline" />
          </th>
          <th>
            <ion-icon name="person-outline" />
          </th>
          <th>
            <ion-icon name="key-outline" />
          </th>
          <th>
            <ion-icon name="pricetags-outline" />
          </th>
          <th>
            <ion-icon name="link-outline" />
          </th>
        </tr>
      </thead>
      <tbody>
        {songs.map((song) => (
          <tr key={song.songId}>
            <td className="align-middle">{song.title}</td>
            <td className="align-middle">{song.author}</td>
            <td className="align-middle">{song.key}</td>
            <td className="align-middle">
              {song.tags.filter((t) => !t.match(/Category [AB]/)).join(', ')}
            </td>
            <td className="align-middle">
              {song.url ? (
                <a href={song.url} target="_blank" rel="noopener noreferrer">
                  <ion-icon name="logo-youtube" />
                </a>
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SongTable;
