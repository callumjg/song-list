const router = require("express").Router();
const Song = require("../models/Song");

// Create song
router.post("/", async (req, res) => {
	try {
		const song = await new Song(req.body).save();
		res.send(song);
	} catch (e) {
		let status = e.status || 400;
		res.status(status).send({ message: e.message });
	}
});

// Get song
router.get("/:_id", async (req, res) => {
	try {
		const song = await Song.findById(req.params._id);
		if (!song) {
			let e = new Error("Unable to find song");
			e.status = 404;
			throw e;
		}
		res.send(song);
	} catch (e) {
		let status = e.status || 400;
		res.status(status).send({ message: e.message });
	}
});

// Get songs
router.get("/", async (req, res) => {
	try {
		// filter used to return results based on specific params
		const filter = {};

		// const filter = { tags: [] };
		const select = ""; //select specific fields to return

		// options object
		const options = { sort: { title: 1 } };

		// limit and skip for pagination
		if (req.query.limit) options.limit = parseInt(req.query.limit);
		if (req.query.skip) options.skip = parseInt(req.query.skip);

		// Handle sort query
		if (req.query.sort) {
			let parts = req.query.sort.split("_");
			options.sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
		}

		// handle search query
		if (req.query.search) {
			// search name or title
			const regex = new RegExp(req.query.search, "i");
			filter.$or = filter.$or
				? [...filter.$or, { title: regex }, { author: regex }]
				: [{ title: regex }, { author: regex }];
			console.log(regex);
		}

		// filter by tags
		if (req.query.tags) {
			const tags = req.query.tags.split(" ").map(t => t.replace("_", " "));
			console.log(tags);
		}

		// retrieve resource
		const songs = await Song.find(filter, select, options);
		res.send({ songs });
	} catch (e) {
		let status = e.status || 400;
		res.status(status).send({ message: e.message });
	}
});

// Update song
router.patch("/:_id", async (req, res) => {
	const whiteListedUpdates = [
		"tags",
		"notes",
		"title",
		"url",
		"author",
		"key",
		"tempo",
		"songSelectID"
	];
	const updates = Object.keys(req.body);
	if (updates.length === 0) return res.status(400).send();
	const validUpdates = updates.filter(u => whiteListedUpdates.includes(u));
	if (validUpdates.length === 0) return res.status(403).send();

	try {
		const song = await Song.findById(req.params._id);
		if (!song) return res.status(404).send();
		validUpdates.forEach(u => (song[u] = req.body[u]));
		await song.save();
		res.send(song);
	} catch (e) {
		console.log(e);
		res.status(400).send();
	}
});

// Delete song
router.delete("/:_id", async (req, res) => {
	try {
		const song = await Song.findById(req.params._id);
		if (!song) return res.status(404).send();
		await song.remove();
		res.send();
	} catch (e) {
		console.log(e);
		res.status(400).send();
	}
});

module.exports = router;
