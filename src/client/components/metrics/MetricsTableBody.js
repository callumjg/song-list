import React from "react";

function MetricsTableBody({ state }) {
  let { songs } = state;
  const avPlays =
    songs.reduce((acc, { plays }) => acc + plays, 0) / songs.length;

  return (
    <tbody>
      {songs.map(({ _id, title, plays, earliestService, weeksSincePlayed }) => (
        <tr key={_id} className={plays < avPlays ? "text-danger" : ""}>
          <td>{title}</td>
          <td className="text-center">{earliestService}</td>
          <td className="text-center">{plays}</td>
          <td className="text-right">
            {weeksSincePlayed === Infinity ? "∞" : weeksSincePlayed}
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default MetricsTableBody;
