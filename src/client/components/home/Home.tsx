import React from "react";
import SongsList from "../songs/SongsList";
import "./Home.scss";

const Home: React.FC = () => (
  <div className="container py-3">
    <SongsList />
  </div>
);

export default Home;
