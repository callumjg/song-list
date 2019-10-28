const router = require("express").Router();
const Service = require("../models/Service");
const Song = require("../models/Song");

// create service
router.post("/", async (req, res) => {
	try {
		const service = new Service(req.body);
		await service.save();
		await service.songs.forEach(async _id => {
			const song = await Song.findById(_id);
			song.services = [...song.services, service._id];
			await song.save();
		});
		res.status(201).send(service);
	} catch (e) {
		console.log(e);
		res.status(400).send(e);
	}
});

//Get Service
router.get("/:_id", async (req, res) => {
	try {
		const service = await Service.findById(req.params._id).populate("songs");
		if (!service) return res.status(404).send();
		res.send(service);
	} catch (e) {
		console.log(e);
		res.status(400).send(e);
	}
});

//Get Services
router.get("/", async (req, res) => {
	try {
		// filter used to return results based on specific params
		const filter = {};

		// return specific fields
		const select = ""; //select specific fields to return

		// options object
		const options = { sort: { date: -1 } };

		// set limit and skip for pagination
		if (req.query.limit) options.limit = parseInt(req.query.limit);
		if (req.query.skip) options.skip = parseInt(req.query.skip);

		// set sort options
		if (req.query.sort) {
			let parts = req.query.sort.split("_");
			options.sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
		}

		// Count total available resources
		const count = await Service.countDocuments({ ...filter, limit: null });

		// retrieve and send resource
		const services = await Service.find(filter, select, options).populate({
			path: "songs",
			select: "_id title"
		});
		res.send({ services, count });
	} catch (e) {
		let status = e.status || 400;
		console.log(e);
		res.status(status).send({ message: e.message });
	}
});

// delete service
router.delete("/:_id", async (req, res) => {
	try {
		const service = await Service.findById(req.params._id);
		if (!service) return res.status(404).send();
		await service.remove();
		res.send(service);
	} catch (e) {
		console.log(e);
		res.status(400).send();
	}
});

module.exports = router;
