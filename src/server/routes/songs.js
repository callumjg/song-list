const router = require("express").Router();
const Song = require("../models/Song");

// Create song
router.post("/", async (req, res) => {
	try {
		const song = await new Song(req.body);
		song.save();
		res.send(song);
	} catch (e) {
		console.log(e);
		res.status(400).send();
	}
});

// Get song
router.get("/:_id", async (req, res) => {
	try {
		const song = await Song.findById(req.params._id);
		if (!song) return res.status(404).send();
		res.send(song);
	} catch (e) {
		console.log(e);
		res.status(400).send();
	}
});

// Get songs
router.get("/", async (req, res) => {
	try {
		const songs = await Song.find({});
		res.send({ songs });
	} catch (e) {
		console.log(e);
		res.status(400).send();
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
