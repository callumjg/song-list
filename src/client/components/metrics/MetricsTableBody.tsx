import React from "react";

interface Props {
  state: any;
}

const MetricsTableBody: React.FC<Props> = ({ state }) => {
  let { songs } = state;
  const avPlays =
    songs.reduce((acc: number, song: any) => acc + song.plays, 0) /
    songs.length;

  return (
    <tbody>
      {songs.map((song: any) => {
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
      )
    </tbody>
  );
};

export default MetricsTableBody;
