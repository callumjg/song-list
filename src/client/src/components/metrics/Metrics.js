import React, { useState, useEffect } from "react";
import server from "../../apis/server";
import "./Metrics.scss";

const Metrics = props => {
	const [songs, setSongs] = useState([]);
	const [count, setCount] = useState(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLoading(true);
		(async () => {
			try {
				let response = await server.get("/songs/metrics");
				setSongs(response.data.songs);
				setCount(response.data.count);
			} catch (e) {
				let message = e.response ? e.response.data.message : e.message;
				setError(message);
			}
			setLoading(false);
		})();
	}, []);
	return (
		<section className="metrics container py-3">
			<h4>Most picked</h4>
			<h5>Category A</h5>
			<ol>
				{songs
					.sort((a, b) => b.services.length - a.services.length)
					.map((s, i) => (
						<li>
							{s.title}: {s.services.length}
						</li>
					))}
			</ol>
		</section>
	);
};

export default Metrics;
