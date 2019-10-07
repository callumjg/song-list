import React from "react";
import "./TagSearch.css";
class TagSearch extends React.Component {
	render() {
		return (
			<div className="tag-search">
				<label>Add tag: </label>
				<input type="text" placeholder="Search by tags..."></input>
			</div>
		);
	}
}

export default TagSearch;
