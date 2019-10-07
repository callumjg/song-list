import React from "react";
import server from "../apis/server";
import Table from "./table/Table";
import Row from "./table/Row";
import TagSearch from "./TagSearch";
import Tag from "./Tag";
import "./Home.css";

class Home extends React.Component {
	state = {
		songs: [],
		tags: ["Category A"]
	};
	async componentDidMount() {
		try {
			const response = await server.get("/songs");
			const { songs } = response.data;
			this.setState({ songs });
		} catch (e) {
			console.log(e);
		}
	}

	renderTags = () => {
		return this.state.tags.map((t, i) => (
			<Tag onClick={() => console.log(t)} key={i}>
				<span>{t}</span>
			</Tag>
		));
	};

	renderSongs = () => {
		return this.state.songs.map(s => {
			return (
				<Row key={s._id}>
					<span>{s.title}</span>
				</Row>
			);
		});
	};
	render() {
		return (
			<div className="home">
				<h1>Gracevill Presbyterian Song List</h1>
				<label>Filter by tags: </label>
				{this.renderTags()}
				<Tag icon="add">
					<input style={{ width: "100%" }} type="text" placeholder="Add tag" />
				</Tag>
				<input placeholder="Search..." />
				<Table>{this.renderSongs()}</Table>
			</div>
		);
	}
}

export default Home;
