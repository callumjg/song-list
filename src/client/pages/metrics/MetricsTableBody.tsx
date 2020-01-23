import React from "react";
import Song from "../../types/Song";
import { StateDispatchProps } from "./useMetricsReducer";

const MetricsTableBody: React.FC<StateDispatchProps> = ({ state }) => {
  let { songs } = state;
  const avPlays =
    songs.reduce((acc: number, song: Song) => acc + song.plays, 0) /
    songs.length;

  return (
    <tbody>
      {songs.map((song: Song) => {
        const {
          _id,
          title,
          plays,
          earliestService,
          averagePlacement,
          weeksSincePlayed
        } = song;
        return (
          <tr key={_id} className={plays < avPlays ? "text-danger" : ""}>
            <td>{title}</td>
            <td className="text-center">{earliestService}</td>
            <td className="text-center">{averagePlacement}</td>
            <td className="text-center">{plays}</td>
            <td className="text-right">
              {weeksSincePlayed === Infinity ? "∞" : weeksSincePlayed}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default MetricsTableBody;
