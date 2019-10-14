const router = require("express").Router();
const Service = require("../models/Service");

// create service
router.post("/", async (req, res) => {
	try {
		const service = new Service(req.body);
		await service.save();
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
		const services = await Service.find({}).populate("songs");
		res.send({ services });
	} catch (e) {
		console.log(e);
		res.status(400).send(e);
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
