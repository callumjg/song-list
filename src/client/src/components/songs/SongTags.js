import React, { useState, useEffect } from "react";

class Tags {
	constructor(tags) {
		this.val = tags;
	}

	addTag(tag) {
		if (!this.val.includes(tag)) this.val = [...this.val, tag];
		return this;
	}
	removeTag(tag) {
		this.val = this.val.filter(t => t !== tag);
		return this;
	}
	value() {
		return this.val;
	}
}

const SongTags = ({ tags, setTags }) => {
	const T = new Tags(tags);
	const [cat, setCat] = useState("A");
	const [archived, setArchived] = useState("");

	function toggleCategory() {
		let meowCat = cat;
		let neowCat = cat === "A" ? "B" : "A";
		setTags(
			T.addTag(`Category ${meowCat}`)
				.removeTag(`Category ${neowCat}`)
				.value()
		);
		setCat(neowCat);
	}

	return (
		<div className="my-3">
			<div className="btn-group btn-group-toggle">
				<button
					className={`btn btn-sm no-glow btn-outline-primary${
						cat === "A" ? " active" : ""
					}`}
					onClick={() => toggleCategory()}
				>
					Category A
				</button>
				<button
					className={`btn btn-sm no-glow btn-outline-primary${
						cat === "B" ? " active" : ""
					}`}
					onClick={() => toggleCategory()}
				>
					Category B (Hymns)
				</button>
			</div>
			<button
				className={`btn btn-sm no-glow btn-outline-primary ml-3${archived}`}
				onClick={() => {
					if (!archived) setTags(T.addTag("Archived").value());
					setArchived(archived ? "" : " active");
				}}
			>
				Show Archived
			</button>
		</div>
	);
};

export default SongTags;
