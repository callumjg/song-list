import React from 'react';
import { StateDispatchProps } from './useMetricsReducer';

const MetricsTableBody: React.FC<StateDispatchProps> = ({ state }) => {
  let { songs } = state;
  const avPlays =
    songs.reduce((acc: number, song) => acc + song.plays, 0) / songs.length;

  return (
    <tbody>
      {songs.map((song) => {
        const {
          _id,
          title,
          plays,
          earliestService,
          averagePlacement,
          weeksSincePlayed,
        } = song;
        return (
          <tr key={_id} className={plays < avPlays ? 'text-danger' : ''}>
            <td>{title}</td>
            <td className="text-center">{earliestService || '-'}</td>
            <td className="text-center">{averagePlacement || '-'}</td>
            <td className="text-center">{plays || 0}</td>
            <td className="text-right">
              {weeksSincePlayed === Infinity ? '∞' : weeksSincePlayed}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default MetricsTableBody;
