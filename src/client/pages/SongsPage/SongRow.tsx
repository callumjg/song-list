import React from 'react';
import './SongRow.scss';

const SongRow: React.FC<{ song: any }> = ({ song }) => {
  return (
    <tr className="song-row">
      <td>{song.title}</td>
      <td>{song.author}</td>
      <td>{song.key}</td>
      <td>
        {song.tags
          .filter(
            (t: any) => !t.match(/category a/i) && !t.match(/category b/i)
          )
          .join(', ')}
      </td>
      <td>
        <a href={song.url} target="_blank" rel="noopener noreferrer">
          <i className="ui youtube icon" />
        </a>
      </td>
    </tr>
  );
};

export default SongRow;
