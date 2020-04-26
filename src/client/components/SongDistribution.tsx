import React from 'react';
import Song from '../types/Song';
import {
  XYPlot,
  VerticalBarSeries,
  XAxis,
  YAxis,
  HorizontalGridLines,
} from 'react-vis';
import '../../../node_modules/react-vis/dist/style.css';
import './SongDistribution.scss';

interface Props {
  songs: Song[];
}

const SongDistribution: React.FC<Props> = ({ songs }) => {
  const distribution = { '1': 0, '2': 0, '3': 0, '4': 0 };
  const weightedDistribution = { ...distribution };
  const filteredSongs = songs.filter((song) => song.averagePlacement > 0); // remove songs without any placement

  // Get distribution
  filteredSongs.forEach((song) => {
    const { averagePlacement } = song;
    const lower = parseInt(String(averagePlacement)[0]);
    const position = averagePlacement % lower < 0.5 ? lower : lower + 1;
    distribution[String(position)] += 1;
  });

  // get weighted distribution
  filteredSongs.forEach((song) => {
    const { averagePlacement } = song;
    const lower = parseInt(String(averagePlacement)[0]);
    const upper = averagePlacement % lower ? lower + 1 : null;
    if (upper) {
      const upperDist = averagePlacement % lower;
      const lowerDist = 1 - upperDist;
      weightedDistribution[String(lower)] += lowerDist;
      weightedDistribution[String(upper)] += upperDist;
    } else {
      weightedDistribution[String(lower)] += 1;
    }
  });

  const data = Object.keys(distribution).map((key) => ({
    x: parseInt(key),
    y: distribution[key],
  }));

  const weightedData = Object.keys(weightedDistribution).map((key) => ({
    x: parseInt(key),
    y: weightedDistribution[key],
  }));

  return (
    <div className="song-distribution">
      <div className="m-3">
        <h4>Primary Song Positions</h4>
        <XYPlot height={250} width={300}>
          <VerticalBarSeries data={data} color="#800d05" />
          <XAxis title="Service Position" tickTotal={5} />
          <YAxis title="Number of Songs" />
          <HorizontalGridLines />
        </XYPlot>
      </div>
      <div className="m-3">
        <h4>Weighted Song Positions</h4>
        <XYPlot height={250} width={300}>
          <VerticalBarSeries data={weightedData} color="#800d05" />
          <XAxis title="Service Position" tickTotal={5} />
          <YAxis title="Number of Songs" />
          <HorizontalGridLines />
        </XYPlot>
      </div>
    </div>
  );
};

export default SongDistribution;
