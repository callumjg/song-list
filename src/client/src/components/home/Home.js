import React from "react";
import SongsList from "../songs/SongsList";
import "./Home.scss";

const Home = props => (
	<div className="container py-5">
		<SongsList />
	</div>
);

export default Home;
